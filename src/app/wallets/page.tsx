'use client'

import Image from 'next/image'
import Link from 'next/link'
import walletImg from '../../../public/images/wallet1.jpeg'
import LedgerNanoX from '../../../public/images/LedgerNanoXFinal.jpeg'
import BitBox from '../../../public/images/BitBox.jpeg'
import TrezorOne from '../../../public/images/TrezorOne.jpeg'
import HeaderSection from '@/components/Guide/HeaderSection'
import ContentSection from '@/components/Guide/ContentSection'
import WalletCard from '@/components/Wallets/WalletCard'
import { walletContent } from '@/components/Wallets/walletContent'

const WalletPage = () => {
    return (
        <main className="container w-full max-w-4xl mx-auto py-10 text-[#cccbcb] px-6">
            <section className="space-y-20">
                {/* Hero Section */}
                <HeaderSection
                    title={walletContent.header.title}
                    subtitle={walletContent.header.subtitle}
                    imageSrc={walletImg}
                />

                {/* Introduction */}
                <ContentSection>
                    {walletContent.introduction.paragraphs.map((paragraph, index) => (
                        <p
                            key={index}
                            className={`text-lg leading-relaxed ${index === 0 ? 'text-xl' : ''
                                } ${index === 1 ? 'first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-[#208282] first-letter:mr-3 first-letter:float-left' : ''
                                }`}
                        >
                            {paragraph}
                        </p>
                    ))}
                </ContentSection>

                {/* Swiss Bank Section */}
                <ContentSection>
                    <h2 className="text-4xl font-extrabold text-white">
                        <span className="underline underline-offset-3 decoration-8 decoration-[#208282]">
                            {walletContent.swissBank.title}
                        </span>
                    </h2>
                    <div className="space-y-8 text-gray-400">
                        <p className="text-lg leading-relaxed">
                            {walletContent.swissBank.content}
                        </p>
                        <blockquote className="py-8 border-l-4 border-[#208282] font-medium text-2xl italic pl-8">
                            {walletContent.swissBank.quote}
                        </blockquote>
                        <p className="text-lg leading-relaxed">
                            {walletContent.swissBank.additionalContent}
                        </p>
                    </div>
                </ContentSection>

                {/* Wallet Comparisons */}
                <ContentSection>
                    <h2 className="text-4xl font-extrabold text-white">
                        {walletContent.walletComparison.title}
                    </h2>
                    <div className="space-y-12">
                        <WalletCard
                            wallet={walletContent.walletComparison.wallets[0]}
                            imageSrc={LedgerNanoX}
                        />
                        <WalletCard
                            wallet={walletContent.walletComparison.wallets[1]}
                            imageSrc={BitBox}
                        />
                        <WalletCard
                            wallet={walletContent.walletComparison.wallets[2]}
                            imageSrc={TrezorOne}
                        />
                    </div>
                </ContentSection>

                {/* Final Notes */}
                <ContentSection>
                    <blockquote className="border-l-4 border-[#208282] italic my-8 pl-8 md:pl-8">
                        {walletContent.finalNotes.quote}
                    </blockquote>
                </ContentSection>

                {/* Footer Link */}
                <div className="text-base md:text-sm text-gray-500 px-4">
                    <Link
                        href="/"
                        className="neon-card border-opacity-30 text-white/80 hover:text-[#f4f4f4] py-2 px-4 rounded font-unbounded font-light transition duration-200 ease-in-out hover:[box-shadow:0_0_20px_#00d9ff,0_0_20px_#00d9ff,0_0_20px_#00d9ff]"
                    >
                        Home Page
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default WalletPage;