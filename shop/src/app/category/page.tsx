"use client";

import React from "react";
import DefaultLayout from "../DefaultLayout";
import Image from "next/image";
import { FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { TextField, Skeleton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    createCategory,
    getAllCategories,
    deleteCategory
} from "@/lib/features/category/categorySlice";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import AlertDialog from "@/components/dialogue/AlertDialogue";
import { MdDeleteOutline } from "react-icons/md";

interface IFormInput {
    _id: string;
    name: string;
}

const Category = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { category, fetchAllLoading } = useAppSelector(
        (state) => state.category
    );
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset, getValues
    } = useForm<IFormInput>({
        defaultValues: {
            name: "",
        },
    });
    const [dialogueVisible, setDialogueVisible] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState<string | null>(null);
    const [deleteDialogueVisible, setDeleteDialogueVisible] = React.useState(false);
    React.useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    // create a category
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const result = await dispatch(createCategory(data));
            if (createCategory.fulfilled.match(result)) {
                toast.success("Category created");
                reset();
                dispatch(getAllCategories()); // refresh after creation
            } else if (createCategory.rejected.match(result)) {
                toast.error(result.payload as string);
            }
        } catch (error: unknown) {
            toast.error(error as string);
        }
    };

    // Trigger confirmation dialog before submitting
    const handleFormSubmit = (data: IFormInput) => {
        console.log('Validated Data:', data);
        setDialogueVisible(true);
    };

    const handleConfirm = () => {
        setDialogueVisible(false);
        handleSubmit(onSubmit)();
    };

    // Trigger delete confirmation
    const handleDeleteClick = (id: string) => {
        setDeleteId(id);
        setDeleteDialogueVisible(true);
    };

    // Confirm delete
    const confirmDelete = async () => {
        if (!deleteId) return;

        try {
            const result = await dispatch(deleteCategory(deleteId));
            if (deleteCategory.fulfilled.match(result)) {
                toast.success("Category deleted successfully");
                dispatch(getAllCategories()); // refresh after deletion
            } else if (deleteCategory.rejected.match(result)) {
                toast.error(result.payload as string);
            }
        } catch (error: unknown) {
            toast.error(error as string);
        } finally {
            setDeleteDialogueVisible(false);
            setDeleteId(null);
        }
    };

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
                    <form
                        className="w-full h-full flex flex-col gap-6"
                        onSubmit={handleSubmit(handleFormSubmit)}
                    >
                        <div>
                            <Controller
                                name="name"
                                control={control}
                                rules={{
                                    required: "Please enter a valid name",
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Category"
                                        id="outlined-basic"
                                        variant="outlined"
                                        className="w-full"
                                        autoComplete="off"
                                        type="text"
                                        required
                                        size="medium"
                                        sx={{
                                            "& .MuiInputLabel-root.Mui-focused ": {
                                                color: "#01589A",
                                            },
                                            "& .MuiOutlinedInput-root": {
                                                "&:hover fieldset": {
                                                    borderColor: "#01589A",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#01589A",
                                                },
                                            },
                                        }}
                                    />
                                )}
                            />
                            {errors.name && (
                                <p role="alert" className="text-red-500 text-sm">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-start">
                            <button
                                className="bg-[#01589A] hover:bg-[#014273] text-white w-1/4 py-2 rounded"
                                type="submit"
                                onClick={() => {
                                    const { name } = getValues();
                                    const allFilled = name;

                                    if (allFilled) {
                                        setDialogueVisible(true);
                                    }
                                }}
                            >
                                Create
                            </button>
                        </div>
                    </form>

                    <div className="mt-8">
                        <p className="font-semibold mb-4">All Categories</p>

                        {/* Loading skeleton */}
                        {fetchAllLoading && (
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                                {[...Array(4)].map((_, i) => (
                                    <Skeleton
                                        key={i}
                                        variant="rectangular"
                                        height={60}
                                        className="p-3 border rounded-md bg-white shadow-sm"
                                    />
                                ))}
                            </div>
                        )}

                        {/* No categories */}
                        {!fetchAllLoading && (category?.length ?? 0) === 0 && (
                            <p className="text-gray-500">No category found</p>
                        )}

                        {/* Category list */}
                        {!fetchAllLoading && (category?.length ?? 0) > 0 && (
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                                {category.map((c) => (
                                    <div
                                        key={c._id}
                                        className="p-3 border rounded-md bg-white shadow-sm flex justify-between items-center"
                                    >
                                        <span>{c.name}</span>
                                        <MdDeleteOutline
                                            className="text-red-500 cursor-pointer"
                                            size={22}
                                            onClick={() => handleDeleteClick(c._id)}
                                        />
                                    </div>
                                ))}
                            </div>

                        )}
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
                        <p>{new Date().getFullYear()} Azushop. All Rights Reserved.</p>
                    </div>
                </footer>
            </DefaultLayout>

            {/* Dialogue */}
            {dialogueVisible && (
                <AlertDialog
                    text="You're about to create a category. Confirm to continue."
                    onConfirm={handleConfirm}
                    onCancel={() => setDialogueVisible(false)}
                />
            )}

            {deleteDialogueVisible && (
                <AlertDialog
                    text="Are you sure you want to delete this category?"
                    onConfirm={confirmDelete}
                    onCancel={() => setDeleteDialogueVisible(false)}
                />
            )}
        </>
    );
};

export default Category;
