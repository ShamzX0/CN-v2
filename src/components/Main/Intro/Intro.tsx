
import React from 'react';
import CryptoNews from '../CryptoNews/CryptoNews';
import { DotIcon } from 'lucide-react';




const Intro = () => {
    // Define feature points for easier maintenance and consistency
    const featurePoints = [
        "Explore beginner-friendly guides",
        "Expert hardware wallet advice",
        "Real-time market prices",
        "Swap ERC-20 Tokens"
    ];
    return (
        <section className="flex items-center">
            {/* Left Section - Main Content */}
            <div className="flex w-3/5">
                <div className="flex flex-col gap-5 font-unbounded w-3/5 justify-center items-start">
                    <h1 className="text-[37px] ml-3 text-[#fff] pt-0 mb-10 opacity-90 neon-writing">
                        <span className="text-2xl">THE UNIVERSE OF</span>{' '}CRYPTOCURRENCY
                    </h1>

                    <ul className="text-left text-base !font-normal leading-relaxed space-y-3">
                        {featurePoints.map((point, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <DotIcon className="flex-shrink-0 text-cyan-400" size={21} />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Right Section - News Feed */}
            <div className="flex flex-col w-2/5 h-[330px] bg-[#1a1f2e] rounded-xl neon-card">
                <CryptoNews />
            </div>
        </section>
    );
};

export default Intro;
