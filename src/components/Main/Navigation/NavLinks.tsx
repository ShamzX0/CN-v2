'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Guides', href: '/guide' },
    { name: 'Wallets', href: '/wallets' },
    { name: 'DEX', href: '/swap' },
];

const NavLinks = () => {
    const pathname = usePathname();

    return (
        <div className="space-x-8">
            {navLinks.map((oneLink, index) => {
                const isActive = pathname === oneLink.href; // Check if the current path matches the link

                return (
                    <Link
                        key={index}
                        href={oneLink.href}
                        className={`text-white text-[14px] hover:text-[#bcfbfb] relative group ${isActive ? 'text-[#00FFFF] font-bold' : ''
                            }`}
                    >
                        {oneLink.name}
                        {/* Active indicator or hover indicator */}
                        {isActive ? (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00FFFF]"></span>
                        ) : (
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00FFFF] group-hover:w-full transition-all duration-300"></span>
                        )}
                    </Link>
                );
            })}
        </div>
    );
};

export default NavLinks;