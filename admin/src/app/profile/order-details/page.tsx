"use client";

import React from "react";
import Image from "next/image";
import { FiChevronLeft } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import DefaultLayout from "@/app/DefaultLayout";


const OrderDetails = () => {
    const router = useRouter();

    const searchParams = useSearchParams();
    const orderId = searchParams.get("id") || "";

    return (
        <DefaultLayout>

            <div className="container mx-auto py-10 bg-[#F9FBFC] h-full my-10 px-6">
                {/* Go back button */}
                <div
                    className="flex items-center justify-start gap-2 text-blue-600 underline cursor-pointer mb-6"
                    onClick={() => router.back()}
                >
                    <FiChevronLeft /> Go back
                </div>

                <h2 className="text-xl font-semibold mb-4">Order Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Order Items */}
                    <div className="col-span-2">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-[#E6EFF5]">
                                    <th className="p-2 text-start">Image</th>
                                    <th className="p-2 text-start">Product</th>
                                    <th className="p-2 text-start">Quantity</th>
                                    <th className="p-2 text-start">Unit Price</th>
                                    <th className="p-2 text-start">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-2 text-start">
                                        <Image src="/products/image9.png" alt="Macbook" width={50} height={50} />
                                    </td>
                                    <td className="p-2 text-start">Apple MacBook Pro 2019 | 16”</td>
                                    <td className="p-2 text-start">1</td>
                                    <td className="p-2 text-start">$1250.00</td>
                                    <td className="p-2 text-start">$1250.00</td>
                                </tr>
                                <tr>
                                    <td className="p-2 text-start">
                                        <Image src="/products/image4.png" alt="iPhone" width={50} height={50} />
                                    </td>
                                    <td className="p-2 text-start">iPhone 15</td>
                                    <td className="p-2 text-start">1</td>
                                    <td className="p-2 text-start">$400.00</td>
                                    <td className="p-2 text-start">$400.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Shipping & Summary */}
                    <div className="rounded-lg p-4 border border-[#D9D9D9] flex flex-col gap-6">
                        <div>
                            <h3 className="font-semibold mb-2 text-[#003087]">Shipping</h3>
                            <p><span className="text-[#003087]">Order:</span> {orderId}</p>
                            <p><span className="text-[#003087]">Name:</span> John Doe</p>
                            <p><span className="text-[#003087]">Email:</span> johndoe@gmail.com</p>
                            <p><span className="text-[#003087]">Order #:</span> AK-1129-2289, GH</p>
                            <p><span className="text-[#003087]">Method:</span> PayStack</p>
                        </div>

                        <hr className="text-[#D9D9D9]" />

                        <div>
                            <h3 className="font-semibold mb-2 text-[#003087]">Order Summary</h3>
                            <p><span className="text-[#003087]">Items:</span> $5000.00</p>
                            <p><span className="text-[#003087]">Shipping:</span> $0</p>
                            <p><span className="text-[#003087]">Tax:</span> $20</p>
                            <p className="font-bold"><span className="text-[#003087]">Total:</span> $5200.00</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="h-28 border border-[#D9D9D9] bg-white">
                <div className="container mx-auto flex items-center justify-between h-full">
                    <Image src="/assets/footer.png" alt="Payments" width={200} height={200} />
                    <p>{new Date().getFullYear()} Azushop. All Rights Reserved.</p>
                </div>
            </footer>
        </DefaultLayout >
    );
};

export default OrderDetails;
