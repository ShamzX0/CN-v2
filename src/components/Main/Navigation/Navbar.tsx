"use client"

// React and Next.js imports
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Components
import NavLinks from '../Navigation/NavLinks'
import { ConnectButton } from '@rainbow-me/rainbowkit'

// Assets
import CryptoNewbie from '../../../../public/images/CryptoNewbie.png'

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

export const WalletConnect: React.FC<WalletConnectProps> = ({ pathname }) => (
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
                                "bg-transparent border-none text-gray-300 hover:scale-[1.03] hover:text-cyan-400 transition duration-300 ease-in-out flex items-center justify-center gap-2 px-4 py-2 ";

                            if (!connected) {
                                return (
                                    <button
                                        onClick={openConnectModal}
                                        type="button"
                                        className={baseButtonStyles}
                                    >
                                        Connect Wallet
                                    </button>
                                );
                            }

                            return (
                                <button
                                    onClick={openAccountModal}
                                    type="button"
                                    className={baseButtonStyles}
                                >
                                    {/* Icon + Chain Name + Address */}
                                    <div className="flex items-center gap-2">
                                        {chain?.iconUrl && typeof chain.iconUrl === 'string' && (
                                            <Image
                                                src={chain.iconUrl!}
                                                alt={chain.name ?? 'Chain icon'}
                                                width={24}
                                                height={24}
                                                className="w-6 h-6"
                                            />
                                        )}
                                        <Divider />
                                        <span
                                            onClick={openConnectModal}
                                            className="text-[#f4f4f4] transition-colors duration-300 hover:text-cyan-400"
                                        >
                                            {account.displayName}
                                        </span>

                                    </div>
                                </button>
                            );
                        })()}
                    </div>
                );


            }}
        </ConnectButton.Custom>
    </div>
);

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
                <WalletConnect pathname={pathname} />
                {pathname !== '/swap' && <LaunchAppButton />}
            </div>
        </nav>
    )
}

export default Navbar