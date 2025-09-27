"use client";

import React from "react";
import DefaultLayout from "../DefaultLayout";
import Image from "next/image";
import { TextField } from "@mui/material";

const Cart = () => {
    const [quantity, setQuantity] = React.useState(1);

    const price = 749.99;
    const total = (price * quantity).toFixed(2);

    return (
        <DefaultLayout>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-[#01589A] to-[#009CDE] text-white h-96 flex items-center justify-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">Cart</h2>
            </section>

            {/* Cart Section */}
            <div className="container mx-auto py-10 px-4">

                {/* Cart Table */}
                <div className="overflow-x-auto border rounded-lg">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-4">Product</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Quantity</th>
                                <th className="p-4">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t">
                                <td className="p-4 flex items-center gap-4">
                                    <Image
                                        src="/products/image9.png"
                                        alt="Apple MacBook Pro 2019"
                                        width={80}
                                        height={60}
                                        className="rounded"
                                    />
                                    <div>
                                        <p className="font-semibold">Apple MacBook Pro 2019 | 16&quot;</p>
                                        <p className="text-gray-500 text-sm">Brand: Apple</p>
                                        <button className="text-red-500 text-sm">Remove</button>
                                    </div>
                                </td>
                                <td className="p-4">${price.toFixed(2)}</td>
                                <td className="p-4">
                                    <TextField
                                        type="number"
                                        size="small"
                                        value={quantity}
                                        onChange={(e) =>
                                            setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                                        }
                                        inputProps={{ min: 1 }}
                                        sx={{ width: 80 }}
                                    />
                                </td>
                                <td className="p-4">${total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Summary Section */}
                <div className="mt-6">
                    <p className="font-semibold">Items: {quantity}</p>
                    <p className="font-semibold">Total: ${total}</p>
                </div>

                {/* Checkout Button */}
                <div className="mt-6">
                    <button className="bg-[#01589A] text-white py-2 px-4 rounded w-full md:w-auto">
                        Proceed to checkout
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className='h-28 border border-[#D9D9D9] bg-white'>
                <div className='container mx-auto flex items-center justify-between h-full'>
                    <Image src="/assets/footer.png" alt="Payments" width={200} height={200} />
                    <p>{new Date().getFullYear()} Azushop. All Rights Reserved.</p>
                </div>
            </footer>
        </DefaultLayout>
    );
};

export default Cart;
