"use client";

import React from "react";
import DefaultLayout from "../DefaultLayout";
import Image from "next/image";
import { TextField } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
    getCart,
    updateCartQuantity,
    removeFromCart,
} from "@/lib/features/cart/cartSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Cart = () => {
    const dispatch = useAppDispatch();
    const { cart } = useAppSelector((state) => state.cart);
    const router = useRouter();

    const items = cart?.items || [];
    const totalItems = cart?.totalItems || 0;
    const totalPrice = cart?.totalPrice || 0;

    React.useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    const handleQuantityChange = async (productId: string, value: number) => {
        try {
            const result = await dispatch(
                updateCartQuantity({ productId, quantity: Math.max(1, value) })
            );
            if (updateCartQuantity.fulfilled.match(result)) {
                toast.success("Cart updated");
            } else {
                toast.error("Failed to update cart");
            }
        } catch (error) {
            toast.error((error as Error).message || "Unexpected error");
        }
    };

    const handleRemove = async (productId: string) => {
        try {
            const result = await dispatch(removeFromCart({ productId }));
            if (removeFromCart.fulfilled.match(result)) {
                toast.success("Item removed from cart");
            } else {
                toast.error("Failed to remove item from cart");
            }
        } catch (error) {
            toast.error((error as Error).message || "Unexpected error");
        }
    };


    return (
        <DefaultLayout>
            <section className="bg-gradient-to-r from-[#01589A] to-[#009CDE] text-white h-96 flex items-center justify-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">Cart</h2>
            </section>

            <div className="container mx-auto py-10 px-4">
                {items.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                ) : (
                    <>
                        <div className="overflow-x-auto border rounded-lg">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-4">Product</th>
                                        <th className="p-4">Price</th>
                                        <th className="p-4">Quantity</th>
                                        <th className="p-4">Total</th>
                                        <th className="p-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item.product} className="border-t">
                                            <td className="p-4 flex items-center gap-4">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={80}
                                                    height={60}
                                                    className="rounded"
                                                />
                                                <div>
                                                    <p className="font-semibold">{item.name}</p>
                                                    <p className="text-gray-500 text-sm">
                                                        Brand: {item.brand}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="p-4">${item.price.toFixed(2)}</td>
                                            <td className="p-4 flex items-center gap-2">
                                                <button
                                                    className="bg-gray-200 hover:bg-gray-300 px-2 rounded"
                                                    onClick={() =>
                                                        handleQuantityChange(item.product, item.quantity - 1)
                                                    }
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <TextField
                                                    type="number"
                                                    size="small"
                                                    value={item.quantity}
                                                    slotProps={{ input: { readOnly: true } }}
                                                    sx={{ width: 60, textAlign: "center" }}
                                                />
                                                <button
                                                    className="bg-gray-200 hover:bg-gray-300 px-2 rounded"
                                                    onClick={() =>
                                                        handleQuantityChange(item.product, item.quantity + 1)
                                                    }
                                                >
                                                    +
                                                </button>
                                            </td>
                                            <td className="p-4">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </td>
                                            <td className="p-4">
                                                <button
                                                    className="text-red-500 text-sm"
                                                    onClick={() => handleRemove(item.product)}
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6">
                            <p className="font-semibold">Items: {totalItems}</p>
                            <p className="font-semibold">Total: ${totalPrice.toFixed(2)}</p>
                        </div>

                        <div className="mt-6">
                            <button
                                className="bg-[#01589A] text-white py-2 px-4 rounded w-full md:w-auto"
                                onClick={() => {
                                    if (!cart || cart.items.length === 0) {
                                        toast.error("Your cart is empty");
                                        return;
                                    }
                                    router.push("/cart/checkout");
                                }}
                            >
                                Proceed to checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </DefaultLayout>
    );
};

export default Cart;
