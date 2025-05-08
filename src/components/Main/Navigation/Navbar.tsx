"use client"

// React and Next.js imports
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAccount, useChainId, useSwitchChain } from 'wagmi'

// Components
import NavLinks from '../Navigation/NavLinks'
import { ConnectButton } from '@rainbow-me/rainbowkit'

// Assets
import CryptoNewbie from '../../../../public/images/CryptoNewbie.png'
import { ChevronDown, Wallet } from 'lucide-react'

// Styling constants
const NEON_EFFECTS = {
    hover: 'hover:[box-shadow:0_0_10px_#00d9ff,0_0_40px_#00d9ff,0_0_20px_#00d9ff]',
    active: '[box-shadow:0_0_1px_#00d9ff,0_0_1px_#00d9ff,0_0_10px_#00d9ff]',
    walletHover: 'hover:[box-shadow:0_0_1px_#00d9ff,0_0_1px_#00d9ff,0_0_10px_#00d9ff]'
} as const

interface WalletConnectProps {
    pathname: string;
}

// Component for divider
const Divider = () => (
    <hr className="h-4 w-px mx-2 bg-[#f4f4f4] opacity-30" />
);

export const WalletConnect: React.FC<WalletConnectProps> = ({ pathname }) => {
    const chainId = useChainId()
    const { switchChain } = useSwitchChain()
    const [showNetworkSelect, setShowNetworkSelect] = React.useState(false)
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const iconRef = React.useRef<HTMLDivElement>(null);

    const handleNetworkSelect = (newChainId: number) => {
        switchChain?.({ chainId: newChainId })
        setShowNetworkSelect(false)
    }

    React.useEffect(() => {
        if (!showNetworkSelect) {
            return;
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                iconRef.current &&
                !iconRef.current.contains(event.target as Node)
            ) {
                setShowNetworkSelect(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showNetworkSelect]);

    return (
        <div
            className={`hover:text-[#61d9f1] scale-[0.9] hover:border-transparent rounded border-slate-600 border-[1px] transition duration-300 ease-in-out
            ${pathname === '/swap' ? NEON_EFFECTS.active : NEON_EFFECTS.walletHover}`}
        >
            <ConnectButton.Custom>
                {({
                    account,
                    chain,
                    openAccountModal,
                    openConnectModal,
                    mounted,
                }) => {
                    const ready = mounted;
                    const connected = ready && account && chain;

                    return (
                        <div
                            {...(!ready && {
                                'aria-hidden': true,
                                style: {
                                    opacity: 0,
                                    pointerEvents: 'none',
                                    userSelect: 'none',
                                },
                            })}
                        >
                            {(() => {
                                const baseButtonStyles =
                                    "bg-transparent border-none text-gray-300 hover:text-cyan-400 transition duration-300 ease-in-out flex items-center justify-center gap-2 px-4 py-2 ";

                                if (!connected) {
                                    return (
                                        <button
                                            onClick={openConnectModal}
                                            type="button"
                                            className={baseButtonStyles}
                                        >
                                            <Wallet size={15} /> Connect Wallet
                                        </button>
                                    );
                                }

                                return (
                                    <div className="relative">
                                        <button
                                            onClick={openAccountModal}
                                            type="button"
                                            className={baseButtonStyles}
                                        >
                                            {/* Icon + Chain Name + Address */}
                                            <div className="flex items-center gap-2">
                                                <div
                                                    ref={iconRef}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setShowNetworkSelect(!showNetworkSelect);
                                                    }}
                                                    className="flex items-center gap-1 cursor-pointer"
                                                >
                                                    <ChevronDown size={18} />
                                                    {chain?.iconUrl && typeof chain.iconUrl === 'string' && (
                                                        <Image
                                                            src={chain.iconUrl!}
                                                            alt={chain.name ?? 'Chain icon'}
                                                            width={24}
                                                            height={24}
                                                            className="w-6 h-6"
                                                        />

                                                    )}

                                                </div>
                                                <Divider />
                                                <span
                                                    onClick={openConnectModal}
                                                    className="text-[#f4f4f4] transition-colors duration-300 hover:text-cyan-400"
                                                >
                                                    {account.displayName}
                                                </span>
                                            </div>
                                        </button>

                                        {showNetworkSelect && (
                                            <div
                                                ref={dropdownRef}
                                                className="absolute top-full w-full left-0 mt-2 bg-gray-800/50 backdrop-blur-lg rounded-lg shadow-lg z-50">
                                                {[
                                                    { id: 1, label: ['Ethereum', 'Mainnet'] },
                                                    { id: 11155111, label: ['Sepolia', 'Testnet'] }
                                                ].map((net) => {
                                                    const isActive = chain?.id === net.id;
                                                    return (
                                                        <button
                                                            key={net.id}
                                                            onClick={() => handleNetworkSelect(net.id)}
                                                            className={`w-full flex items-center gap-3 px-4 py-4 rounded transition-colors duration-200 font-bold hover:bg-gray-700 ${isActive ? 'text-gray-300 border-b-[1px] border-opacity-50 border-gray-400' : 'text-gray-400'}`}
                                                        >
                                                            <span className={`flex items-center justify-center w-7 h-7 rounded-full border-[1px] ${isActive ? 'border-cyan-400' : 'border-gray-400'}`}>
                                                                <span className={`w-4 h-4 rounded-full block ${isActive ? 'bg-cyan-400' : 'bg-gray-400'}`} />
                                                            </span>
                                                            <span className="flex flex-col items-start leading-tight">
                                                                <span className="text-sm">{net.label[0]}</span>
                                                                <span className="text-sm">{net.label[1]}</span>
                                                            </span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })()}
                        </div>
                    );
                }}
            </ConnectButton.Custom>
        </div>
    );
};

const LaunchAppButton: React.FC = () => (
    <Link
        href="/swap"
        target="_blank"
        rel="noopener noreferrer"
        className={`neon-card border-opacity-30 text-white/80 text-opacity-80 hover:text-[#61d9f1] py-2 px-4 rounded font-unbounded font-light transition duration-300 ease-in-out 
      ${NEON_EFFECTS.hover}
    `}
    >
        Launch App
    </Link>
)

const Navbar: React.FC = () => {
    const pathname = usePathname()

    return (
        <nav className='flex items-center justify-between py-1 border-b border-b-gray-600'>
            {/* Logo, Brand Name, and Navigation */}
            <div className='flex items-center space-x-8'>
                <Link href="/" className='hover:cursor-pointer'>
                    <Image
                        src={CryptoNewbie}
                        alt="CryptoNewbieCap logo"
                        width={150}
                        className="cursor-pointer"
                        priority
                    />
                </Link>
                <div className='border rotate-90 w-[40px] opacity-30' />
                <NavLinks />
            </div>

            {/* Launch App btn / Connect wallet btn */}
            <div className='flex flex-row gap-4'>
                {pathname === '/swap' && <WalletConnect pathname={pathname} />}
                {pathname !== '/swap' && <LaunchAppButton />}
            </div>
        </nav>
    )
}

export default Navbar