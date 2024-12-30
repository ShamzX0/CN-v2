'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Guides', href: '/guide' },
    { name: 'Wallets', href: '/wallets' },
];

const NavLinks = () => {
    const pathname = usePathname();

    return (
        <div className="space-x-8">
            <Link href="#" className="hover:text-[#00FFFF] border-b-[1.2px] opacity-70 hover:border-[#f4f4f4] hover:opacity-100">
                Connect Wallet
            </Link>
            {navLinks.map((oneLink, index) => {
                const isActive = pathname === oneLink.href; // Check if the current path matches the link

                return (
                    <Link
                        key={index}
                        href={oneLink.href}
                        className={`text-white hover:text-[#00FFFF] ${isActive ? 'text-[#00FFFF] font-bold border-b-[1px] border-[#00FFFF]' : ''
                            }`}
                    >
                        {oneLink.name}
                    </Link>
                );
            })}
        </div>
    );
};

export default NavLinks;
