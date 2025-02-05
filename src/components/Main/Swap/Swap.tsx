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



    return <>
        {/*SWAP CARD */}
        <div className='flex gap-6 w-[1000px] mx-auto mt-28'>
            <div className="flex flex-col gap-12 font-unbounded">
                <span className="font-bold text-4xl neon-writing text-[#fff]">
                    SWAP YOUR <br />
                    <span className='text-[#04FFF7]'>TOKENS </span>
                    WITH US!
                </span>

                <p className=''>Trade many tokens on ERC-20 Ethereum Smart Chain in seconds, just by connecting your wallet.</p>
                <div className='flex gap-4 text-2xl'>
                    <span> Whenever. </span>
                    <span> Safely. </span>
                    <span className="text-[#00FFFF]">
                        Instantly.
                    </span>
                </div>
            </div>

            <div>
                {/* {contextHolder} */}
                <Modal
                    open={false}
                    footer={null}
                    title='Select a Token'
                    onCancel={() => { }}
                >
                    <div className='border-t border-[#363e54] mt-5 flex flex-col gap-2'>
                        {
                            tokenList?.map((oneToken, index) => {
                                return <div key={index} className='flex items-center pl-5 py-2 hover:cursor-pointer overflow-auto hover:bg-[#1f1639]' onClick={() => { }}>
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
                <div className='w-[370px] sm:w-[500px] min-h-[300px] bg-slate-900 border-2 border-slate-900 rounded-xl flex flex-col items-start px-8 neon-card'>

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
                            value={1}
                            onChange={() => { }}
                            disabled={false}
                        />
                        <Input
                            placeholder="0"
                            value={2}
                            disabled={true} />

                        <div className="bg-[#3a4157] w-6 h-6 flex items-center justify-center rounded-md absolute top-[86px] left-[147px] sm:left-[200px] text-[#5f6783] border-[3px] border-slate-900 text-sm transition duration-300 hover:cursor-pointer hover:text-white" onClick={() => { }}>
                            <ArrowDown />
                        </div>

                        <div className="absolute min-w-[20px] h-[30px] bg-[#3a4157] top-9 right-2 rounded-full flex justify-start items-center gap-1 font-bold text-[17px] pr-2 hover:cursor-pointer text-zinc-300"
                            onClick={() => { }}>
                            {/* <Image src={tokenOne.img} alt="assetOneLogo" height={14} width={23} className="ml-1" />
                            {tokenOne.ticker} */}
                            USDC
                            <ChevronDown />
                        </div>

                        <div className="absolute min-w-[20px] h-[30px] bg-[#3a4157] top-[131px] right-2 rounded-full flex justify-start items-center gap-1 font-bold text-[17px] pr-2 hover:cursor-pointer text-zinc-300"
                            onClick={() => { }}>
                            {/* <Image src={tokenTwo.img} alt="assetTwoLogo" height={14} width={23} className="ml-1" />
                            {tokenTwo.ticker} */}
                            LINK
                            <ChevronDown />
                        </div>

                    </div>
                    {/* SWAP BUTTON */}
                    <button className="flex items-center justify-center bg-[#243056] w-full h-14 text-[20px] font-bold rounded-lg text-[#5981F3] transition duration-300 mb-7 mt-2 disabled:opacity-40 disabled:text-[#5982f39b] disabled:hover:cursor-not-allowed hover:cursor-pointer hover:bg-[#3b4874]"
                        disabled={false}
                        onClick={() => { }}>
                        Swap
                    </button>

                </div>
            </div>
        </div>
    </>

}

export default Swap



