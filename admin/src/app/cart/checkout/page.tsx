"use client";

import React from "react";
import DefaultLayout from "@/app/DefaultLayout";
import Image from "next/image";
import Link from "next/link";
import { TextField, Button, Radio, RadioGroup, FormControlLabel } from "@mui/material";

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = React.useState("paypal");

    const product = {
        name: "Apple MacBook Pro 2019 | 16\"",
        brand: "Apple",
        price: 749.99,
        image: "/products/image9.png",
    };

    const shipping = 0.0;
    const tax = 10.0;
    const total = product.price + shipping + tax;

    return (
        <DefaultLayout>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-[#01589A] to-[#009CDE] text-white h-96 flex items-center justify-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">Checkout</h2>
            </section>

            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4 text-sm text-gray-600 flex gap-1">
                <Link href="/" className="hover:underline">
                    Home
                </Link>
                <span>/</span>
                <Link href="/cart" className="hover:underline">
                    Cart
                </Link>
                <span>/</span>
                <span className="text-blue-600">Checkout</span>
            </div>

            {/* Checkout Section */}
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 py-10 px-4">
                {/* Billing Details */}
                <div className="bg-[#F9FBFC] rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Billing Details</h3>
                    <form className="flex flex-col gap-4">
                        <div>
                            <TextField
                                id="address"
                                label="Address"
                                variant="outlined"
                                className="w-full"
                                autoComplete="off"
                                required
                                type="text"
                                size='medium'
                                sx={{
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: "#01589A",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "#E6EFF5",
                                        "&:hover fieldset": {
                                            borderColor: "#01589A",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#01589A",
                                        },
                                    },
                                    "& .MuiOutlinedInput-input": {
                                        backgroundColor: "#E6EFF5",
                                    },
                                }}
                            />
                        </div>
                        <div>
                            <TextField
                                id="city"
                                label="City"
                                variant="outlined"
                                className="w-full"
                                autoComplete="off"
                                required
                                type="text"
                                size='medium'
                                sx={{
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: "#01589A",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "#E6EFF5",
                                        "&:hover fieldset": {
                                            borderColor: "#01589A",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#01589A",
                                        },
                                    },
                                    "& .MuiOutlinedInput-input": {
                                        backgroundColor: "#E6EFF5",
                                    },
                                }}
                            />
                        </div>
                        <div>
                            <TextField
                                id="postal-code"
                                label="Postal Code"
                                variant="outlined"
                                className="w-full"
                                autoComplete="off"
                                required
                                type="text"
                                size='medium'
                                sx={{
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: "#01589A",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "#E6EFF5",
                                        "&:hover fieldset": {
                                            borderColor: "#01589A",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#01589A",
                                        },
                                    },
                                    "& .MuiOutlinedInput-input": {
                                        backgroundColor: "#E6EFF5",
                                    },
                                }}
                            />
                        </div>
                        <div>
                            <TextField
                                id="country"
                                label="Country"
                                variant="outlined"
                                className="w-full"
                                autoComplete="off"
                                required
                                type="text"
                                size='medium'
                                sx={{
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: "#01589A",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "#E6EFF5",
                                        "&:hover fieldset": {
                                            borderColor: "#01589A",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#01589A",
                                        },
                                    },
                                    "& .MuiOutlinedInput-input": {
                                        backgroundColor: "#E6EFF5",
                                    },
                                }}
                            />
                        </div>
                    </form>
                </div>

                {/* Product Summary */}
                <div className="bg-[#F9FBFC] rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Products</h3>

                    {/* Product Card*/}
                    {/* Product Card */}
                    <div className="flex items-center gap-4 border-b pb-4 mb-4 relative">
                        <div className="relative">
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={80}
                                height={60}
                                className="rounded"
                            />
                            {/* Quantity badge */}
                            <span className="absolute -top-2 -right-2 bg-white text-[#01589A] text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                                1
                            </span>
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold">{product.name}</p>
                            <p className="text-gray-500 text-sm">Brand: {product.brand}</p>
                        </div>
                        <p className="font-semibold">${product.price.toFixed(2)}</p>
                    </div>


                    {/* Shipping + Tax */}
                    <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                            <span>Shipping fees</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between font-semibold text-lg mt-4 border-t pt-4">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    {/* Payment Method */}
                    <div className="mt-6">
                        <h4 className="font-semibold mb-2">Select Method</h4>
                        <RadioGroup
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <FormControlLabel
                                value="paypal"
                                control={<Radio />}
                                label="Paypal or credit card"
                            />
                            <FormControlLabel
                                value="cod"
                                control={<Radio />}
                                label="Cash on delivery"
                            />
                        </RadioGroup>
                    </div>

                    {/* Place Order Button */}
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#01589A", marginTop: "1rem" }}
                        fullWidth
                    >
                        Place order
                    </Button>
                </div>
            </div>

            {/* Footer */}
            <footer className="h-28 border-t border-[#D9D9D9] bg-white">
                <div className="container mx-auto flex items-center justify-between h-full px-4">
                    <Image src="/assets/footer.png" alt="Payments" width={200} height={200} />
                    <p>{new Date().getFullYear()} Azushop. All Rights Reserved.</p>
                </div>
            </footer>
        </DefaultLayout>
    );
};

export default Checkout;
