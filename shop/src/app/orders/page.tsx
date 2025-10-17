"use client";

import React, { useEffect } from "react";
import DefaultLayout from "../DefaultLayout";
import Image from "next/image";
import { FiChevronLeft, FiEye } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchOrders } from "@/lib/features/orders/orderSlice";
import Link from "next/link";
const Order = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { orders, fetchLoading, error } = useAppSelector((state) => state.order);

    useEffect(() => {
        dispatch(fetchOrders({ all: false }));
    }, [dispatch]);

    const handleViewOrder = (orderId: string) => {
        router.push(`/orders/order-details?id=${orderId}`);
    };

    return (
        <DefaultLayout>
            <div className="container mx-auto py-10">
                <div
                    className="flex items-center justify-start gap-2 text-blue-600 underline cursor-pointer mb-6"
                    onClick={() => router.back()}
                >
                    <FiChevronLeft /> Go back
                </div>

                <div className="p-6 bg-white shadow rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">My Orders</h2>

                    {fetchLoading && <p>Loading orders...</p>}
                    {error && <p className="text-red-500">{error}</p>}

                    {!fetchLoading && orders.length === 0 && <p>No orders found.</p>}

                    {orders.length > 0 && (
                        <table className="w-full border-collapse border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
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
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td className="p-2">
                                            <Image
                                                src={order.orderItems[0]?.image || "/products/image9.png"}
                                                alt={order.orderItems[0]?.name || "Product"}
                                                width={50}
                                                height={50}
                                            />
                                        </td>
                                        <td className="p-2">{order._id}</td>
                                        <td className="p-2">{new Date(order.createdAt || "").toLocaleDateString()}</td>
                                        <td className="p-2">${order.totalPrice.toFixed(2)}</td>
                                        <td className="p-2">
                                            {order.isPaid ? (
                                                <span className="px-2 py-1 bg-[#77C053] text-white rounded">Completed</span>
                                            ) : (
                                                <span className="px-2 py-1 bg-[#F7E9EA] text-black rounded">Pending</span>
                                            )}
                                        </td>
                                        <td className="p-2">
                                            {order.isDelivered ? (
                                                <span className="px-2 py-1 bg-[#77C053] text-white rounded">Delivered</span>
                                            ) : (
                                                <span className="px-2 py-1 bg-[#F7E9EA] text-black rounded">Pending</span>
                                            )}
                                        </td>
                                        <td className="p-2">
                                            <div
                                                className="bg-blue-600 text-white p-2 rounded w-fit cursor-pointer"
                                                onClick={() => handleViewOrder(order._id)}
                                            >
                                                <FiEye size={18} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <footer className="h-28 border border-[#D9D9D9] mt-10 fixed bottom-0 w-full">
                <div className="container mx-auto flex items-center justify-between h-full">
                    <Image src="/assets/footer.png" alt="Payments" width={200} height={200} />
                    <Link href="https://github.com/Abigail-Addo/Azubi-TMP-Project-2.git" target='_blank' className="underline text-cyan-600" >View code on github</Link>
                    <p>{new Date().getFullYear()} Azushop. All Rights Reserved.</p>
                </div>
            </footer>
        </DefaultLayout>
    );
};

export default Order;
