"use client";

import React from "react";
import DefaultLayout from "@/app/DefaultLayout";
import Image from "next/image";
import Link from "next/link";
import { TextField, Button, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { createOrder } from "@/lib/features/orders/orderSlice";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { clearCart, getCart } from "@/lib/features/cart/cartSlice";

interface IFormInput {
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

const Checkout = () => {
    const { cart } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const items = cart?.items || [];
    const itemsPrice = cart?.totalPrice || 0;

    // ✅ Tax & Total calculation
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxRate = 0.15;
    const taxPrice = parseFloat((itemsPrice * taxRate).toFixed(2));
    const totalPrice = parseFloat((itemsPrice + shippingPrice + taxPrice).toFixed(2));

    const [paymentMethod, setPaymentMethod] = React.useState("paypal");

    const { control, handleSubmit } = useForm<IFormInput>({
        defaultValues: {
            address: "",
            city: "",
            postalCode: "",
            country: "",
        },
    });

    React.useEffect(() => {
        dispatch(getCart()); // fetch cart from backend on every page load
    }, [dispatch]);

    const onSubmit = async (data: IFormInput) => {
        if (items.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }

        try {
            const payload = {
                orderItems: items.map((item) => ({
                    product: item.product,
                    name: item.name,
                    price: item.price,
                    qty: item.quantity,
                    image: item.image,
                })),
                shippingAddress: {
                    address: data.address,
                    city: data.city,
                    postalCode: data.postalCode,
                    country: data.country,
                },
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
            };

            const result = await dispatch(createOrder(payload));

            if (createOrder.fulfilled.match(result)) {
                toast.success("Order placed successfully!");

                // ✅ Clear cart from Redux
                dispatch(clearCart());

                // Redirect based on payment method
                if (paymentMethod === "Cash on delivery") {
                    router.push("/orders");
                } else {
                    router.push("/payments");
                }
            } else {
                toast.error(result.payload as string);
            }
        } catch (err) {
            toast.error(err as string);
        }
    };

    return (
        <DefaultLayout>
            {/* Header Section */}
            <section className="bg-gradient-to-r from-[#01589A] to-[#009CDE] text-white h-96 flex items-center justify-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">Checkout</h2>
            </section>

            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4 text-sm text-gray-600 flex gap-1">
                <Link href="/" className="hover:underline">Home</Link>
                <span>/</span>
                <Link href="/cart" className="hover:underline">Cart</Link>
                <span>/</span>
                <span className="text-blue-600">Checkout</span>
            </div>

            {/* Main Grid */}
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 py-10 px-4">
                {/* Billing Details */}
                <div className="bg-[#F9FBFC] rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Billing Details</h3>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                        {/* Address */}
                        <Controller
                            name="address"
                            control={control}
                            rules={{ required: "Address is required" }}
                            render={({ field }) => (
                                <TextField {...field} label="Address" variant="outlined" fullWidth required size="medium"
                                    sx={{
                                        "& .MuiInputLabel-root.Mui-focused": { color: "#01589A" },
                                        "& .MuiOutlinedInput-root": {
                                            backgroundColor: "#E6EFF5",
                                            "&:hover fieldset": { borderColor: "#01589A" },
                                            "&.Mui-focused fieldset": { borderColor: "#01589A" },
                                        },
                                    }}
                                />
                            )}
                        />
                        {/* City */}
                        <Controller
                            name="city"
                            control={control}
                            rules={{ required: "City is required" }}
                            render={({ field }) => (
                                <TextField {...field} label="City" variant="outlined" fullWidth required size="medium"
                                    sx={{
                                        "& .MuiInputLabel-root.Mui-focused": { color: "#01589A" },
                                        "& .MuiOutlinedInput-root": {
                                            backgroundColor: "#E6EFF5",
                                            "&:hover fieldset": { borderColor: "#01589A" },
                                            "&.Mui-focused fieldset": { borderColor: "#01589A" },
                                        },
                                    }}
                                />
                            )}
                        />
                        {/* Postal Code */}
                        <Controller
                            name="postalCode"
                            control={control}
                            rules={{ required: "Postal Code is required" }}
                            render={({ field }) => (
                                <TextField {...field} label="Postal Code" variant="outlined" fullWidth required size="medium"
                                    sx={{
                                        "& .MuiInputLabel-root.Mui-focused": { color: "#01589A" },
                                        "& .MuiOutlinedInput-root": {
                                            backgroundColor: "#E6EFF5",
                                            "&:hover fieldset": { borderColor: "#01589A" },
                                            "&.Mui-focused fieldset": { borderColor: "#01589A" },
                                        },
                                    }}
                                />
                            )}
                        />
                        {/* Country */}
                        <Controller
                            name="country"
                            control={control}
                            rules={{ required: "Country is required" }}
                            render={({ field }) => (
                                <TextField {...field} label="Country" variant="outlined" fullWidth required size="medium"
                                    sx={{
                                        "& .MuiInputLabel-root.Mui-focused": { color: "#01589A" },
                                        "& .MuiOutlinedInput-root": {
                                            backgroundColor: "#E6EFF5",
                                            "&:hover fieldset": { borderColor: "#01589A" },
                                            "&.Mui-focused fieldset": { borderColor: "#01589A" },
                                        },
                                    }}
                                />
                            )}
                        />

                        {/* Payment Method */}
                        <div className="mt-4">
                            <h4 className="font-semibold mb-2">Select Method</h4>
                            <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                <FormControlLabel value="Paypal / Credit Card / MoMo" control={<Radio />} label="Paypal / Credit Card / MoMo" />
                                <FormControlLabel value="Cash on delivery" control={<Radio />} label="Cash on delivery" />
                            </RadioGroup>
                        </div>

                        <Button type="submit" variant="contained" sx={{ backgroundColor: "#01589A", marginTop: "1rem" }} fullWidth>
                            Place Order
                        </Button>
                    </form>
                </div>

                {/* Product Summary */}
                <div className="bg-[#F9FBFC] rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Products</h3>
                    {items.map((item) => (
                        <div key={item.product} className="flex items-center gap-4 border-b pb-4 mb-4 relative">
                            <div className="relative">
                                <Image src={item.image} alt={item.name} width={80} height={60} className="rounded" />
                                <span className="absolute -top-2 -right-2 bg-white text-[#01589A] text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                                    {item.quantity}
                                </span>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-gray-500 text-sm">Brand: {item.brand}</p>
                            </div>
                            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}

                    <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                            <span>Shipping fees</span>
                            <span>${shippingPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax (15%)</span>
                            <span>${taxPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex justify-between font-semibold text-lg mt-4 border-t pt-4">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>

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
