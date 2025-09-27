"use client";

import React from "react";
import DefaultLayout from "@/app/DefaultLayout";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaRegStar } from "react-icons/fa";
import { TextField } from "@mui/material";
import ReviewForm from "@/components/tabs/ReviewForm";
import RelatedProducts from "@/components/tabs/RelatedProducts";
import AllReviews from "@/components/tabs/AllReviews";

const Details = () => {
    const [quantity, setQuantity] = React.useState(1);
    const [activeTab, setActiveTab] = React.useState("related");

    return (
        <DefaultLayout>
            <div className="container mx-auto py-10">

                {/* Breadcrumb */}
                <div className="py-4 text-sm text-gray-600 flex gap-1">
                    <Link href="/" className="hover:underline">Home</Link>
                    <span>/</span>
                    <Link href="/shop" className="hover:underline">Shop</Link>
                    <span>/</span>
                    <span className="text-blue-600">Apple MacBook Pro 2019 | 16</span>
                </div>

                {/* Product Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10">
                    {/* Left - Product Image */}
                    <div className="flex justify-center">
                        <Image
                            src="/products/image9.png"
                            alt="Apple MacBook Pro"
                            width={500}
                            height={500}
                            className="object-contain"
                        />
                    </div>

                    {/* Right - Product Info */}
                    <div className="grid grid-cols-1">
                        <p className="text-gray-600 mb-2">
                            Brand: <span className="font-semibold text-black">Apple</span>
                        </p>

                        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                            Apple MacBook Pro 2019 | 16
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 text-sm mb-4">
                            <div className="flex text-yellow-500">
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaRegStar />
                            </div>
                            <span>(1 review)</span>
                        </div>

                        {/* Specs */}
                        <p className="text-gray-700 mb-1">RAM 16.0 GB | Memory 512 GB</p>
                        <p className="text-gray-700 mb-1">Keyboard layout Eng (English)</p>

                        {/* Price */}
                        <p className="text-2xl font-bold text-blue-600 mt-4 mb-2">$749.99</p>

                        {/* Stock */}
                        <p className="text-green-600 mb-4">In stock</p>

                        <hr className="text-[#D9D9D9]" />

                        {/* Quantity + Add to cart */}
                        <div className="flex items-center gap-4">
                            <TextField
                                label="Qty"
                                type="number"
                                size="small"
                                className="w-24"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                inputProps={{ min: 1 }}
                            />
                            <button className="bg-[#01589A] text-white w-full py-2 rounded">
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="pt-10 w-full">
                    {/* Tab Header */}
                    <div className="flex gap-8 pb-2 mb-6 lg:w-2/4 mx-auto justify-center">
                        <button
                            className={activeTab === "related" ? "font-bold border-b-2" : ""}
                            onClick={() => setActiveTab("related")}
                        >
                            Related Product
                        </button>
                        <button
                            className={activeTab === "writeReview" ? "font-bold border-b-2" : ""}
                            onClick={() => setActiveTab("writeReview")}
                        >
                            Write your Review
                        </button>
                        <button
                            className={activeTab === "allReviews" ? "font-bold border-b-2" : ""}
                            onClick={() => setActiveTab("allReviews")}
                        >
                            All Reviews
                        </button>
                    </div>

                    {/* Tab Content (always full width) */}
                    <div className="w-full">
                        {activeTab === "related" && <RelatedProducts />}
                        {activeTab === "writeReview" && <ReviewForm />}
                        {activeTab === "allReviews" && <AllReviews />}
                    </div>
                </div>

            </div>

            {/* Footer */}
            <footer className="h-28 border border-[#D9D9D9] bg-white">
                <div className="container mx-auto flex items-center justify-between h-full">
                    <Image
                        src="/assets/footer.png"
                        alt="Payments"
                        width={200}
                        height={200}
                    />
                    <p>{new Date().getFullYear()} Azushop. All Rights Reserved.</p>
                </div>
            </footer>
        </DefaultLayout>
    );
};

export default Details;
