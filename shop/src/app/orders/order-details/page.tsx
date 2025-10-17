"use client";

import React, { Suspense, useEffect } from "react";
import Image from "next/image";
import { FiChevronLeft } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import DefaultLayout from "@/app/DefaultLayout";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchOrders } from "@/lib/features/orders/orderSlice";
import { getProfile } from "@/lib/features/auth/authSlice";
import Link from "next/link";
// 🔹 Extracted logic into a content component
const OrderDetailsContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get("id") || "";

    const dispatch = useAppDispatch();
    const { order } = useAppSelector((state) => state.order);
    const { userAuth } = useAppSelector((state) => state.userAuth);

    const currentUser = userAuth || null;

    // Fetch order by ID
    useEffect(() => {
        if (orderId) {
            dispatch(fetchOrders({ id: orderId }));
        }
    }, [dispatch, orderId]);

    // Fetch user profile
    useEffect(() => {
        if (!currentUser) {
            dispatch(getProfile());
        }
    }, [dispatch, currentUser]);

    if (!order) return <p className="text-center mt-10">Order not found.</p>;

    return (
        <div className="container mx-auto py-10 bg-[#F9FBFC] h-full my-10 px-6">
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
                            {order.orderItems.map((item) => (
                                <tr key={item.product}>
                                    <td className="p-2 text-start">
                                        <Image
                                            src={item.image || "/products/image9.png"}
                                            alt={item.name}
                                            width={50}
                                            height={50}
                                        />
                                    </td>
                                    <td className="p-2 text-start">{item.name}</td>
                                    <td className="p-2 text-start">{item.qty}</td>
                                    <td className="p-2 text-start">${item.price.toFixed(2)}</td>
                                    <td className="p-2 text-start">
                                        ${(item.qty * item.price).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Shipping & Summary */}
                <div className="rounded-lg p-4 border border-[#D9D9D9] flex flex-col gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold mb-2 text-[#003087]">Shipping</h3>

                        <p>
                            <span className="text-[#003087]">Order ID:</span> {order._id}
                        </p>
                        <p>
                            <span className="text-[#003087]">Name:</span>{" "}
                            {currentUser?.username || "N/A"}
                        </p>
                        <p>
                            <span className="text-[#003087]">Email:</span>{" "}
                            {currentUser?.email || "N/A"}
                        </p>
                        <p>
                            <span className="text-[#003087]">Address:</span>{" "}
                            {`${order.shippingAddress?.address}, ${order.shippingAddress?.city}, ${order.shippingAddress?.postalCode}, ${order.shippingAddress?.country}`}
                        </p>
                        <p>
                            <span className="text-[#003087]">Payment Method:</span>{" "}
                            {order.paymentMethod}
                        </p>
                    </div>

                    <hr className="text-[#D9D9D9]" />

                    <div className="space-y-2">
                        <h3 className="font-semibold mb-2 text-[#003087]">Order Summary</h3>
                        <p>
                            <span className="text-[#003087]">Items:</span> $
                            {order.itemsPrice.toFixed(2)}
                        </p>
                        <p>
                            <span className="text-[#003087]">Shipping:</span> $
                            {order.shippingPrice.toFixed(2)}
                        </p>
                        <p>
                            <span className="text-[#003087]">Tax:</span> $
                            {order.taxPrice.toFixed(2)}
                        </p>
                        <p className="font-bold">
                            <span className="text-[#003087]">Total:</span> $
                            {order.totalPrice.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 🔹 Wrapped in Suspense
const OrderDetails = () => {
    return (
        <DefaultLayout>
            <Suspense fallback={<p className="text-center mt-10">Loading order details...</p>}>
                <OrderDetailsContent />
            </Suspense>

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

export default OrderDetails;
