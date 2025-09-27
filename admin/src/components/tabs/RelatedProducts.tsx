"use client";

import React from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const relatedProducts = [
    {
        id: 1,
        brand: "Apple",
        name: "Apple MacBook Pro 2019 | 16\"",
        specs: "RAM 16.0 GB | Memory 512 GB | Keyboard layout Eng (English)",
        price: 749.99,
        image: "/products/image9.png",
    },
    {
        id: 2,
        brand: "Apple",
        name: "Apple MacBook Pro 2020 | 13.3\" | Touch Bar",
        specs: "RAM 16.0 GB | Memory 512 GB | Keyboard layout Eng (English)",
        price: 949.99,
        image: "/products/image3.png",
    },
    {
        id: 3,
        brand: "HP",
        name: "HP EliteBook 840 G5 | i5-8350U | 14\"",
        specs: "8 GB | 128 GB SSD | Backlit keyboard | Webcam | Win 11 Pro | Silver | SE",
        price: 349.99,
        image: "/products/image8.png",
    },
    {
        id: 4,
        brand: "HP",
        name: "HP EliteBook 840 G5 | i5-8350U | 14\"",
        specs: "8 GB | 128 GB SSD | Backlit keyboard | Webcam | Win 11 Pro | Silver | SE",
        price: 349.99,
        image: "/products/image8.png",
    },
    {
        id: 5,
        brand: "HP",
        name: "HP EliteBook 840 G5 | i5-8350U | 14\"",
        specs: "8 GB | 128 GB SSD | Backlit keyboard | Webcam | Win 11 Pro | Silver | SE",
        price: 349.99,
        image: "/products/image8.png",
    },
    {
        id: 6,
        brand: "Lenovo",
        name: "Lenovo Thinkpad T14 G1 | i7-10610U | 14\"",
        specs: "16 GB | 512 GB SSD | Backlit keyboard | FP | Win 11 Home | ND",
        price: 449.99,
        image: "/products/image2.png",
    },
    {
        id: 7,
        brand: "Lenovo",
        name: "Lenovo Thinkpad T14 G1 | i7-10610U | 14\"",
        specs: "16 GB | 512 GB SSD | Backlit keyboard | FP | Win 11 Home | ND",
        price: 449.99,
        image: "/products/image2.png",
    },
    {
        id: 8,
        brand: "Lenovo",
        name: "Lenovo Thinkpad T14 G1 | i7-10610U | 14\"",
        specs: "16 GB | 512 GB SSD | Backlit keyboard | FP | Win 11 Home | ND",
        price: 449.99,
        image: "/products/image2.png",
    },
];

const RelatedProducts = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
                <div key={product.id} className="flex">
                    <div className="bg-[#E6EFF5] hover:bg-[#D4EEF9] p-4 rounded shadow flex flex-col justify-between w-full">
                        <div>
                            <div className="text-right text-xs text-blue-500 mb-2">{product.brand}</div>
                            <Image
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-contain mb-2"
                                width={300}
                                height={300}
                            />
                            <h4 className="font-semibold mb-1 text-center">{product.name}</h4>
                            <p className="text-sm text-gray-500 mb-2 text-center">{product.specs}</p>
                        </div>

                        <div>
                            <p className="font-bold mb-2 text-blue-600 text-center">
                                ${product.price}
                            </p>
                            <div className="flex items-center justify-center gap-2 text-gray-600">
                                <button className="p-2 border rounded hover:bg-gray-100">
                                    <FaShoppingCart />
                                </button>
                                <button className="p-2 border rounded hover:bg-gray-100">
                                    <FaHeart />
                                </button>
                                <button className="p-2 border rounded hover:bg-gray-100">
                                    <FaEye />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default RelatedProducts;
