"use client";

import React from "react";
import DefaultLayout from "../DefaultLayout";
import Image from "next/image";
import { FaShoppingCart, FaEye, FaHeart, FaTrash } from "react-icons/fa";
import Link from "next/link";
const Favourite = () => {
    const favourites = [
        {
            id: 1,
            name: "Apple MacBook Pro 2019 | 16\"",
            brand: "Apple",
            ram: "16.0 GB",
            storage: "512 GB",
            keyboard: "Eng (English)",
            price: 749.99,
            image: "/products/image9.png",
        },
    ];

    return (
        <DefaultLayout>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-[#01589A] to-[#009CDE] text-white h-96 flex items-center justify-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">Favourite</h2>
            </section>

            {/* Favourite Section */}
            <div className="container mx-auto py-10 px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favourites.map((item) => (
                        <div
                            key={item.id}
                            className="bg-[#F9FBFC] p-4 shadow-sm hover:shadow-md transition"
                        >
                            <div className="relative">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={300}
                                    height={200}
                                    className="rounded"
                                />
                                <span className="absolute top-2 right-2 bg-white text-xs px-2 py-1 rounded shadow">
                                    {item.brand}
                                </span>
                            </div>
                            <div className="mt-4">
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-gray-500 text-sm">
                                    RAM {item.ram} | Memory {item.storage} <br />
                                    Keyboard layout {item.keyboard}
                                </p>
                                <p className="text-[#009CDE] font-semibold mt-2">
                                    ${item.price.toFixed(2)}
                                </p>
                            </div>

                            {/* Action buttons */}
                            <div className="flex items-center gap-3 mt-4">
                                <button className="text-gray-600 hover:text-[#009CDE]">
                                    <FaShoppingCart size={18} />
                                </button>
                                <button className="text-gray-600 hover:text-[#009CDE]">
                                    <FaEye size={18} />
                                </button>
                                <button className="text-gray-600 hover:text-red-500">
                                    <FaHeart size={18} />
                                </button>
                                <button className="text-gray-600 hover:text-red-600">
                                    <FaTrash size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="h-28 border border-[#D9D9D9] bg-white">
                <div className="container mx-auto flex items-center justify-between h-full">
                    <Image src="/assets/footer.png" alt="Payments" width={200} height={200} />
                    <Link href="https://github.com/Abigail-Addo/Azubi-TMP-Project-2.git" target='_blank' className="underline text-cyan-600" >View code on github</Link>
                    <p>{new Date().getFullYear()} Azushop. All Rights Reserved.</p>
                </div>
            </footer>
        </DefaultLayout>
    );
};

export default Favourite;
