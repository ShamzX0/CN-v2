'use client'

import { FC, useEffect } from 'react'
import { Modal } from 'antd'
import Image from 'next/image'
import { X, Info, ChevronDown, ChevronsDown } from 'lucide-react'
import { TokenData } from '../../../lib/coinTypes/tokenTypes'

interface SwapReviewModalProps {
    isOpen: boolean
    onClose: () => void
    tokenOne: TokenData
    tokenTwo: TokenData
    tokenOneAmount: string | null
    tokenTwoAmount: string | null
    prices: any
    slippage: number
    onConfirm: () => void
    isLoading: boolean
}

const SwapReviewModal: FC<SwapReviewModalProps> = ({
    isOpen,
    onClose,
    tokenOne,
    tokenTwo,
    tokenOneAmount,
    tokenTwoAmount,
    prices,
    slippage,
    onConfirm,
    isLoading
}) => {
    // Add body class when modal is open to help with global styling
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        // Cleanup on unmount
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [isOpen]);

    // Calculate estimated network fee (in this example, hardcoded at $0.63)
    const networkFee = 0.63

    // Calculate fee based on 0.25% (as shown in the screenshot)
    const feePercentage = 0.25
    const fee = tokenOneAmount && prices ? (parseFloat(tokenOneAmount) * prices.tokenOne * feePercentage / 100) : 0
    const formattedFee = fee < 0.01 ? '<$0.01' : `$${fee.toFixed(2)}`

    return (
        <Modal
            open={isOpen}
            footer={null}
            closable={false}
            className="swap-review-modal"
            width={500}
        >
            <div className="bg-slate-900 rounded-xl neon-card p-5">
                <button
                    onClick={onClose}
                    className="flex w-full justify-end text-gray-400 hover:text-white transition-colors"
                >
                    <X size={18} />
                </button>
                {/* Header with title and close button */}
                <div className="flex justify-center items-center mt-[-10px] mb-6">
                    <h3 className="text-lg font-normal text-[#f4f4f4] opacity-80 font-unbounded tracking-tighter">Transaction Preview.</h3>
                </div>

                {/* From token section */}

                <div className="flex justify-between items-center">
                    <div className="text-lg font-medium text-white">
                        {tokenOneAmount} {tokenOne.ticker}
                    </div>
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-500 flex items-center justify-center">
                        <Image
                            src={tokenOne.img}
                            alt={tokenOne.ticker}
                            height={40}
                            width={40}
                        />
                    </div>
                </div>
                <div className="text-md text-gray-400">
                    ${prices && tokenOneAmount ? (parseFloat(tokenOneAmount) * prices.tokenOne).toFixed(2) : '0.00'}
                </div>


                {/* Arrow down */}
                <div className="flex mt-2 justify-center items-center">
                    <div className="border-[1px] w-full border-transparent border-[#00d9ff] neon-card"></div>
                    <div className="mx-4 text-gray-400 flex items-center">
                        <ChevronsDown size={22} className="text-[#00d9ff]" />
                    </div>
                    <div className="border-[1px] w-full border-transparent border-[#00d9ff] neon-card"></div>
                </div>


                {/* To token section */}

                <div className="flex justify-between items-center mt-4">
                    <div className="text-lg font-medium text-white">
                        {tokenTwoAmount} {tokenTwo.ticker}
                    </div>
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-500 flex items-center justify-center">
                        <Image
                            src={tokenTwo.img}
                            alt={tokenTwo.ticker}
                            height={40}
                            width={40}
                        />
                    </div>
                </div>
                <div className="text-md text-gray-400">
                    ${prices && tokenTwoAmount ? (parseFloat(tokenTwoAmount) * prices.tokenTwo).toFixed(2) : '0.00'}
                </div>


                {/* Show more section */}
                <div className="flex justify-center items-center">
                    <div className="border-t border-gray-700 flex-grow"></div>
                    <p className="mx-4 text-gray-400 flex items-center">
                        Cost & Fees
                    </p>
                    <div className="border-t border-gray-700 flex-grow"></div>
                </div>

                {/* Fee info */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-gray-300">
                        Fee ({feePercentage}%)
                        <Info size={16} className="ml-2 text-gray-500" />
                    </div>
                    <div className="text-white">{formattedFee}</div>
                </div>

                {/* Network cost */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center text-gray-300">
                        Network cost
                        <Info size={16} className="ml-2 text-gray-500" />
                    </div>
                    <div className="flex items-center">
                        {/* <div className="bg-gray-700 rounded-full p-1 mr-2">
                            <Image
                                src="/images/eth-logo.png"
                                alt="ETH"
                                height={16}
                                width={16}
                            />
                        </div> */}
                        <span className="text-white">${networkFee}</span>
                    </div>
                </div>

                {/* Approve button */}
                <button
                    onClick={onConfirm}
                    disabled={isLoading}
                    className="w-full py-4 rounded-xl text-xl font-semibold text-[#00FFFF] bg-[#243056] hover:bg-[#3b4874]
                    hover:scale-[1.03]"
                >
                    {isLoading ? 'Processing...' : 'Approve & Swap'}
                </button>
            </div>
        </Modal>
    )
}

export default SwapReviewModal