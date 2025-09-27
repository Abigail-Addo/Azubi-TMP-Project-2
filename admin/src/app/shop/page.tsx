"use client"

import React from "react";
import { FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";
import Image from "next/image";
import DefaultLayout from "../DefaultLayout";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { FiChevronUp } from "react-icons/fi";

const products = [
    {
        id: 1,
        brand: "Apple",
        name: "Apple MacBook Pro 2019 | 16\"",
        specs: "RAM 16.0 GB | Memory 512 GB | Keyboard layout Eng (English)",
        price: 749.99,
        image: "/products/image9.png",
    },
    {
        id: 2,
        brand: "Apple",
        name: "Apple MacBook Pro 2020 | 13.3\" | Touch Bar",
        specs: "RAM 16.0 GB | Memory 512 GB | Keyboard layout Eng (English)",
        price: 949.99,
        image: "/products/image3.png",
    },
    {
        id: 3,
        brand: "HP",
        name: "HP EliteBook 840 G5 | i5-8350U | 14\"",
        specs: "8 GB | 128 GB SSD | Backlit keyboard | Webcam | Win 11 Pro | Silver | SE",
        price: 349.99,
        image: "/products/image8.png",
    },
    {
        id: 4,
        brand: "Apple",
        name: "iPhone 15",
        specs: "128 GB | Dual SIM | Blue | Unlocked",
        price: 449.99,
        image: "/products/image4.png",
    },
    {
        id: 5,
        brand: "Samsung",
        name: "Samsung Galaxy S22 Ultra 5G",
        specs: "8GB | 128 GB | Dual-SIM | Phantom Black",
        price: 449.99,
        image: "/products/image5.png",
    },
    {
        id: 6,
        brand: "Lenovo",
        name: "Lenovo Thinkpad T14 G1 | i7-10610U | 14\"",
        specs: "16 GB | 512 GB SSD | Backlit keyboard | FP | Win 11 Home | ND",
        price: 449.99,
        image: "/products/image2.png",
    },
    {
        id: 7,
        brand: "Sony",
        name: "Sony Alpha 7 III with 28-70mm zoom lens, 24.2MP* 35mm",
        specs: "Full-frame Exmor R CMOS sensor with 24.2 MP for BIONZ",
        price: 449.99,
        image: "/products/image1.png",
    },
    {
        id: 8,
        brand: "Samsung",
        name: "Samsung Galaxy S22 Ultra 5G",
        specs: "8GB | 128 GB | Dual-SIM | Phantom Black",
        price: 449.99,
        image: "/products/image5.png",
    },
    {
        id: 9,
        brand: "Apple",
        name: "iPad 9 (2021) | 10.2\"",
        specs: "64GB | Silver",
        price: 449.99,
        image: "/products/image7.png",
    },
];

const Shop = () => {
    const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
    const [priceFilter, setPriceFilter] = React.useState("");

    // Update filteredProducts
    const filteredProducts = products.filter((product) => {
        const brandMatch = selectedBrands.length
            ? selectedBrands.includes(product.brand)
            : true;
        const priceMatch = priceFilter
            ? product.price <= parseFloat(priceFilter)
            : true;

        return brandMatch && priceMatch;
    });




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
                                <li>Laptops (4)</li>
                                <li>Phones (3)</li>
                                <li>Cameras</li>
                                <li>Watches (3)</li>
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
                                                        setSelectedBrands(selectedBrands.filter((b) => b !== brand));
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
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="bg-[#E6EFF5] hover:bg-[#D4EEF9] p-4 rounded shadow">
                            <div className="text-right text-xs text-blue-500 mb-2">
                                {product.brand}
                            </div>
                            <Image
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-contain mb-2"
                                width={300} height={300}
                            />
                            <h4 className="font-semibold mb-1 text-center">{product.name}</h4>
                            <p className="text-sm text-gray-500 mb-2 text-center">{product.specs}</p>
                            <p className="font-bold mb-2 text-blue-600 text-center">${product.price}</p>
                            <div className="flex items-center justify-center gap-2 text-gray-600">
                                <button className="p-2 border rounded hover:bg-gray-100">
                                    <FaShoppingCart />
                                </button>
                                <button className="p-2 border rounded hover:bg-gray-100">
                                    <FaHeart />
                                </button>
                                <button className="p-2 border rounded hover:bg-gray-100">
                                    <FaEye />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className='h-28 border border-[#D9D9D9] bg-white'>
                <div className='container mx-auto flex items-center justify-between h-full'>
                    <Image src="/assets/footer.png" alt="Payments" width={200} height={200} />
                    <p>{new Date().getFullYear()} Azushop. All Rights Reserved.</p>
                </div>
            </footer>
        </DefaultLayout>
    );
};

export default Shop;
