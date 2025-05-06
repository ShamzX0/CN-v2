'use client'

import Link from 'next/link';
import btcImage from '../../../public/images/btcImg.jpeg';
import CryptoCards from '@/components/Main/Articles/CryptoCards';
import HeaderSection from '@/components/Guide/HeaderSection';
import ContentSection from '@/components/Guide/ContentSection';
import { guideContent } from '@/components/Guide/guideContent';

const Page = () => {
    return (
        <main className="container w-full md:max-w-4xl mx-auto py-10 text-[#cccbcb]">
            <div className="w-full mt-10 px-4 text-l leading-normal">
                <HeaderSection
                    title={guideContent.header.title}
                    subtitle={guideContent.header.subtitle}
                    imageSrc={btcImage}
                />

                <ContentSection>
                    {guideContent.introduction.paragraphs.map((paragraph, index) => (
                        <p
                            key={index}
                            className={`text-lg font-normal ${index === 0 ? 'mt-3 mb-8' : 'mt-3 mb-3'} lg:text-xl text-gray-400 ${index === 1 ? 'first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-[#208282] first-letter:mr-1 first-letter:float-left' : ''
                                }`}
                        >
                            {paragraph}
                        </p>
                    ))}
                </ContentSection>

                <ContentSection>
                    <h5 className="underline mt-12 underline-offset-3 decoration-8 decoration-[#1d7272] text-4xl font-extrabold">
                        {guideContent.briefIntroduction.title}
                    </h5>
                    <p className="py-6">
                        {guideContent.briefIntroduction.content}
                    </p>
                </ContentSection>

                <div className='py-6'>
                    <div className="border-b-2 border-[#1d7272]" />
                    <h4 className="border-l-7 border-gray-500 font-medium text-lg italic my-8 neon-writing">
                        {guideContent.keyCharacteristics.title}
                    </h4>
                    <div className="border-b-[1px] border-[#1d7272]" />
                </div>

                <ContentSection>
                    <h5 className="my-10 text-4xl font-extrabold tracking-tight text-white">
                        <span className="underline underline-offset-3 decoration-8 decoration-[#1d7272]">
                            {guideContent.typesOfCryptocurrencies.title}
                        </span>
                    </h5>
                    <p className="text-lg font-normal lg:text-xl text-gray-400">
                        {guideContent.typesOfCryptocurrencies.content}
                    </p>
                    <CryptoCards />
                </ContentSection>

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
