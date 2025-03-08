import React from 'react';

interface Props {
    globalData: any
}

const DominanceCard: React.FC<Props> = ({ globalData }) => {
    const btcDominance = globalData?.market_cap_percentage?.btc;
    const ethDominance = globalData?.market_cap_percentage?.eth;

    return (
        <div className="flex flex-col justify-center items-center bg-[#13233f] p-2 w-full h-full rounded-xl">

            <h2 className="text-[11px] mb-4 font-bold font-mono">Majors Dominance</h2>

            <div className="space-y-3">
                {/* Bitcoin Dominance */}
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fillRule="evenodd">
                                <circle cx="16" cy="16" r="16" fill="#F7931A" />
                                <path fill="#FFF" fillRule="nonzero" d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.745-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z" />
                            </g>
                        </svg>
                    </div>
                    <span className="text-sm font-normal">
                        {btcDominance?.toFixed(2)}%
                    </span>
                </div>

                {/* Ethereum Dominance */}
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fillRule="evenodd">
                                <circle cx="16" cy="16" r="16" fill="#627EEA" />
                                <g fill="#FFF" fillRule="nonzero">
                                    <path fillOpacity=".602" d="M16.498 4v8.87l7.497 3.35z" />
                                    <path d="M16.498 4L9 16.22l7.498-3.35z" />
                                    <path fillOpacity=".602" d="M16.498 21.968v6.027L24 17.616z" />
                                    <path d="M16.498 27.995v-6.028L9 17.616z" />
                                    <path fillOpacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z" />
                                    <path fillOpacity=".602" d="M9 16.22l7.498 4.353v-7.701z" />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <span className="text-sm font-normal">
                        {ethDominance?.toFixed(2)}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DominanceCard;