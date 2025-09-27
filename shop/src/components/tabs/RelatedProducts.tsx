"use client";

import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllProducts } from "@/lib/features/products/productsSLice";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface RelatedProductsProps {
    currentCategory: string;
    currentProductId: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
    currentCategory,
    currentProductId,
}) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { products, fetchAllLoading } = useAppSelector((state) => state.products);

    // Fetch products if none are loaded yet
    useEffect(() => {
        if (products.length === 0) {
            dispatch(getAllProducts());
        }
    }, [dispatch, products.length]);

    // Filter products that share the same category but exclude the current product
    const relatedProducts = useMemo(
        () =>
            products.filter(
                (p) => p.category === currentCategory && p._id !== currentProductId
            ),
        [products, currentCategory, currentProductId]
    );

    const handleAddToCart = async (productId: string) => {
        try {
            const result = await dispatch(addToCart({ productId, quantity: 1 }));
            if (addToCart.fulfilled.match(result)) {
                toast.success("Product added to cart");
            } else {
                toast.error("Failed to add product to cart");
            }
        } catch (error) {
            toast.error((error as Error).message || "Unexpected error");
        }
    };

    const handleViewProduct = (productId: string) => {
        router.push(`/shop/details/${productId}`);
    };

    if (fetchAllLoading)
        return <p className="text-center py-5">Loading related products...</p>;

    if (relatedProducts.length === 0)
        return (
            <p className="text-center text-gray-500 py-5">
                No related products found
            </p>
        );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
                <div key={product._id} className="flex">
                    <div className="bg-[#E6EFF5] hover:bg-[#D4EEF9] p-4 rounded shadow flex flex-col justify-between w-full">
                        <div>
                            <div className="text-right text-xs text-blue-500 mb-2">
                                {product.brand}
                            </div>
                            <Image
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-contain mb-2"
                                width={300}
                                height={300}
                            />
                            <h4 className="font-semibold mb-1 text-center">{product.name}</h4>
                            <p className="text-sm text-gray-500 mb-2 text-center">
                                {product.description}
                            </p>
                        </div>

                        <div>
                            <p className="font-bold mb-2 text-blue-600 text-center">
                                ${product.price}
                            </p>
                            <div className="flex items-center justify-center gap-2 text-gray-600">
                                <button
                                    className="p-2 border rounded hover:bg-gray-100"
                                    onClick={() => handleAddToCart(product._id)}
                                >
                                    <FaShoppingCart />
                                </button>
                                <button className="p-2 border rounded hover:bg-gray-100">
                                    <FaHeart />
                                </button>
                                <button
                                    className="p-2 border rounded hover:bg-gray-100"
                                    onClick={() => handleViewProduct(product._id)}
                                >
                                    <FaEye />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RelatedProducts;
