"use client";

import React, { useContext, useState } from "react";
import { FiHome, FiShoppingBag, FiShoppingCart, FiHeart, FiLogIn, FiUser } from "react-icons/fi";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Avatar, Menu, MenuItem, Divider } from "@mui/material";
import { logout } from "@/lib/features/auth/authSlice";
import { useAppDispatch } from '@/lib/hooks';
import { toast } from 'react-toastify';
import LoginModal from "../modal/LoginModal";
import RegisterModal from "../modal/RegisterModal";
import { UserContext } from "@/lib/context/UserContext";
import { useRouter } from "next/navigation";
const Header = () => {
    const pathname = usePathname();
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { user, setUser } = useContext(UserContext);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Logout function
    const handleLogout = async () => {
        try {
            const result = await dispatch(logout());
            if (logout.fulfilled.match(result)) {
                toast.success("Logout successful");
                localStorage.removeItem("user");
                setUser(null);
                handleClose();
                router.push("/")
            } else {
                toast.error(result.payload as string);
            }
        } catch (error) {
            toast.error(error as string);
        }
    };

    const navLinks = [
        { href: "/", icon: <FiHome />, label: "Home" },
        { href: "/shop", icon: <FiShoppingBag />, label: "Shop" },
        { href: "/cart", icon: <FiShoppingCart />, label: "Cart" },
        { href: "/favourite", icon: <FiHeart />, label: "Favourite" },
    ];

    const userMenu = [
        <MenuItem key="orders" onClick={handleClose}>
            <Link href="/orders">Orders</Link>
        </MenuItem>,
        <MenuItem key="profile" onClick={handleClose}>
            <Link href="/profile">Profile</Link>
        </MenuItem>,
        <Divider key="divider1" />,
        <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>,
    ];

    const adminMenu = [
        <MenuItem key="dashboard" onClick={handleClose}>
            <Link href="/dashboard">Dashboard</Link>
        </MenuItem>,
        <MenuItem key="products" onClick={handleClose}>
            <Link href="/products">Products</Link>
        </MenuItem>,
        <MenuItem key="category" onClick={handleClose}>
            <Link href="/category">Category</Link>
        </MenuItem>,
        <MenuItem key="orders" onClick={handleClose}>
            <Link href="/orders">Orders</Link>
        </MenuItem>,
        <MenuItem key="all-orders" onClick={handleClose}>
            <Link href="/all-orders">All Orders</Link>
        </MenuItem>,
        <MenuItem key="users" onClick={handleClose}>
            <Link href="/users">Users</Link>
        </MenuItem>,
        <MenuItem key="profile" onClick={handleClose}>
            <Link href="/profile">Profile</Link>
        </MenuItem>,
        <Divider key="divider2" />,
        <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>,
    ];

    return (
        <header className="h-20 shadow-lg">
            <div className="container mx-auto grid grid-cols-3 items-center justify-evenly gap-6 h-full">
                {/* Logo */}
                <div>
                    <h1 className="font-bold text-2xl">Azushop</h1>
                </div>

                {/* Nav Links */}
                <div className="flex items-center justify-evenly gap-4 font-semibold">
                    {navLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={clsx(
                                "flex items-center justify-center gap-2 hover:text-[#01589A]",
                                pathname === link.href && "underline underline-offset-10 text-[#01589A]"
                            )}
                        >
                            {link.icon}
                            <h1>{link.label}</h1>
                        </Link>
                    ))}
                </div>

                {/* Right Side */}
                <div className="flex items-center justify-end gap-4 font-semibold">
                    {user ? (
                        <>
                            <div onClick={handleClick} className="flex items-center gap-2 cursor-pointer">
                                <Avatar sx={{ width: 32, height: 32 }}>{user.username[0]}</Avatar>
                                <span className="font-medium">{user.username}</span>
                            </div>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                slotProps={{
                                    paper: {
                                        elevation: 2,
                                        sx: { borderRadius: "12px" },
                                    },
                                }}
                            >
                                {user.isAdmin ? adminMenu : userMenu}
                            </Menu>
                        </>
                    ) : (
                        <div className='flex items-center justify-end gap-4 font-semibold'>
                            <div
                                className='flex items-center justify-center gap-2 cursor-pointer'
                                onClick={() => setOpenLogin(true)}
                            >
                                <FiLogIn />
                                <h1>Login</h1>
                            </div>
                            <div
                                className='flex items-center justify-center gap-2 cursor-pointer'
                                onClick={() => setOpenRegister(true)}
                            >
                                <FiUser />
                                <h1>Register</h1>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            <LoginModal open={openLogin} handleClose={() => setOpenLogin(false)} />
            <RegisterModal open={openRegister} handleClose={() => setOpenRegister(false)} />
        </header>
    );
};

export default Header;
