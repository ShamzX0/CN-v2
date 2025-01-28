import Image from 'next/image'
import walletImg from '../../../public/images/wallet1.jpeg'
import LedgerNanoX from '../../../public/images/LedgerNanoXFinal.jpeg'
import BitBox from '../../../public/images/BitBox.jpeg'
import TrezorOne from '../../../public/images/TrezorOne.jpeg'
import Link from 'next/link'
import { ShieldMinus, ShieldPlus } from 'lucide-react'

const WalletPage = () => {
    return (
        <main className="container w-full max-w-4xl mx-auto py-10 text-[#cccbcb] px-6">
            <section className="space-y-20">
                {/* Hero Section */}
                <div className="space-y-8">
                    <h1 className="text-5xl font-extrabold leading-tight text-white">
                        Everything you need to know about{' '}
                        <span className="underline underline-offset-3 decoration-8 decoration-[#208282]">
                            Hardware Wallets
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400">
                        In the world of cryptocurrency, security is paramount. That&apos;s where hardware wallets come in.
                        These specialized devices provide a secure way to store and protect your private keys,
                        ensuring the safety of your valuable digital assets.
                    </p>

                    <Image
                        src={walletImg}
                        alt="Hardware wallet illustration"
                        width={900}
                        height={10}
                        className="rounded-lg"
                    />
                </div>

                {/* Introduction */}
                <article className="space-y-8 text-gray-400">
                    <p className="first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-[#208282] first-letter:mr-3 first-letter:float-left">
                        Hardware wallet is essential for many of us. Aside from helping us feel more connected to our funds,
                        hardware wallets keep us safe and give us peace of mind when using digital currencies.
                    </p>

                    <p className="text-lg leading-relaxed">
                        My mission for the past few years is to help people understand cryptocurrencies and keep them safe when using them.
                        A hardware wallet is one of the most essential components in securing your cryptocurrency.
                    </p>

                    <p className="text-lg leading-relaxed">
                        If you&apos;re looking for one, you will want the best hardware wallet for the crypto you can find.
                        Read through this guide to understand the difference between the different wallet providers.
                        If you are in a hurry to find the best your money can buy, you&apos;ve also come to the right place.
                    </p>
                </article>

                {/* Swiss Bank Section */}
                <section className="space-y-8">
                    <h2 className="text-4xl font-extrabold text-white">
                        <span className="underline underline-offset-3 decoration-8 decoration-[#208282]">
                            Swiss Bank in your pocket!
                        </span>
                    </h2>

                    <div className="space-y-8 text-gray-400">
                        <p className="text-lg leading-relaxed">
                            In addition to the aforementioned benefits, it is crucial to emphasize
                            the importance of keeping track of your passwords and securely storing them!
                            When using a hardware wallet, it is common to have a recovery seed phrase—a
                            series of words that acts as a backup to restore your wallet in case of loss
                            or damage.
                        </p>

                        <blockquote className="py-8 border-l-4 border-[#208282] font-medium text-2xl italic pl-8">
                            NOT YOUR KEYS, NOT YOUR CRYPTO!
                        </blockquote>

                        <p className="text-lg leading-relaxed">
                            This seed phrase should be treated with the utmost care and stored
                            in a secure location, preferably offline and away from prying eyes.
                        </p>
                    </div>
                </section>

                {/* Wallet Comparisons */}
                <section className="space-y-12">
                    <h2 className="text-4xl font-extrabold text-white">
                        A Deep Dive into the Pros & Cons of 3{' '}
                        <span className="underline underline-offset-3 decoration-8 decoration-[#208282]">
                            Popular Hardware Wallets
                        </span>
                    </h2>

                    {/* Ledger Nano X */}
                    <article className="space-y-10 bg-gray-800/30 rounded-xl p-8">
                        <header className="space-y-6">
                            <h3 className="text-2xl font-bold text-white flex items-center gap-4">
                                <span className="text-[#208282]">#1</span>
                                <span className="border-l-4 border-[#208282] pl-4 italic">
                                    Ledger Nano X Hardware Wallet
                                </span>
                            </h3>

                            <div className="flex justify-center">
                                <Image
                                    src={LedgerNanoX}
                                    alt="Ledger Nano X device"
                                    width={400}
                                    height={10}
                                    className="rounded-lg"
                                />
                            </div>
                        </header>

                        <div className="space-y-8 text-gray-400">
                            <p className="text-lg leading-relaxed">
                                The Ledger Nano X is an advanced hardware wallet created by Ledger,
                                a prominent company renowned for its expertise in providing secure
                                solutions for cryptocurrency storage.
                            </p>

                            {/* Pros */}
                            <div className="p-6 bg-gray-800/50 rounded-lg space-y-4">
                                <div className="flex items-center gap-2 text-2xl text-green-500 font-semibold">
                                    <ShieldPlus />
                                    <span>Positives</span>
                                </div>
                                <p className="text-lg leading-relaxed">
                                    Ledger is the most popular hardware wallet provider. The wallet allows
                                    you to store many different cryptocurrencies, including major coins like
                                    Bitcoin (BTC), Ethereum (ETH), and Litecoin (LTC), as well as numerous
                                    altcoins and ERC-20 tokens.
                                </p>
                            </div>

                            {/* Cons */}
                            <div className="p-6 bg-gray-800/50 rounded-lg space-y-4">
                                <div className="flex items-center gap-2 text-2xl text-red-400 font-semibold">
                                    <ShieldMinus />
                                    <span>Negatives</span>
                                </div>
                                <p className="text-lg leading-relaxed">
                                    Interference layout makes it so that setting up or rebooting your wallet
                                    takes a considerable amount of time. The added mobile support is great but
                                    its main improvement, Bluetooth functionality, is far from being smooth.
                                </p>
                            </div>
                        </div>
                    </article>

                    {/* BitBox */}
                    <article className="space-y-10 bg-gray-800/30 rounded-xl p-8">
                        <header className="space-y-6">
                            <h3 className="text-2xl font-bold text-white flex items-center gap-4">
                                <span className="text-[#208282]">#2</span>
                                <span className="border-l-4 border-[#208282] pl-4 italic">
                                    BitBox Hardware Wallet
                                </span>
                            </h3>

                            <div className="flex justify-center">
                                <Image
                                    src={BitBox}
                                    alt="BitBox device"
                                    width={400}
                                    height={10}
                                    className="rounded-lg"
                                />
                            </div>
                        </header>

                        <div className="space-y-8 text-gray-400">
                            <p className="text-lg leading-relaxed">
                                The BitBox02 is a hardware wallet designed and manufactured by Shift Crypto,
                                a Swiss company known for its commitment to security and user privacy.
                                This device represents a significant evolution in cryptocurrency storage solutions.
                            </p>

                            {/* Pros */}
                            <div className="p-6 bg-gray-800/50 rounded-lg space-y-4">
                                <div className="flex items-center gap-2 text-2xl text-green-500 font-semibold">
                                    <ShieldPlus />
                                    <span>Positives</span>
                                </div>
                                <p className="text-lg leading-relaxed">
                                    BitBox offers an intuitive interface and robust security features.
                                    The device is compact, durable, and comes with a straightforward setup process.
                                    Its minimalist design and touch sensors make it easy to navigate through
                                    different functions.
                                </p>
                            </div>

                            {/* Cons */}
                            <div className="p-6 bg-gray-800/50 rounded-lg space-y-4">
                                <div className="flex items-center gap-2 text-2xl text-red-400 font-semibold">
                                    <ShieldMinus />
                                    <span>Negatives</span>
                                </div>
                                <p className="text-lg leading-relaxed">
                                    Limited cryptocurrency support compared to other hardware wallets.
                                    The device might feel too simple for advanced users who need more
                                    complex features. Some users report occasional connectivity issues
                                    with the companion app.
                                </p>
                            </div>
                        </div>
                    </article>

                    {/* Trezor One */}
                    <article className="space-y-10 bg-gray-800/30 rounded-xl p-8">
                        <header className="space-y-6">
                            <h3 className="text-2xl font-bold text-white flex items-center gap-4">
                                <span className="text-[#208282]">#3</span>
                                <span className="border-l-4 border-[#208282] pl-4 italic">
                                    Trezor One Hardware Wallet
                                </span>
                            </h3>

                            <div className="flex justify-center">
                                <Image
                                    src={TrezorOne}
                                    alt="Trezor One device"
                                    width={400}
                                    height={10}
                                    className="rounded-lg"
                                />
                            </div>
                        </header>

                        <div className="space-y-8 text-gray-400">
                            <p className="text-lg leading-relaxed">
                                The Trezor One is a pioneering hardware wallet that helped establish
                                the standards for cryptocurrency security. Created by SatoshiLabs,
                                it continues to be a reliable choice for crypto enthusiasts.
                            </p>

                            {/* Pros */}
                            <div className="p-6 bg-gray-800/50 rounded-lg space-y-4">
                                <div className="flex items-center gap-2 text-2xl text-green-500 font-semibold">
                                    <ShieldPlus />
                                    <span>Positives</span>
                                </div>
                                <p className="text-lg leading-relaxed">
                                    Known for its excellent security features and open-source firmware.
                                    The device is very user-friendly and comes with comprehensive documentation.
                                    It supports a wide range of cryptocurrencies and has a proven track record
                                    in the industry.
                                </p>
                            </div>

                            {/* Cons */}
                            <div className="p-6 bg-gray-800/50 rounded-lg space-y-4">
                                <div className="flex items-center gap-2 text-2xl text-red-400 font-semibold">
                                    <ShieldMinus />
                                    <span>Negatives</span>
                                </div>
                                <p className="text-lg leading-relaxed">
                                    The hardware design feels somewhat dated compared to newer models.
                                    The small screen can make it challenging to verify transactions.
                                    Some advanced features require technical knowledge to utilize fully.
                                </p>
                            </div>
                        </div>
                    </article>
                    {/* PRODUCTS */}
                    <p className="font-normal mt-16 mb-10 lg:text-xl text-gray-400 border-l-4 border-[#208282] italic my-8 pl-8 md:pl-8">&quot;By equipping yourself with a hardware wallet, you&apos;re not merely joining the cryptocurrency revolution, you&apos;re securing your place in it. Safeguarding your digital assets becomes effortless, allowing you to explore the possibilities and potential of this exciting landscape with peace of mind.&quot;</p>
                    <div className='flex gap-6 flex-wrap sm:gap-4 sm:flex-nowrap lg:gap-6'>
                        {/* Ledger Nano X */}
                        <div className="w-50 max-w-sm  border rounded-lg shadow bg-gray-800 border-gray-700 neon-card">
                            <a href="https://shop.ledger.com/products/ledger-nano-x" target='_blank'>
                                <Image className="p-4  rounded-t-lg" src={LedgerNanoX} alt="product image" />
                            </a>
                            <div className="px-5 pb-5">
                                <a href="https://shop.ledger.com/products/ledger-nano-x" target='_blank'>
                                    <h5 className="text-sm font-semibold tracking-tight text-white">Secure, buy, exchange, grow your crypto and your NFTs with our hardware wallet</h5>
                                </a>
                                {/* Star */}
                                <div className="flex items-center mt-2.5 mb-5">
                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <span className="text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ml-3">5.0</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className='font-thin text-xs pt-2 mr-1'>from</span><span className="text-2xl font-bold text-white">$165</span>
                                    </div>
                                    <a href="https://shop.ledger.com/products/ledger-nano-x" target='_blank' className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-10 py-2 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">View</a>
                                </div>
                            </div>
                        </div>
                        {/* BitBox */}

                        <div className="w-50 max-w-sm border rounded-lg shadow bg-gray-800 border-gray-700 neon-card">
                            <a href="https://bitbox.swiss/bitbox02/" target='_blank'>
                                <Image className="p-8 rounded-t-lg w-lg" src={BitBox} alt="product image" />
                            </a>
                            <div className="px-5 pb-5">
                                <a href="https://bitbox.swiss/bitbox02/" target='_blank'>
                                    <h5 className="text-sm font-semibold tracking-tight text-white">Protect your coins with the latest Swiss made hardware wallet</h5>
                                </a>
                                {/* Start rating */}
                                <div className="flex items-center mt-2.5 mb-5">
                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <span className="text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ml-3">5.0</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className='font-thin text-xs pt-2 mr-1'>from</span><span className="text-2xl font-bold text-white">$148</span>
                                    </div>
                                    <a href="https://shop.ledger.com/products/ledger-nano-x" target='_blank' className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-10 py-2 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">View</a>
                                </div>
                            </div>
                        </div>

                        {/* Trezor One*/}
                        <div className="w-50 max-w-sm border rounded-lg shadow neon-card bg-gray-800 border-gray-700">
                            <a href="https://trezor.io/trezor-model-one" target='_blank'>
                                <Image className="rounded-t-lg" src={TrezorOne} alt="product image" />
                            </a>
                            <div className="px-5 pb-1">
                                <a href="https://trezor.io/trezor-model-one" target='_blank'>
                                    <h5 className="text-sm font-semibold tracking-tight text-white">The Trezor Model One is the #1 Bitcoin hardware wallet choice</h5>
                                </a>
                                {/* star rating */}
                                <div className="flex items-center mt-2 mb-5">
                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <span className="text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ml-3">5.0</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className='font-thin text-xs pt-2 mr-1'>from</span><span className="text-2xl font-bold text-white">$69</span>
                                    </div>
                                    <a href="https://shop.ledger.com/products/ledger-nano-x" target='_blank' className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-10 py-2 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">View</a>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* FINAL NOTES */}

                    <blockquote className="border-l-4 border-[#208282] italic my-8 pl-8 md:pl-8"> We trust that this article has served as your guiding light, paving the way for you to make an informed decision. With a newfound understanding of hardware wallets, you now recognize their indispensability in the vast realm of the cryptoverse.</blockquote>
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

            </section>
        </main>
    )
}

export default WalletPage