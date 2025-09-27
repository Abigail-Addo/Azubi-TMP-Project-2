"use client";

import React from "react";
import DefaultLayout from "../DefaultLayout";
import Image from "next/image";
import { FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

import UpdateProfileTab from "@/components/tabs/UpdateProfile";
import MyOrdersTab from "@/components/tabs/MyOrders";

const Profile = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = React.useState<"profile" | "orders">("orders");

    return (
        <DefaultLayout>
            <div className="container mx-auto py-10">
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
                            onClick={() => setActiveTab("profile")}
                            className={`pb-2 ${activeTab === "profile"
                                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                                : "text-gray-500 hover:text-blue-600"
                                }`}
                        >
                            Update Profile
                        </button>
                        <button
                            onClick={() => setActiveTab("orders")}
                            className={`pb-2 ${activeTab === "orders"
                                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                                : "text-gray-500 hover:text-blue-600"
                                }`}
                        >
                            My Orders
                        </button>
                    </nav>
                </div>

                {/* Tab Content */}
                {activeTab === "profile" && <UpdateProfileTab />}
                {activeTab === "orders" && <MyOrdersTab />}
            </div>

            {/* Footer */}
            <footer className="h-28 border border-[#D9D9D9] mt-10 fixed bottom-0 w-full">
                <div className="container mx-auto flex items-center justify-between h-full">
                    <Image src="/assets/footer.png" alt="Payments" width={200} height={200} />
                    <p>{new Date().getFullYear()} Azushop. All Rights Reserved.</p>
                </div>
            </footer>
        </DefaultLayout>
    );
};

export default Profile;
