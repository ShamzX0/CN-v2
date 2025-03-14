
import React from 'react';
import CryptoNews from '../CryptoNews/CryptoNews';


const Intro = () => {
    return (
        <section className="flex items-center mb-2">
            {/* Left Section - Main Content */}
            <div className="flex w-3/5">
                <div className="flex flex-col font-unbounded w-3/5 justify-center items-start">
                    <h1 className="text-[37px] text-left text-[#fff] pt-0 mb-10 opacity-90 neon-writing">
                        <span className="text-2xl">THE UNIVERSE OF</span>{' '}CRYPTOCURRENCY
                    </h1>
                    <span className="text-base mb-10">Discover - Learn - Secure</span>
                    <p className="text-left text-base mb-8">
                        Explore beginner-friendly guides,<br />
                        expert hardware wallet advice, and real-time market prices.
                    </p>
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
