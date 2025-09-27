"use client";

import React from 'react';
import { FiHome, FiShoppingBag, FiShoppingCart, FiHeart, FiLogIn, FiUser } from "react-icons/fi";
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import LoginModal from '../modal/LoginModal';
import RegisterModal from '../modal/RegisterModal';

const Header = () => {
    const pathname = usePathname();
    const [openLogin, setOpenLogin] = React.useState(false);
    const [openRegister, setOpenRegister] = React.useState(false);

    const navLinks = [
        { href: "/", icon: <FiHome />, label: "Home" },
        { href: "/shop", icon: <FiShoppingBag />, label: "Shop" },
        { href: "/cart", icon: <FiShoppingCart />, label: "Cart" },
        { href: "/favourite", icon: <FiHeart />, label: "Favourite" },
    ];

    return (
        <header className='h-20 shadow-lg'>
            <div className='container mx-auto grid grid-cols-3 items-center justify-evenly gap-6 h-full'>
                <div>
                    <h1 className='font-bold text-2xl'>Azushop</h1>
                </div>

                {/* Nav Links */}
                <div className='flex items-center justify-evenly gap-4 font-semibold'>
                    {navLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={clsx(
                                'flex items-center justify-center gap-2 hover:text-[#01589A]',
                                pathname === link.href && 'underline underline-offset-10 text-[#01589A]'
                            )}
                        >
                            {link.icon}
                            <h1>{link.label}</h1>
                        </Link>
                    ))}
                </div>

                {/* Right Side */}
                <div className='flex items-center justify-end gap-4 font-semibold'>
                    <div
                        className='flex items-center justify-center gap-2 cursor-pointer'
                        onClick={() => setOpenLogin(true)}
                    >
                        <FiLogIn />
                        <h1>Login</h1>
                    </div>

                    <div className='flex items-center justify-center gap-2 cursor-pointer'
                        onClick={() => setOpenRegister(true)}
                    >
                        <FiUser />
                        <h1>Register</h1>
                    </div>
                </div>
            </div>

            {/* Login Modal */}
            <LoginModal open={openLogin} handleClose={() => setOpenLogin(false)} />

            {/* Register Modal */}
            <RegisterModal open={openRegister} handleClose={() => setOpenRegister(false)} />
        </header>
    );
}

export default Header;
