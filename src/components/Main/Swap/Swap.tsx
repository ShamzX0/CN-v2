'use client'

import { FC } from 'react'
import React, { useState, useEffect } from "react";
import { Input, Popover, Radio, Modal, message, RadioChangeEvent } from "antd";
import { ArrowDown, ChevronDown, Settings, } from 'lucide-react';
// import { useSendTransaction, useWaitForTransaction, useConnect, useAccount } from "wagmi";

import Image from 'next/image';
import { tokenList } from '@/helpers/tokens/token-list';


interface SwapProps {

}

const Swap: FC<SwapProps> = ({ }) => {


    //SlIPAGE OPTIONS FOR POPOVER 
    const settings = (
        <>
            <div>
                Slippage Tolerance
            </div>
            <div>
                <Radio.Group value={4}>
                    <Radio.Button value={0.5}>0.5%</Radio.Button>
                    <Radio.Button value={2.5}>2.5%</Radio.Button>
                    <Radio.Button value={5}>5.0%</Radio.Button>
                </Radio.Group>
            </div>
        </>
    )



    return <div className='min-h-[100vh]'>
        {/*SWAP CARD */}
        <div className='flex flex-col lg:flex-row lg:w-[1000px] justify-center items-center mx-auto'>
            <div className="text-4xl mt-[70px] md:mt-[130px] px-10 lg:px-0 lg:mr-6 text-center lg:text-left">
                <span className="font-bold text-[22px] sm:text-[36px] neon-writing text-[#fff] mt-5 lg:mt-0 flex-col xl:w-3/5 justify-center lg:items-start overflow-y-hidden neon-writing font-unbounded leading-[60px]">SWAP YOUR <br /> <span className='text-[#04FFF7]'>TOKENS</span><span> WITH US!</span></span>
                <br />
                <br />
                <span className="text-base text-[#fff]">
                    <p className='font-unbounded'>Trade many tokens on ERC-20 Ethereum Smart Chain in seconds, just by connecting your wallet.</p>
                    <h3 className='text-2xl mt-[30px] sm:mt-[60px]'>
                        <span className="mr-2 font-unbounded">Whenever. <span className='ml-3 mr-2'>Safely. </span></span><span className="text-blue-700 font-unbounded">Instantly. </span>
                    </h3>
                </span>
            </div>
            <div className='mt-10 mb-20 md:mb-0 sm:mt-20 md:mt-40'>
                {contextHolder}
                <Modal
                    open={isOpen}
                    footer={null}
                    title='Select a Token'
                    onCancel={() => setIsOpen(false)}
                >
                    <div className='border-t border-[#363e54] mt-5 flex flex-col gap-2'>
                        {
                            tokenList?.map((oneToken, index) => {
                                return <div key={index} className='flex justify-start items-center pl-5 pt-2 pb-2 hover:cursor-pointer overflow-auto hover:bg-[#1f1639]' onClick={() => modifyToken(index)}>
                                    <Image src={oneToken.img} alt={oneToken.ticker} height={40} width={40} />
                                    <div>
                                        <div className='ml-2 text-sm font-medium'>
                                            {oneToken.name}
                                        </div>
                                        <div className='ml-2 text-sx font-light text-[#51596f]'>
                                            {oneToken.ticker}
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </Modal>
                <div className='w-[370px] sm:w-[500px] shadow-xl dark:shadow-md min-h-[300px] bg-slate-900 border-2 border-slate-900 rounded-xl flex flex-col justify-start items-start px-8'>

                    <div className='flex justify-between items-center w-[98%] py-4 text-zinc-300'>
                        <h4>Swap</h4>
                        <Popover
                            content={settings}
                            title='Settings'
                            trigger='click'
                            placement='bottomRight'
                        >
                            <Settings className='text-[#51586f] transition duration-300 hover:text-white hover:rotate-90 cursor-pointer' />
                        </Popover>
                    </div>

                    {/* INPUTS */}
                    <div className='relative'>
                        <Input
                            placeholder="0"
                            value={tokenOneAmount}
                            onChange={changeAmount}
                            disabled={!prices}
                        />
                        <Input
                            placeholder="0"
                            value={tokenTwoAmount}
                            disabled={true} />

                        <div className="bg-[#3a4157] w-6 h-6 flex items-center justify-center rounded-md absolute top-[86px] left-[147px] sm:left-[200px] text-[#5f6783] border-[3px] border-slate-900 text-sm transition duration-300 hover:cursor-pointer hover:text-white" onClick={switchTokens}>
                            <ArrowDown />
                        </div>

                        <div className="absolute min-w-[20px] h-[30px] bg-[#3a4157] top-9 right-2 rounded-full flex justify-start items-center gap-1 font-bold text-[17px] pr-2 hover:cursor-pointer text-zinc-300"
                            onClick={() => openModal(1)}>
                            <Image src={tokenOne.img} alt="assetOneLogo" height={14} width={23} className="ml-1" />
                            {tokenOne.ticker}
                            <ChevronDown />
                        </div>

                        <div className="absolute min-w-[20px] h-[30px] bg-[#3a4157] top-[131px] right-2 rounded-full flex justify-start items-center gap-1 font-bold text-[17px] pr-2 hover:cursor-pointer text-zinc-300"
                            onClick={() => openModal(2)}>
                            <Image src={tokenTwo.img} alt="assetTwoLogo" height={14} width={23} className="ml-1" />
                            {tokenTwo.ticker}
                            <ChevronDown />
                        </div>

                    </div>
                    {/* SWAP BUTTON */}
                    <button className="flex justify-center items-center bg-[#243056] w-full h-14 text-[20px] font-bold rounded-lg text-[#5981F3] transition duration-300 mb-7 mt-2 disabled:bg-[#243056] disabled:opacity-40 disabled:text-[#5982f39b] disabled:hover:cursor-not-allowed disabled:hover:bg-[#243056] hover:cursor-pointer hover:bg-[#3b4874]" disabled={!tokenOneAmount || !isConnected}
                        onClick={fetchDexSwap}>
                        Swap
                    </button>

                </div>
            </div>
        </div>
    </div>

}

export default Swap



