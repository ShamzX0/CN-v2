import Link from 'next/link'
import React from 'react'

const navlinks = [
    {
        name: 'Home',
        href: '#'
    },
    {
        name: 'News',
        href: '#'
    },
    {
        name: 'Articles',
        href: '#'
    },

]

const NavLinks = () => {
    return (
        <div className='space-x-8'>
            <Link href="#" className='hover:text-[#00FFFF] border-b-[1.2px] border-[#00FFFF] hover:border-[#f4f4f4]'>Connect wallet</Link>
            {
                navlinks.map((oneLink, index) => {
                    return (
                        <Link href={oneLink.href} className='text-white hover:text-[#00FFFF]' key={index}>{oneLink.name}</Link>
                    )
                })
            }
        </div>
    )
}

export default NavLinks
