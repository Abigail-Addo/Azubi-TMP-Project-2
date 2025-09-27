"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getSingleProduct, getAllProducts } from "@/lib/features/products/productsSLice";
import DefaultLayout from "@/app/DefaultLayout";
import Image from "next/image";
import Link from "next/link";
import { TextField } from "@mui/material";
import { FaStar, FaRegStar } from "react-icons/fa";
import ReviewForm from "@/components/tabs/ReviewForm";
import RelatedProducts from "@/components/tabs/RelatedProducts";
import AllReviews from "@/components/tabs/AllReviews";
import { addToCart, getCart } from "@/lib/features/cart/cartSlice";
import { toast } from "react-toastify";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { products } = useAppSelector(
        (state) => state.products
    );

    const product = products.find((p) => p._id === id);

    useEffect(() => {

        if (!product && id) {
            dispatch(getSingleProduct(id as string));
            dispatch(getAllProducts())
        }
    }, [dispatch, id, product]);

    const [quantity, setQuantity] = React.useState(1);
    const [activeTab, setActiveTab] = React.useState("related");

    if (!product) return <p className="text-center py-10">Product not found</p>;

    const handleAddToCart = async () => {
        try {
            const result = await dispatch(
                addToCart({
                    productId: product._id,
                    quantity,
                })
            );

            if (addToCart.fulfilled.match(result)) {
                toast.success("Product added to cart");
                dispatch(getCart()); // refresh cart count in navbar
            } else {
                toast.error("Failed to add product to cart");
            }
        } catch (error) {
            toast.error((error as Error).message || "Unexpected error");
        }
    };


    return (
        <DefaultLayout>
            <div className="container mx-auto py-10">
                {/* Breadcrumb */}
                <div className="py-4 text-sm text-gray-600 flex gap-1">
                    <Link href="/" className="hover:underline">Home</Link>
                    <span>/</span>
                    <Link href="/shop" className="hover:underline">Shop</Link>
                    <span>/</span>
                    <span className="text-blue-600">{product.name}</span>
                </div>

                {/* Product Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10">
                    {/* Left - Product Image */}
                    <div className="flex justify-center">
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={500}
                            height={500}
                            className="object-contain"
                        />
                    </div>

                    {/* Right - Product Info */}
                    <div className="grid grid-cols-1">
                        <div className="flex items-center justify-between">
                            <p className="text-gray-600 mb-2">
                                Brand: <span className="font-semibold text-black">{product.brand}</span>
                            </p>
                            {/* Rating */}
                            <div className="flex items-center gap-2 text-sm mb-4">
                                <div className="flex text-yellow-500">
                                    <FaStar /><FaStar /><FaStar /><FaStar /><FaRegStar />
                                </div>
                                <span>(1 review)</span>
                            </div>
                        </div>

                        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                            {product.name}
                        </h1>

                        {/* specs */}
                        <p className="text-gray-700 mb-1">{product.description}</p>

                        {/* Price */}
                        <p className="text-2xl font-bold text-blue-600 mb-2">
                            ${product.price}
                        </p>

                        {/* Stock (optional) */}
                        <p className="text-green-600 mb-4">
                            {product.quantity > 0 ? "In stock" : "Out of stock"}
                        </p>

                        <hr className="text-[#D9D9D9]" />

                        {/* Quantity + Add to cart */}
                        <div className="flex items-center gap-4 mt-4">
                            <TextField
                                label="Qty"
                                type="number"
                                size="small"
                                className="w-24"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                                slotProps={{
                                    input: {
                                        inputProps: { min: 1 },
                                    },
                                }}
                            />

                            <button
                                className="bg-[#01589A] text-white w-full py-2 rounded cursor-pointer"
                                onClick={handleAddToCart}
                                disabled={product.quantity === 0}
                            >
                                {product.quantity > 0 ? "Add to cart" : "Out of Stock"}
                            </button>
                        </div>

                    </div>
                </div>

                {/* Tabs Section */}
                <div className="pt-10 w-full">
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

                    <div className="w-full">
                        {activeTab === "related" && <RelatedProducts currentCategory={product.category}
                            currentProductId={product._id} />}
                        {activeTab === "writeReview" && <ReviewForm productId={product._id} onReviewAdded={() => dispatch(getSingleProduct(product._id))} />}
                        {activeTab === "allReviews" && <AllReviews reviews={product.reviews} />}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default ProductDetails;


