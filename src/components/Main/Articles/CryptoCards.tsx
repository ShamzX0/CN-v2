import Image from "next/image"
import BitcoinImg from '../../../../public/images/BitcoinImg.jpeg';
import ethImage from '../../../../public/images/ethImg.png';
import adaImage from '../../../../public/images/adaImg.png'
import avaxImage from '../../../../public/images/avaxImgResized.png'
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from "react";

const info = [
    {
        imageSrc: BitcoinImg,
        name: "Bitcoin",
        symbol: "btc",
        description: `Bitcoin, created in 2009 by the anonymous Satoshi Nakamoto, is a decentralized digital currency operating on blockchain technology. It offers numerous benefits due to its independent nature. Unlike traditional currencies controlled by central banks, Bitcoin is free from censorship, manipulation, and government interference. The blockchain, a distributed ledger, ensures transparency and security by recording all transactions.\n\nOne of Bitcoin's strengths is its limited supply. With only 21 million coins ever to exist, Bitcoin gains value through scarcity. Additionally, Bitcoins decentralized network of nodes makes it extremely secure, as transactions are validated and verified by multiple participants.\n\nBitcoin facilitates peer-to-peer transactions globally, bypassing intermediaries like banks. Its low fees and quick settlement times make it a popular choice for international transactions and remittances. This is particularly beneficial in regions with limited access to traditional banking services or unstable economies. In summary, Bitcoin's decentralized nature, limited supply, and use of blockchain technology offer several advantages. It empowers individuals with financial sovereignty, enables low-cost global transactions, serves as a hedge against inflation, and provides diversification for investment portfolios.`,
        color: "#8c64fc"
    },
    {
        imageSrc: ethImage,
        name: "Ethereum",
        symbol: "eth",
        description: "Ethereum, launched in 2015, is a decentralized blockchain platform that enables the development of smart contracts and decentralized applications (DApps). It was created by Vitalik Buterin and has gained significant traction in the world of cryptocurrencies.At its core, Ethereum functions as a decentralized computing platform, allowing developers to build and deploy smart contracts.\n\nSmart contracts are self-executing agreements with the terms of the agreement directly written into code. They automatically execute when predefined conditions are met, eliminating the need for intermediaries and ensuring transparency and trust in transactions.Ethereum's blockchain technology provides several advantages.Firstly, it allows for the creation and execution of DApps, which are applications that run on the Ethereum network. These DApps can be used for various purposes, such as decentralized finance (DeFi), gaming, and decentralized exchanges.Ethereum's platform offers programmable money, enabling developers to create innovative decentralized applications and tokens. \n\nThis flexibility has led to the growth of the DeFi ecosystem, where users can access various financial services such as lending, borrowing, and decentralized exchanges, all without relying on traditional financial intermediaries.",
        color: "#8c64fc"
    },
    {
        imageSrc: adaImage,
        name: "Cardano",
        symbol: "ada",
        description: "Cardano is a decentralized blockchain platform that aims to provide a secure and scalable infrastructure for the development of decentralized applications and the execution of smart contracts. Launched in 2017, Cardano distinguishes itself through a scientific approach and rigorous peer-reviewed research.One of the key features of Cardano is its focus on sustainability and scalability. It utilizes a unique proof-of-stake consensus algorithm called Ouroboros, which allows for energy-efficient transaction processing and ensures the long-term viability of the network.\n\nCardano's layered architecture separates the settlement layer from the computational layer, enabling efficient scalability and upgrades without compromising security.Cardano also places a strong emphasis on security and formal verification.\n\n By leveraging Haskell, a highly secure and functional programming language, and conducting thorough peer-reviewed audits of its code, Cardano aims to minimize the risks of vulnerabilities and bugs, providing a robust and reliable platform for developers and users.In summary, Cardano is a decentralized blockchain platform known for its scientific approach, scalability, security, and commitment to financial inclusion. It provides a solid foundation for building decentralized applications and executing smart contracts while prioritizing sustainability and partnerships with institutions.",
        color: "#8c64fc"
    },
    {
        imageSrc: avaxImage,
        name: "Avalanche",
        symbol: "avax",
        description: "Avalanche is a decentralized blockchain platform designed to provide high scalability, speed, and security for the development of decentralized applications and the execution of smart contracts.\n\nLaunched in 2020, Avalanche aims to address the limitations of existing blockchain networks and offer a more efficient and user-friendly experience. One of the key strengths of Avalanche is its high scalability. It employs a unique consensus protocol known as Avalanche consensus, which enables the network to process a large number of transactions in parallel. This approach allows for high throughput, low latency, and efficient utilization of network resources, making it well-suited for demanding decentralized applications and financial use cases.Speed is another notable advantage of the Avalanche platform. It boasts sub-second transaction finality, meaning that transactions are confirmed and settled in near real-time. This quick confirmation time enhances user experience and enables fast-paced applications such as decentralized exchanges and gaming platforms.In summary, Avalanche is a decentralized blockchain platform known for its scalability, speed, and security.\n\nIt offers a high-performance infrastructure for decentralized applications and smart contracts, prioritizes fast transaction finality, and ensures network security through its consensus mechanism. Interoperability with other blockchains further enhances its utility, and the native cryptocurrency AVAX facilitates network operations and governance.",
        color: "#8c64fc"
    },

]

export default function CryptoCards() {

    // // State to manage whether to show the full description or not
    const [expandedCard, setExpandedCard] = useState<number | null>(0);

    return (
        <div>
            {
                info.map((oneCrypto, index) => {
                    const isExpanded = expandedCard === index
                    const shortDescription = oneCrypto.description.slice(0, 300) + '. . . . . .'
                    const finalDescription = isExpanded ? oneCrypto.description : shortDescription;
                    return (
                        <div
                            key={index}
                            className={`mt-10 mb-5 rounded-2xl p-7 transition-all duration-500 hover:cursor-pointer ${isExpanded ? 'neon-card' : ""}`}
                            onClick={() => { setExpandedCard(isExpanded ? null : index) }}
                        >
                            <header className="flex items-center gap-1">
                                <Image src={oneCrypto.imageSrc} width={40} height={5} alt={oneCrypto.name} />
                                <h5 className={`mb-1 text-2xl font-extrabold leading-none tracking-tight md:text-2xl lg:text-3xl text-[${oneCrypto.color}] border-l-4 border-transparent md:pl-1`}>
                                    {oneCrypto.name}
                                </h5>
                                <span className={`text-sm italic ml-2 text-[${oneCrypto.color}]`}>({oneCrypto.symbol})</span>
                            </header>

                            <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-[300px] opacity-90'}`}>
                                <p className="whitespace-pre-wrap text-[15px]">{finalDescription}</p>
                            </div>

                            <div className="flex justify-end">
                                {isExpanded ? <ChevronUp /> : <ChevronDown />}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

