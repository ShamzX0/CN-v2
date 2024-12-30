'use client'

import Image from 'next/image';
import Link from 'next/link';
import btcImage from '../images/btcImg.jpeg';
import BitcoinImg from '../images/BitcoinImg.jpeg';
import ethImage from '../images/ethImg.png';
import adaImg from '../images/adaImg.png';
import avaxImgResized from '../images/avaxImgResized.png';
import CryptoCards from '@/components/Main/Articles/CryptoCards';



const HeaderSection = ({ title, subtitle, imageSrc }: { title: string; subtitle: string; imageSrc?: any }) => (
    <div className="mb-8">
        <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white">
            {title}
            <br />
            <span className="underline underline-offset-3 decoration-8 decoration-[#208282]">{subtitle}</span>
        </h1>
        {imageSrc && <Image src={imageSrc} alt="Header Image" width={900} height={10} className="mb-5" />}
    </div>
);


const Page = () => {
    return (
        <div className="container w-full md:max-w-4xl mx-auto pt-26 text-[#cccbcb]">
            <div className="w-full mt-10 px-4 md:px-6 text-l leading-normal">
                {/* Header Section */}
                <HeaderSection
                    title="What is Cryptocurrency?"
                    subtitle="The Digital Currency Revolution"
                    imageSrc={btcImage}
                />
                <p className="text-lg font-normal mt-3 mb-8 lg:text-xl text-gray-400">
                    In the ever-evolving landscape of digital finance, cryptocurrencies have emerged as a disruptive force,
                    reshaping the way we perceive and transact value. We recognize the immense potential of this digital currency
                    revolution, where technology and innovation are poised to change the world.
                </p>

                {/* Main Content */}
                <p className="mb-3 text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-[#208282] first-letter:mr-1 first-letter:float-left">
                    Cryptocurrency is such a cryptic concept, isn&apos;t it? Many people have difficulty understanding the
                    technology that powers cryptocurrency, let alone how it works as an investment. Over the past decade, the
                    worth of cryptocurrency has skyrocketed beyond many investor&apos;s expectations. We intend to shed light on
                    this concept.
                </p>
                <p className="text-lg font-normal mt-3 mb-3 lg:text-xl text-gray-400">
                    This beginner&apos;s guide will provide you with a solid foundation in understanding cryptocurrencies,
                    blockchain technology, and the distinctions between various projects and blockchains. Armed with this
                    knowledge, you&apos;ll be empowered to contemplate which specific cryptocurrency or blockchain aligns best
                    with your interests and goals.
                </p>
                <h5 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-4xl text-white">
                    <span className="underline underline-offset-3 decoration-8 decoration-[#1d7272]">
                        Brief Introduction
                    </span>
                </h5>

                {/* Subsections */}
                <p className="py-6">
                    Cryptocurrency has emerged as a disruptive force in the world of finance and technology. It represents a new
                    form of digital currency that operates independently of traditional banking systems. In this article, we will
                    delve into the concept of cryptocurrency, its underlying technology, and its potential implications.
                </p>
                <div className='py-6'>
                    <div className="border-b-2 border-[#1d7272]"></div>
                    <h4 className="border-l-7 border-gray-500 font-medium text-lg italic my-8 neon-writing ">
                        Key Characteristics that you should know about..
                    </h4>
                    <div className="border-b-[1px] border-[#1d7272]"></div>
                </div>

                {/* Types of Cryptocurrencies */}
                <h5 className="my-10 text-4xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-4xl text-white">
                    <span className="underline underline-offset-3 decoration-8 decoration-[#1d7272]">Types of Cryptocurrencies</span>
                </h5>
                <p className="text-lg font-normal lg:text-xl text-gray-400">
                    While Bitcoin reigns as the undisputed king of cryptocurrencies, the digital landscape is home to a vast array
                    of other digital assets, each with its own distinctive characteristics and objectives. Let us show you a few
                    exciting curated collection of remarkable cryptocurrencies that we firmly believe possess a solid foundation
                    and a promising future in the ever-evolving crypto ecosystem.
                </p>


                <CryptoCards />

                {/* Quote Section */}
                <blockquote className="border-l-4 border-[#1d7272] italic my-8 pl-8 md:pl-12">
                    Cryptocurrencies have revolutionized the way we perceive and transact value. With their decentralized nature
                    and blockchain technology, they offer a new paradigm of financial systems that are transparent, secure, and
                    accessible to all.
                </blockquote>

                {/* Footer Link */}
                <div className="text-base md:text-sm text-gray-500 px-4 py-6">
                    <Link
                        href="/"
                        className="neon-card border-opacity-30 text-white/80 hover:text-[#f4f4f4] py-2 px-4 rounded font-unbounded font-light transition duration-200 ease-in-out hover:[box-shadow:0_0_20px_#00d9ff,0_0_20px_#00d9ff,0_0_20px_#00d9ff]"
                    >
                        Home Page
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Page;
