"use client"
import { Input, Popover, Radio, Modal, message, RadioChangeEvent } from 'antd'
import { SettingOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from 'react'
import Swap from '@/components/Main/Swap/Swap';

const page = () => {

    const [slippage, setSlippage] = useState<number>(2.5)
    const [tokenOneAmount, setTokenOneAmount] = useState(null)
    const [tokenTwoAmount, setTokenTwoAmount] = useState(null)

    const handleSlippageChange = (event: RadioChangeEvent) => {
        setSlippage(event.target.value)
    }
    const changeAmount = (event: RadioChangeEvent) => {
        setTokenOneAmount(event.target.value)
    }

    const settings = (
        <>
            <div>
                Slippage Tolerance
            </div>
            <div>
                <Radio.Group value={slippage} onChange={handleSlippageChange}>
                    <Radio.Button value={0.5}>0.5%</Radio.Button>
                    <Radio.Button value={2.5}>2.5%</Radio.Button>
                    <Radio.Button value={5}>5.0%</Radio.Button>
                </Radio.Group>
            </div>

        </>
    )
    return (
        // <div className='flex min-h-[70vh] items-center'>
        //     <div className='flex flex-col w-[500px] h-[300px] items-center mx-auto neon-card rounded-2xl'>
        //         <div className='flex justify-between items-center w-[90%] py-4 text-zinc-300'>
        //             <h4>Swap</h4>
        //             <Popover
        //                 content={settings}
        //                 title='Settings'
        //                 trigger='click'
        //                 placement='bottomRight'
        //             >
        //                 <SettingOutlined className='text-[#51586f] transition duration-300 hover:text-white hover:rotate-90 cursor-pointer' />
        //             </Popover>
        //         </div>
        //         <div className='relative'>
        //             <Input placeholder="0" value={tokenOneAmount} onchange={changeAmount} />
        //             <Input placeholder="0" value={tokenTwoAmount} disabled={true} />
        //         </div>
        //     </div>
        // </div>

        <div className='flex min-h-[70vh] items-center justify-center'>
            <Swap />
        </div>

    )
}

export default page
