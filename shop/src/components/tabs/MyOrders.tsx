"use client";

import React from "react";
import Image from "next/image";
import { FiEye } from "react-icons/fi";
import { useRouter } from "next/navigation";

const MyOrdersTab = () => {
    const router = useRouter();

    const handleViewOrder = (orderId: string) => {
        router.push(`/orders/order-details?id=${orderId}`);
    };

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-4">My Orders</h2>
            <table className="w-full border-collapse border-gray-200">
                <thead className="">
                    <tr className="bg-gray-100 ">
                        <th className="p-2 text-start">Image</th>
                        <th className="p-2 text-start">Id</th>
                        <th className="p-2 text-start">Date</th>
                        <th className="p-2 text-start">Total</th>
                        <th className="p-2 text-start">Paid</th>
                        <th className="p-2 text-start">Delivered</th>
                        <th className="p-2 text-start">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-2">
                            <Image
                                src="/products/image9.png"
                                alt="Macbook"
                                width={50}
                                height={50}
                            />
                        </td>
                        <td className="p-2">6537b4b8fb1be49cc3f658</td>
                        <td className="p-2">2025-03-01</td>
                        <td className="p-2">$1250.00</td>
                        <td className="p-2">
                            <span className="px-2 py-1 bg-[#77C053] text-white rounded">
                                Completed
                            </span>
                        </td>
                        <td className="p-2">
                            <span className="px-2 py-1 bg-[#F7E9EA] text-black rounded">
                                Pending
                            </span>
                        </td>
                        <td className="p-2">
                            <div className="bg-blue-600 text-white p-2 rounded w-fit cursor-pointer" onClick={() =>
                                handleViewOrder("6537b4b8fb1be49cc3f658")
                            }>
                                <FiEye size={18} />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MyOrdersTab;
