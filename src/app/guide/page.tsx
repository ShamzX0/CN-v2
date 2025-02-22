'use client'

import Image from 'next/image';
import Link from 'next/link';
import btcImage from '../../../public/images/btcImg.jpeg';
import CryptoCards from '@/components/Main/Articles/CryptoCards';

const HeaderSection = ({ title, subtitle, imageSrc }: { title: string, subtitle: string, imageSrc?: string }) => (
    <section className="mb-8">
        <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white">
            {title}
            <br />
            <span className="underline underline-offset-3 decoration-8 decoration-[#208282]">{subtitle}</span>
        </h1>
        {imageSrc && <Image src={imageSrc} alt="Header Image" width={900} height={10} className="mb-5" />}
    </section>
);

const Page = () => {
    return (
        <main className="container w-full md:max-w-4xl mx-auto py-10 text-[#cccbcb]">
            <div className="w-full mt-10 px-4 text-l leading-normal">
                <HeaderSection
                    title="What is Cryptocurrency?"
                    subtitle="The Digital Currency Revolution"
                    imageSrc={btcImage}
                />
                <p className="text-lg font-normal mt-3 mb-8 lg:text-xl text-gray-400">
                    In the ever-evolving landscape of digital finance, cryptocurrencies have emerged as a disruptive force,
                    reshaping the way we perceive and transact value. This revolution, where technology and innovation converge,
                    is set to change the world.
                </p>
                <p className="mb-3 text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-[#208282] first-letter:mr-1 first-letter:float-left">
                    Cryptocurrency is a complex concept. Many people struggle to understand the technology behind it, let alone
                    its investment potential. Over the past decade, cryptocurrency values have soared, surprising even the most
                    skeptical investors. This guide aims to demystify the subject.
                </p>
                <p className="text-lg font-normal mt-3 mb-3 lg:text-xl text-gray-400">
                    This beginner's guide will introduce you to cryptocurrencies, blockchain technology, and the distinctions between
                    different projects. With this knowledge, you can decide which cryptocurrency aligns with your goals.
                </p>
                <h5 className="underline mt-12 underline-offset-3 decoration-8 decoration-[#1d7272] text-4xl font-extrabold">
                    Brief Introduction
                </h5>
                <p className="py-6">
                    Cryptocurrency is revolutionizing finance and technology. Operating independently of traditional banking,
                    it represents a new form of digital currency. This article explores cryptocurrency's foundation, technology,
                    and potential implications.
                </p>
                <div className='py-6'>
                    <div className="border-b-2 border-[#1d7272]" />
                    <h4 className="border-l-7 border-gray-500 font-medium text-lg italic my-8 neon-writing">
                        Key Characteristics You Should Know About...
                    </h4>
                    <div className="border-b-[1px] border-[#1d7272]" />
                </div>
                <h5 className="my-10 text-4xl font-extrabold tracking-tight text-white">
                    <span className="underline underline-offset-3 decoration-8 decoration-[#1d7272]">Types of Cryptocurrencies</span>
                </h5>
                <p className="text-lg font-normal lg:text-xl text-gray-400">
                    Bitcoin remains the king of cryptocurrencies, but the digital ecosystem is filled with diverse assets.
                    Here, we showcase some of the most promising cryptocurrencies with solid foundations and exciting futures.
                </p>
                <CryptoCards />
                <blockquote className="border-l-4 border-[#1d7272] italic my-8 pl-8 md:pl-12">
                    Cryptocurrencies have transformed how we perceive and exchange value. Their decentralized nature and blockchain
                    technology provide transparency, security, and global accessibility.
                </blockquote>
                <div className="text-base md:text-sm mt-11 text-gray-500 px-4">
                    <Link
                        href="/"
                        className="neon-card border-opacity-30 text-white/80 hover:text-[#f4f4f4] py-2 px-4 rounded font-unbounded font-light transition duration-200 ease-in-out hover:[box-shadow:0_0_20px_#00d9ff,0_0_20px_#00d9ff,0_0_20px_#00d9ff]"
                    >
                        Home Page
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Page;
