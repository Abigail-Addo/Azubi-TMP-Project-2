import React from "react";
import { FiEdit2 } from "react-icons/fi";
import Image from "next/image";
import { getAllProducts, getSingleProduct, deleteProduct } from "@/lib/features/products/productsSLice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Skeleton } from "@mui/material";
import ProductsModal from "../modal/ProductsModal";
import { toast } from 'react-toastify';
import { MdDeleteOutline } from "react-icons/md";
import AlertDialog from "../dialogue/AlertDialogue";

const Products = () => {
    const { products, fetchAllLoading } = useAppSelector(
        (state) => state.products
    );
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [dialogueVisible, setDialogueVisible] = React.useState(false);

    React.useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    const showModal = (newOpen: boolean) => () => {
        if (!newOpen) {
            setSelectedProduct(null);
        }
        setOpenModal(newOpen);
    };
    // edit
    const edit = React.useCallback(
        (_id: string) => async () => {
            try {
                const result = await dispatch(getSingleProduct(_id));
                if (getSingleProduct.fulfilled.match(result)) {
                    setOpenModal(true);
                    setSelectedProduct(result.payload);
                    console.log(result.payload)
                } else {
                    toast.error('Failed to fetch product');
                }
            } catch (error) {
                toast.error((error as Error).message || 'Unexpected error');
            }
        },
        [dispatch],
    );
    // delete
    const remove = React.useCallback(
        (_id: string) => async () => {
            try {
                const result = await dispatch(getSingleProduct(_id));
                if (getSingleProduct.fulfilled.match(result)) {
                    setDialogueVisible(true);
                    setSelectedProduct(result.payload._id || _id);
                    console.log(result.payload)
                } else {
                    toast.error('Failed to fetch product');
                }
            } catch (error) {
                toast.error((error as Error).message || 'Unexpected error');
            }

        },
        [dispatch],
    );

    const handleDeleteConfirm = async () => {
        if (!selectedProduct) {
            toast.error("Product not found");
        }

        try {
            const result = await dispatch(deleteProduct(selectedProduct));
            if (deleteProduct.fulfilled.match(result)) {
                toast.success("Product deleted successfully");
                dispatch(getAllProducts());
            } else {
                toast.error("Failed to delete product");
            }
        } catch (error) {
            toast.error((error as Error).message || "Unexpected error");
        }
    };

    return (
        <>
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-end items-center">
                    <p className="font-semibold text-gray-700 pb-10">
                        Total:{" "}
                        <span className="text-black">
                            {products?.length?.toString()?.padStart(2, "0")}
                        </span>
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {fetchAllLoading &&
                        Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={`skeleton-${i}`}
                                className="bg-white shadow rounded-lg p-4 flex flex-col justify-between"
                            >
                                <Skeleton variant="rectangular" height={150} />
                                <div className="mt-4 space-y-2">
                                    <Skeleton width="80%" height={20} />
                                    <Skeleton width="60%" height={16} />
                                    <Skeleton width="40%" height={20} />
                                </div>
                                <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                                    <Skeleton width={20} height={20} />
                                    <Skeleton width={60} height={16} />
                                </div>
                            </div>
                        ))}

                    {/* No products */}
                    {!fetchAllLoading && (products?.length ?? 0) === 0 && (
                        <p className="text-gray-500">No products found</p>
                    )}

                    {!fetchAllLoading && (products?.length ?? 0) > 0 &&
                        products.map((product) => (
                            <div
                                key={product?._id || Math.random()}
                                className="bg-white shadow rounded-lg p-4 flex flex-col justify-between"
                            >
                                {/* Product Image */}
                                <div className="flex justify-center">
                                    <Image
                                        src={product?.image || "https://images.pexels.com/photos/28216688/pexels-photo-28216688.png"}
                                        alt={product?.name || "Product image"}
                                        width={200}
                                        height={150}
                                        className="object-contain"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="mt-4">
                                    <h3 className="font-semibold text-gray-800">{product?.name || ""}</h3>
                                    <p className="text-sm text-gray-500">{product?.description || ""}</p>
                                    <p className="text-blue-600 font-semibold mt-2">
                                        ${product?.price || ""}
                                    </p>
                                </div>

                                {/* Footer */}
                                <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                                    <div className="flex gap-3">
                                        <FiEdit2
                                            className="w-4 h-4 cursor-pointer text-blue-600"
                                            onClick={() => edit(product._id)()}
                                        />
                                        <MdDeleteOutline
                                            className="w-4 h-4 cursor-pointer text-red-600"
                                            onClick={() => remove(product._id)()}
                                        />
                                    </div>
                                    <span>
                                        {new Date(product?.createdAt).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {dialogueVisible && (
                <AlertDialog
                    text="You're about to delete a product. Confirm to continue."
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDialogueVisible(false)}
                />
            )}

            {/* Pass productId to modal */}
            <ProductsModal
                open={openModal}
                handleClose={showModal(false)}
                productData={selectedProduct}
            />
        </>
    );
};

export default Products;
