import Image from 'next/image'
import React from 'react'
import CryptoNewbie from '../../../app/images/CryptoNewbie.png'
import NavLinks from '../Navigation/NavLinks'
// import { Search } from 'lucide-react'
import Link from 'next/link'



const Navbar = () => {
    return (
        <nav className='flex items-center justify-between py-3 px-12 border-b border-opacity-30 border-[#F4F4F4]'>
            {/* Logo, Brand Name, and Navigation */}
            <div className='flex items-center space-x-8'>
                <div className='flex gap-3'>
                    <Image src={CryptoNewbie} alt='CryptoNewbieCap logo' width={150} />
                </div>
                <div className='border rotate-90 w-[40px] opacity-30' />
                <NavLinks />
            </div>

            {/* Launch App Button */}
            <Link href="#" className='neon-card border-opacity-30 text-white/80 text-opacity-80 hover:text-[#f4f4f4] py-2 px-4 rounded font-unbounded font-normal transition duration-300 ease-in-out hover:[box-shadow:0_0_20px_#00d9ff,0_0_10px_#00d9ff,0_0_20px_#00d9ff]'>Launch App</Link>

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

export default Navbar;