'use client'

import { FC } from 'react'
import React, { useState, useEffect } from "react";
import { Input, Popover, Radio, Modal, message, RadioChangeEvent } from "antd";
import { ArrowUpDown, ChevronDown, Settings, } from 'lucide-react';
import tokenList from '../../../helpers/tokens/token-list.json'
import { useSendTransaction, useAccount, useWaitForTransactionReceipt } from "wagmi";
import Image from 'next/image';
import { TokenData } from '../../../lib/coinTypes/tokenTypes';
import Moralis from 'moralis'
import axios from 'axios';
import SwapReviewModal from '../Swap/SwapReviewModal';

interface SwapProps {

}

const Swap: FC<SwapProps> = ({ }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [tokenOne, setTokenOne] = useState<TokenData>(tokenList[0])
    const [tokenTwo, setTokenTwo] = useState<TokenData>(tokenList[1])
    const [tokenOneAmount, setTokenOneAmount] = useState<any>(null)
    const [tokenTwoAmount, setTokenTwoAmount] = useState<any>(null)
    const [prices, setPrices] = useState<any>(null)
    const [txDetails, setTxDetails] = useState<{
        to: string | null;
        data: string | null;
        value: string | null;
    }>({
        to: null,
        data: null,
        value: null
    })
    const [messageApi, contextHolder] = message.useMessage()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [changeToken, setChangeToken] = useState<number>(1)
    const [slippage, setSlippage] = useState<number>(2.5)

    // Add new state for review modal
    const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false)

    const { address, isConnected } = useAccount();
    const { data: hash, sendTransaction, isPending: isSending } = useSendTransaction();

    const { isLoading: isLoadingTranstaction, isSuccess } = useWaitForTransactionReceipt({
        hash: hash
    })


    const openModal = (token: number) => {
        setChangeToken(token)
        setIsOpen(true)
    }

    const handleSlippageChange = (event: RadioChangeEvent) => {
        setSlippage(event.target.value)
    }

    const switchTokens = () => {
        // kdyz swapnu tokens, tak chci aby se me inputy resetovali a fetchunuli se novy prices do tech prohozenych inputu
        setPrices(null)
        setTokenOneAmount(null)
        setTokenTwoAmount(null)
        const one = tokenOne
        const two = tokenTwo
        setTokenOne(two)
        setTokenTwo(one)
        fetchPrices(two.address, one.address)
    }

    const modifyToken = (index: number) => {
        setPrices(null)
        setTokenOneAmount(null)
        setTokenTwoAmount(null) //kdyz swapnu coins , tak chci aby se inputy null
        if (changeToken === 1) { //kdyz zmenim tokenOne
            setTokenOne(tokenList[index])
            fetchPrices(tokenList[index].address, tokenTwo.address) //udelam novej request a fetchnu data toho tokenu ktery jsme vybrali spolecne s tou address and tokenTwo zustane stejnej
        } else {
            setTokenTwo(tokenList[index])
            fetchPrices(tokenOne.address, tokenList[index].address)
        }
        setIsOpen(false)
    }


    const changeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTokenOneAmount(event.target.value)
        if (event.target.value && prices) { //jestli je neco v inputu a zaroven mam fetched prices, tak me nastav input2 na to co jsem napsal do inputu * fetched prices
            const tokenOneAmount = parseFloat(event.target.value); // Convert to a numeric type
            setTokenTwoAmount((tokenOneAmount * prices.ratio).toFixed(2))
        } else {
            setTokenTwoAmount(null)
        }
    }


    const fetchPrices = async (address1: string, address2: string) => {
        try {
            const responseOne = await Moralis.EvmApi.token.getTokenPrice({
                address: address1
            })

            const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
                address: address2
            })

            const usdPrices = {
                tokenOne: responseOne.raw.usdPrice,
                tokenTwo: responseTwo.raw.usdPrice,
                ratio: responseOne.raw.usdPrice / responseTwo.raw.usdPrice
            }
            setPrices(usdPrices)
            return usdPrices
        } catch (error) {
            console.log('This error is:', error)
        }
    }

    // Add a new function to handle opening the review modal
    const handleOpenReviewModal = () => {
        if (!tokenOneAmount || !isConnected) {
            return;
        }
        setIsReviewModalOpen(true);
    }

    // Modify the fetchDexSwap function to be called from the review modal
    const handleConfirmSwap = async () => {
        setIsReviewModalOpen(false);
        await fetchDexSwap();
    }

    const fetchDexSwap = async () => {
        if (isLoading) {
            messageApi.open({
                type: 'info',
                content: 'Please wait, transaction is processing...',
                duration: 2,
            });
            return;
        }

        setIsLoading(true);

        console.log("fetchDexSwap function called");

        if (!tokenOneAmount) {
            console.log('tokenOneAmount is empty')
            return
        }

        try {

            const allowanceResponse = await axios.get('/api/one-inch-proxy', {
                params: {
                    endpoint: 'approve/allowance',
                    tokenAddress: tokenOne.address,
                    walletAddress: address
                }
            });

            console.log("Allowance API call completed");
            console.log("Allowance response data:", allowanceResponse.data);

            // If token is not approved, get approval transaction
            if (allowanceResponse.data.allowance === "0") {
                console.log("Token not approved, getting approval transaction...");

                const approveResponse = await axios.get('/api/one-inch-proxy', {
                    params: {
                        endpoint: 'approve/transaction',
                        tokenAddress: tokenOne.address
                    }
                });

                console.log("Approval response:", approveResponse.data);
                setTxDetails(approveResponse.data);
                console.log("Token not approved, returning after setting txDetails");
                return;
            }

            // Get swap transaction
            console.log("Making swap API call with params:", {
                src: tokenOne.address,
                dst: tokenTwo.address,
                amount: tokenOneAmount.padEnd(tokenOne.decimals + tokenOneAmount.length, '0'),
                from: address,
                slippage: slippage
            });
            const swapResponse = await axios.get('/api/one-inch-proxy', {
                params: {
                    endpoint: 'swap',
                    src: tokenOne.address,
                    dst: tokenTwo.address,
                    amount: tokenOneAmount.padEnd(tokenOne.decimals + tokenOneAmount.length, '0'),
                    from: address,
                    slippage: slippage
                }
            });

            console.log("Swap API call completed");

            let decimals = Number(`1E${tokenTwo.decimals}`);
            setTokenTwoAmount((Number(swapResponse.data.toTokenAmount) / decimals).toFixed(2));

            console.log("Swap response:", swapResponse.data);
            console.log("Setting txDetails with tx data");
            setTxDetails(swapResponse.data.tx);
        } catch (error: any) {
            console.error("Error in fetchDexSwap:", error);

            // if (error.response) {
            //     console.error("Error status:", error.response.status);
            //     console.error("Error data:", error.response.data);

            //     // Show error to user
            //     messageApi.open({
            //         type: 'error',
            //         content: `Swap failed: ${error.response.data?.description || 'Unknown error'}`,
            //         duration: 5,
            //     });
            // } else if (error.request) {
            //     // The request was made but no response was received
            //     console.error("No response received:", error.request);

            //     messageApi.open({
            //         type: 'error',
            //         content: 'Network error: No response from server',
            //         duration: 5,
            //     });
            // } else {
            //     // Something happened in setting up the request
            //     console.error("Error message:", error.message);

            //     messageApi.open({
            //         type: 'error',
            //         content: `Error: ${error.message}`,
            //         duration: 5,
            //     });
            // }
        } finally {
            setIsLoading(false);
        }

    };


    useEffect(() => {
        fetchPrices(tokenList[0].address, tokenList[1].address)
    }, [])

    useEffect(() => {

        console.log(txDetails, 'txDetails')
        if (txDetails.to && isConnected) {
            sendTransaction({
                to: txDetails.to as `0x${string}`,
                data: txDetails.data as `0x${string}` | undefined,
                value: txDetails.value ? BigInt(txDetails.value) : undefined,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [txDetails, isConnected])

    useEffect(() => {
        messageApi.destroy();

        if (isLoadingTranstaction || isSending) {
            messageApi.open({
                type: 'loading',
                content: 'Transaction is Pending...',
                duration: 0,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingTranstaction, isSending])

    useEffect(() => {
        messageApi.destroy();
        if (isSuccess) {
            messageApi.open({
                type: 'success',
                content: 'Transaction Successful',
                duration: 1.5,
            })
        } else if (txDetails.to) {
            messageApi.open({
                type: 'error',
                content: 'Transaction Failed',
                duration: 1.50,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, messageApi, txDetails.to])


    //SlIPAGE OPTIONS FOR POPOVER 
    const settings = (
        <>
            <div>
                Slippage Tolerance
            </div>
            <Radio.Group value={slippage} onChange={handleSlippageChange}>
                <Radio.Button value={0.5}>0.5%</Radio.Button>
                <Radio.Button value={2.5}>2.5%</Radio.Button>
                <Radio.Button value={5}>5.0%</Radio.Button>
            </Radio.Group>
        </>
    )



    return (
        <main className='h-full'>
            {/*SWAP CARD */}
            <section className='flex flex-row justify-center items-center gap-6 h-[90%]'>
                <header className='flex flex-col gap-4 font-unbounded pr-12 '>
                    <h1 className="font-bold text-4xl neon-writing  text-[#fff] flex flex-col">
                        <span>SWAP YOUR</span>
                        <div className='flex-row'>
                            <span className="text-[#04FFF7]">TOKENS</span>
                            <span> WITH US!</span>
                        </div>
                    </h1>
                    <div>

                    </div>
                    <h2 className='leading-tight tracking-wide'>Enjoy one of the best rates from EVM decentralized aggrigator.</h2>
                    <p className='font-unbounded text-xs'>
                        Trade many tokens on ERC-20 Ethereum Smart Chain in seconds, just by connecting your wallet.
                    </p>

                    <h3 className="text-2xl mt-5 font-unbounded flex flex-wrap items-center">
                        <span className="text-white mr-2">Whenever.</span>
                        <span className="text-white mx-4">Safely.</span>
                        <span className="text-[#00FFFF]">Instantly.</span>
                    </h3>


                </header>

                {/* Swap Card Section */}
                <aside className='neon-card rounded-xl'>
                    {contextHolder}

                    {/* Token Selection Modal */}
                    <Modal
                        open={isOpen}
                        footer={null}
                        title='Select a Token'
                        onCancel={() => setIsOpen(false)}
                    >
                        <div className='border-t border-[#363e54] mt-5 flex flex-col gap-2'>
                            {tokenList?.map((oneToken, index) => (
                                <div
                                    key={index}
                                    className='flex justify-start items-center pl-5 pt-2 pb-2 hover:cursor-pointer overflow-auto hover:bg-[#1f1639]'
                                    onClick={() => modifyToken(index)}
                                >
                                    <Image
                                        src={oneToken.img}
                                        alt={oneToken.ticker}
                                        height={40}
                                        width={40}
                                    />
                                    <div>
                                        <div className='ml-2 text-sm font-medium'>
                                            {oneToken.name}
                                        </div>
                                        <div className='ml-2 text-sx font-light text-[#51596f]'>
                                            {oneToken.ticker}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Modal>

                    {/* Add the Review Modal */}
                    <SwapReviewModal
                        isOpen={isReviewModalOpen}
                        onClose={() => setIsReviewModalOpen(false)}
                        tokenOne={tokenOne}
                        tokenTwo={tokenTwo}
                        tokenOneAmount={tokenOneAmount}
                        tokenTwoAmount={tokenTwoAmount}
                        prices={prices}
                        slippage={slippage}
                        onConfirm={handleConfirmSwap}
                        isLoading={isLoading}
                    />

                    {/* Swap Card Container */}
                    <div className='w-[500px] min-h-[300px] bg-slate-900 border-2 border-none rounded-xl flex flex-col justify-start items-start px-8'>
                        {/* Card Header */}
                        <header className='flex justify-between items-center w-[98%] py-4 text-zinc-300'>
                            <h4 className='py-[3px] px-[12px] rounded-xl bg-[#3a4157] text-[#03d7f8d9] text-sm'>Swap</h4>
                            <Popover
                                content={settings}
                                title='Settings'
                                trigger='click'
                                placement='bottomRight'
                            >
                                <Settings className='text-[#51586f] transition duration-300 hover:text-white hover:rotate-90 cursor-pointer' />
                            </Popover>
                        </header>

                        {/* Swap Form */}
                        <form className='relative w-full'>
                            {/* Token Input Fields */}
                            <fieldset className='w-full'>
                                <div className='relative'>
                                    <Input
                                        placeholder="0"
                                        value={tokenOneAmount}
                                        onChange={changeAmount}
                                        disabled={!prices}
                                        type='number'
                                        className='no-spinner'
                                    />

                                    <button
                                        type="button"
                                        className="absolute min-w-[20px] h-[30px] bg-[#3a4157] top-9 right-2 rounded-full flex justify-start items-center gap-1 font-medium text-[15px] pr-2 hover:cursor-pointer text-zinc-300"
                                        onClick={() => openModal(1)}
                                    >
                                        <Image src={tokenOne.img} alt="assetOneLogo" height={14} width={23} className="ml-1" />
                                        {tokenOne.ticker}
                                        <ChevronDown />
                                    </button>
                                </div>

                                <div className='relative'>
                                    <Input
                                        placeholder="0"
                                        value={tokenTwoAmount}
                                        disabled={true}
                                        className='no-spinner'
                                    />

                                    <button
                                        type="button"
                                        className="absolute min-w-[20px] h-[30px] bg-[#3a4157] top-9 right-2 rounded-full flex justify-start items-center gap-1 font-medium text-[15px] pr-2 hover:cursor-pointer text-zinc-300"
                                        onClick={() => openModal(2)}
                                    >
                                        <Image src={tokenTwo.img} alt="assetTwoLogo" height={14} width={23} className="ml-1" />
                                        {tokenTwo.ticker}
                                        <ChevronDown />
                                    </button>
                                </div>
                            </fieldset>

                            {/* Swap Direction Toggle */}
                            <button
                                type="button"
                                className="bg-[#3a4157] w-6 h-6 flex items-center justify-center rounded-md absolute top-[86px] left-[200px] text-[#03d7f8d9] border-[3px] border-slate-900 text-sm transition-all duration-300 ease-in-out hover:cursor-pointer hover:rotate-180"
                                onClick={switchTokens}
                            >
                                <ArrowUpDown size={16} />
                            </button>

                            {/* Swap Button - Updated to open review modal instead of directly calling fetchDexSwap */}
                            <button
                                type="button"
                                className="flex justify-center items-center bg-[#243056] w-full h-14 text-[20px] font-bold rounded-lg text-[#00FFFF] transition duration-300 mb-7 mt-2 disabled:bg-[#243056] disabled:opacity-40 disabled:text-[#5982f39b] disabled:hover:cursor-not-allowed disabled:hover:bg-[#243056] hover:cursor-pointer hover:bg-[#3b4874] hover:scale-[1.02]"
                                disabled={!tokenOneAmount || !isConnected}
                                onClick={handleOpenReviewModal}
                            >
                                Swap
                            </button>
                        </form>
                    </div>
                </aside>
            </section>
            <div className='flex w-full justify-center items-center font-unbounded tracking-[0.18rem] opacity-50'>
                POWERED BY<Image src="/images/1inch_transparent.jpeg" alt="1inch logo" width={100} height={100} />
            </div>
        </main>
    );
}
export default Swap;