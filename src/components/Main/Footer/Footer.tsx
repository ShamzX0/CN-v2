import React from 'react';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import cnlogo from '../../../../public/images/CNlogoMini.png';
import { FiFacebook } from 'react-icons/fi';
import { BsInstagram } from 'react-icons/bs';
import { SlSocialLinkedin } from 'react-icons/sl';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="text-gray-300 mt-[30px]">
            <div className="w-full mx-auto px-4 py-4">
                {/* Divider */}
                <div className="border-[1px] border-transparent border-[#00d9ff] neon-card mb-6" />
                <div className="flex gap-3 items-center">
                    <Image src={cnlogo} alt="CryptoNewbieCap logo" width={30} height={10} />
                    <h1 className="font-extrabold text-sm font-mono">
                        Crypto<span className="text-[#00FFFF]">N</span>ewbie
                    </h1>
                </div>
                <div>
                    <div className="flex justify-center space-x-6">
                        <a href="https://www.facebook.com/profile.php?id=1775273260" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FiFacebook className="w-6 h-6 hover:text-[#00FFFF] transition-colors" />
                        </a>
                        <a href="https://x.com/_ShamzX_" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <FaXTwitter className="w-6 h-6 hover:text-[#00FFFF] transition-colors" />
                        </a>
                        <a href="https://www.instagram.com/ourr.travels/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <BsInstagram className="w-6 h-6 hover:text-[#00FFFF] transition-colors" />
                        </a>
                        <a href="https://www.linkedin.com/in/petr-mirf%C3%ABa-56a104270/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <SlSocialLinkedin className="w-6 h-6 hover:text-[#00FFFF] transition-colors" />
                        </a>
                        <a href="https://github.com/ShamzX0" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <FaGithub className="w-6 h-6 hover:text-[#00FFFF] transition-colors" />
                        </a>
                    </div>

                    {/* Bottom bar */}
                    <div className="">
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
                {/* Social Media Icons */}
            </div>
        </footer>
    );
};

export default Footer;
