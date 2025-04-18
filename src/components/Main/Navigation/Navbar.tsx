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

const WalletConnect: React.FC<WalletConnectProps> = ({ pathname }) => (
    <div
        className={`hover:text-[#61d9f1] scale-[0.9] hover:border-transparent rounded border-slate-600 border-[1px] transition duration-300 ease-in-out
      ${pathname === '/swap' ? NEON_EFFECTS.active : NEON_EFFECTS.walletHover}
    `}
    >
        <div className='bg-[#1d1d20f1]'>
            <ConnectButton
                chainStatus="icon"
                accountStatus="address"
                showBalance={false}
            />
        </div>
    </div>
)

const LaunchAppButton: React.FC = () => (
    <Link
        href="/swap"
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