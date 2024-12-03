import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import cnlogo from '@/app/images/cnlogo.ico'

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="text-gray-300">
            <div className="max-w-6xl mx-auto px-4 py-4">
                <div className='flex gap-3 items-center'>
                    <Image src={cnlogo} alt='CryptoNewbieCap logo' width={30} height={10} />
                    <h1 className='font-extrabold text-sm font-mono'>
                        Crypto<span className='text-[#00FFFF]'>N</span>ewbieCap
                    </h1>
                </div>
                {/* Bottom bar */}
                <div className="border-t border-[#00FFFF] opacity-50 mt-3 pt-3">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-xs">
                            © {currentYear} Company Name. All rights reserved.
                        </p>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <a href="/privacy" className="text-xs hover:text-white transition-colors">
                                Privacy Policy
                            </a>
                            <a href="/terms" className="text-xs hover:text-white transition-colors">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;