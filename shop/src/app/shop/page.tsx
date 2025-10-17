"use client";

import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";
import Image from "next/image";
import DefaultLayout from "../DefaultLayout";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FiChevronUp } from "react-icons/fi";
import { getAllProducts } from "@/lib/features/products/productsSLice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import Link from "next/link";

const Shop = () => {
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceFilter, setPriceFilter] = useState("");
    // const { addLoading } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    const { products, fetchAllLoading, error } = useAppSelector(
        (state) => state.products
    );
    const router = useRouter();
    // fetch products on mount
    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    // Apply filters
    const filteredProducts = products.filter((product) => {
        const brandMatch = selectedBrands.length
            ? selectedBrands.includes(product.brand)
            : true;
        const priceMatch = priceFilter
            ? product.price <= parseFloat(priceFilter)
            : true;

        return brandMatch && priceMatch;
    });

    const handleAddToCart = async (productId: string) => {
        try {
            const result = await dispatch(addToCart({ productId, quantity: 1 }));
            if (addToCart.fulfilled.match(result)) {
                toast.success('Product added to cart');
            } else {
                toast.error('Failed to add product to cart');
            }
        } catch (error) {
            toast.error((error as Error).message || 'Unexpected error');
        }
    };

    const handleViewProduct = (productId: string) => {
        router.push(`/shop/details/${productId}`);
    };

    return (
        <DefaultLayout>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-[#01589A] to-[#009CDE] text-white h-96 flex flex-col items-center justify-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">New Arrival</h2>
                <p>Shop through our latest selection of Products</p>
            </section>

            <div className="flex p-4 gap-6 container mx-auto py-10">
                {/* Sidebar Filters */}
                <aside className="w-1/4 space-y-2 hidden md:block">
                    {/* Product Categories */}
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<FiChevronUp />}>
                            <h3 className="font-semibold">Product Categories</h3>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul className="space-y-1 text-gray-700">
                                <li>Laptops</li>
                                <li>Phones</li>
                                <li>Cameras</li>
                                <li>Watches</li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>

                    {/* Brand */}
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<FiChevronUp />}>
                            <h3 className="font-semibold">Brand</h3>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormGroup>
                                {["Apple", "Samsung", "Lenovo", "Sony"].map((brand) => (
                                    <FormControlLabel
                                        key={brand}
                                        control={
                                            <Checkbox
                                                checked={selectedBrands.includes(brand)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedBrands([...selectedBrands, brand]);
                                                    } else {
                                                        setSelectedBrands(
                                                            selectedBrands.filter((b) => b !== brand)
                                                        );
                                                    }
                                                }}
                                            />
                                        }
                                        label={brand}
                                    />
                                ))}
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>

                    {/* Price */}
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<FiChevronUp />}>
                            <h3 className="font-semibold">Price</h3>
                        </AccordionSummary>
                        <AccordionDetails className="flex flex-col gap-2">
                            <TextField
                                type="number"
                                label="Enter price"
                                variant="outlined"
                                size="small"
                                fullWidth
                                margin="normal"
                                value={priceFilter}
                                onChange={(e) => setPriceFilter(e.target.value)}
                            />
                            <button
                                onClick={() => setPriceFilter("")}
                                className="bg-[#01589A] text-white w-full py-2 rounded"
                            >
                                Reset
                            </button>
                        </AccordionDetails>
                    </Accordion>
                </aside>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                    {fetchAllLoading && <p>Loading products...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {!fetchAllLoading &&
                        !error &&
                        filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                className="bg-[#E6EFF5] hover:bg-[#D4EEF9] p-4 rounded shadow"
                            >
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
                                <h4 className="font-semibold mb-1 text-center">
                                    {product.name}
                                </h4>
                                <p className="text-sm text-gray-500 mb-2 text-center">
                                    {product.description}
                                </p>
                                <p className="font-bold mb-2 text-blue-600 text-center">
                                    ${product.price}
                                </p>
                                <div className="flex items-center justify-center gap-2 text-gray-600">
                                    <button className="p-2 border rounded hover:bg-gray-100">
                                        <FaShoppingCart onClick={() => handleAddToCart(product._id)} />
                                    </button>
                                    <button className="p-2 border rounded hover:bg-gray-100">
                                        <FaHeart />
                                    </button>
                                    <button className="p-2 border rounded hover:bg-gray-100" onClick={() => handleViewProduct(product._id)}>
                                        <FaEye />
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="h-28 border border-[#D9D9D9] bg-white">
                <div className="container mx-auto flex items-center justify-between h-full">
                    <Image
                        src="/assets/footer.png"
                        alt="Payments"
                        width={200}
                        height={200}
                    />
                    <Link href="https://github.com/Abigail-Addo/Azubi-TMP-Project-2.git" target='_blank' className="underline text-cyan-600" >View code on github</Link>
                    <p>{new Date().getFullYear()} Azushop. All Rights Reserved.</p>
                </div>
            </footer>
        </DefaultLayout>
    );
};

export default Shop;
