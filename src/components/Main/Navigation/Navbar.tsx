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
        className={`
      hover:text-[#61d9f1] 
      scale-[0.9] 
      hover:border-transparent 
      rounded 
      border-slate-600 
      border-[1px] 
      transition 
      duration-300 
      ease-in-out 
      ${pathname === '/swap' ? NEON_EFFECTS.active : NEON_EFFECTS.walletHover}
    `}
    >
        <ConnectButton
            chainStatus="icon"
            accountStatus="address"
            showBalance={false}
        />
    </div>
)

const LaunchAppButton: React.FC = () => (
    <Link
        href="/swap"
        className={`
      neon-card 
      border-opacity-30 
      text-white/80 
      text-opacity-80 
      hover:text-[#61d9f1] 
      py-2 
      px-4 
      rounded 
      font-unbounded 
      font-light 
      transition 
      duration-300 
      ease-in-out 
      ${NEON_EFFECTS.hover}
    `}
    >
        Launch App
    </Link>
)

const Navbar: React.FC = () => {
    const pathname = usePathname()

    return (
        <nav className='flex items-center justify-between py-3 px-12 border-b border-opacity-30 border-[#F4F4F4]'>
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

            {/* Launch App Button / Connect wallet btn */}
            <div className='flex flex-row gap-4'>
                <WalletConnect pathname={pathname} />
                {pathname !== '/swap' && <LaunchAppButton />}
            </div>

            {/* Search Bar */}
            {/* <div className='relative flex items-center bg-[#272e3e] rounded-lg px-4 py-2 group'>
          <Search className='h-5 w-5 text-gray-400' />
          <input
              type="text"
              placeholder="Search"
              className='bg-transparent border-none outline-none pl-2 text-gray-300 placeholder-gray-400 w-[200px]'
          />
          <kbd className='border border-gray-500 px-2 py-0.5 rounded ml-2 text-sm text-gray-400'>/</kbd> */}

            {/* Gradient Border Effect */}
            {/* <div className='absolute inset-0 rounded-lg bg-gradient-to-l from-[#00FFFF] via-transparent to-transparent opacity-30 pointer-events-none'></div>
      </div> */}
        </nav>
    )
}

export default Navbar