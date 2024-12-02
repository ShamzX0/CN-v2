import Image from 'next/image'
import React from 'react'
import cnlogo from '@/app/images/cnlogo.ico'
import { Search } from 'lucide-react'

const Navbar = () => {
    return (
        <header className='flex justify-between mb-1 py-3 border-transparent rounded-xl'>
            {/* Logo and Brand Name */}
            <div className='flex gap-3 items-center'>
                <Image src={cnlogo} alt='CryptoNewbieCap logo' width={50} height={20} />
                <h1 className='font-extrabold text-lg font-mono'>
                    Crypto<span className='text-[#00FFFF]'>N</span>ewbieCap
                </h1>
            </div>

            {/* Navigation */}
            <nav className='flex items-center space-x-10'>
                <a href="#" className='hover:text-[#00FFFF] border-b-[1.2px] border-[#00FFFF] hover:border-[#f4f4f4]'>Connect wallet</a>
                <a href="#" className='hover:text-[#00FFFF] '>Articles</a>
                <a href="#" className='hover:text-[#00FFFF]'>DEX</a>

                {/* Search Bar */}
                <div className='relative flex items-center bg-[#272e3e] rounded-lg px-4 py-2 group'>
                    <Search className='h-5 w-5 text-gray-400' />
                    <input
                        type="text"
                        placeholder="Search"
                        className='bg-transparent border-none outline-none pl-2 text-gray-300 placeholder-gray-400 w-[200px]'
                    />
                    <kbd className='border border-gray-500 px-2 py-0.5 rounded ml-2 text-sm text-gray-400'>/</kbd>

                    {/* Gradient Border Effect */}
                    <div className='absolute inset-0 rounded-lg bg-gradient-to-l from-[#00FFFF] via-transparent to-transparent opacity-30 pointer-events-none'></div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar