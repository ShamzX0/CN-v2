'use client'

import { FC } from 'react'
import { Modal } from 'antd'
import Image from 'next/image'
import { X, Info, ChevronDown } from 'lucide-react'
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
            centered
        >
            <div className="bg-slate-900 rounded-xl p-6">
                {/* Header with title and close button */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-medium text-white">You`&apos;`re swapping</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* From token section */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-4xl font-bold text-white">
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
                    <div className="text-lg text-gray-400">
                        ${prices && tokenOneAmount ? (parseFloat(tokenOneAmount) * prices.tokenOne).toFixed(2) : '0.00'}
                    </div>
                </div>

                {/* Arrow down */}
                <div className="flex justify-center mb-8">
                    <div className="bg-slate-800 p-2 rounded-md">
                        <ChevronDown size={24} className="text-gray-400" />
                    </div>
                </div>

                {/* To token section */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-4xl font-bold text-white">
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
                    <div className="text-lg text-gray-400">
                        ${prices && tokenTwoAmount ? (parseFloat(tokenTwoAmount) * prices.tokenTwo).toFixed(2) : '0.00'}
                    </div>
                </div>

                {/* Show more section */}
                <div className="flex justify-center items-center mb-6">
                    <div className="border-t border-gray-700 flex-grow"></div>
                    <button className="mx-4 text-gray-400 flex items-center">
                        Show more <ChevronDown size={16} className="ml-1" />
                    </button>
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
                        <div className="bg-gray-700 rounded-full p-1 mr-2">
                            <Image
                                src="/images/eth-logo.png"
                                alt="ETH"
                                height={16}
                                width={16}
                            />
                        </div>
                        <span className="text-white">${networkFee}</span>
                    </div>
                </div>

                {/* Approve button */}
                <button
                    onClick={onConfirm}
                    disabled={isLoading}
                    className="w-full py-4 rounded-xl text-xl font-semibold bg-purple-500 hover:bg-purple-600 transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Processing...' : 'Approve and swap'}
                </button>
            </div>
        </Modal>
    )
}

export default SwapReviewModal