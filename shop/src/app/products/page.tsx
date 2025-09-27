"use client"


import React from 'react'
import DefaultLayout from '../DefaultLayout'
import Image from 'next/image'
import { FiChevronLeft } from 'react-icons/fi'
import { useRouter } from "next/navigation";
import Product from '@/components/tabs/Products'
import CreateProduct from '@/components/tabs/CreateProduct'

const Products = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = React.useState<"products" | "create products">("products");

    return (
        <>
            <DefaultLayout>
                <div className="container mx-auto py-10 bg-[#F9FBFC] my-10 px-10">
                    {/* Go back button */}
                    <div
                        className="flex items-center justify-start gap-2 text-blue-600 underline cursor-pointer mb-6"
                        onClick={() => router.back()}
                    >
                        <FiChevronLeft /> Go back
                    </div>



                    {/* Tabs */}
                    <div className="border-b border-gray-200 mb-6">
                        <nav className="flex space-x-6">
                            <button
                                onClick={() => setActiveTab("products")}
                                className={`pb-2 ${activeTab === "products"
                                    ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                                    : "text-gray-500 hover:text-blue-600"
                                    }`}
                            >
                                Products
                            </button>
                            <button
                                onClick={() => setActiveTab("create products")}
                                className={`pb-2 ${activeTab === "create products"
                                    ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                                    : "text-gray-500 hover:text-blue-600"
                                    }`}
                            >
                                Create Products
                            </button>
                        </nav>
                    </div>

                    {/* Tab Content */}
                    {activeTab === "products" && <Product />}
                    {activeTab === "create products" && <CreateProduct />}
                </div>

                {/* Footer */}
                <footer className='h-28 border border-[#D9D9D9] bg-white'>
                    <div className='container mx-auto flex items-center justify-between h-full'>
                        <Image src="/assets/footer.png" alt="Payments" width={200} height={200} />
                        <p>{new Date().getFullYear()} Azushop. All Rights Reserved.</p>
                    </div>
                </footer>
            </DefaultLayout>
        </>
    )
}

export default Products
