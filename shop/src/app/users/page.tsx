"use client";

import React, { useEffect, useState } from "react";
import DefaultLayout from "../DefaultLayout";
import Image from "next/image";
import { FiChevronLeft, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    getAllUsers,
    deleteUserById,
    updateUserById,
} from "@/lib/features/users/userSlice";
import AlertDialog from "@/components/dialogue/AlertDialogue";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import {
    Modal,
    Box,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import Link from "next/link";
interface IFormInput {
    _id: string;
    username: string;
    email: string;
    isAdmin: boolean;
}

const Users = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { user, fetchAllLoading, error } = useAppSelector(
        (state) => state.user
    );
    const {
        handleSubmit,
        control,
        reset,
    } = useForm<IFormInput>({
        defaultValues: {
            _id: "",
            username: "",
            email: "",
            isAdmin: false,
        },
    });

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [dialogueVisible, setDialogueVisible] = useState(false);
    const [deleteDialogueVisible, setDeleteDialogueVisible] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    // submit edit after confirmation
    const onSubmit = async (data: IFormInput) => {
        try {
            const result = await dispatch(
                updateUserById({
                    userId: data._id,
                    userData: {
                        username: data.username,
                        email: data.email,
                        isAdmin: data.isAdmin,
                    },
                })
            );

            if (updateUserById.fulfilled.match(result)) {
                toast.success("User updated");
                reset();
                setEditModalOpen(false);
                dispatch(getAllUsers());
            } else if (updateUserById.rejected.match(result)) {
                toast.error(result.payload as string);
            }
        } catch (error: unknown) {
            toast.error(error as string);
        }
    };


    const handleEditClick = (u: IFormInput) => {
        reset(u); // load user into form
        setEditModalOpen(true);
    };

    const handleConfirmEdit = () => {
        setDialogueVisible(false);
        handleSubmit(onSubmit)();
    };

    // Confirm delete
    const confirmDelete = async () => {
        if (!deleteId) return;

        try {
            const result = await dispatch(deleteUserById(deleteId));
            if (deleteUserById.fulfilled.match(result)) {
                toast.success("User deleted successfully");
                dispatch(getAllUsers());
            } else if (deleteUserById.rejected.match(result)) {
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
                <div className="container mx-auto py-10">
                    <div
                        className="flex items-center justify-start gap-2 text-blue-600 underline cursor-pointer mb-6"
                        onClick={() => router.back()}
                    >
                        <FiChevronLeft /> Go back
                    </div>

                    <div className="p-6 bg-white shadow rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Users</h2>

                        {fetchAllLoading && <p>Loading users...</p>}
                        {error && <p className="text-red-500">{error}</p>}

                        {!fetchAllLoading && user.length === 0 && <p>No users found.</p>}

                        {user.length > 0 && (
                            <table className="w-full border-collapse border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-2 text-start">Id</th>
                                        <th className="p-2 text-start">Name</th>
                                        <th className="p-2 text-start">Email</th>
                                        <th className="p-2 text-start">Admin</th>
                                        <th className="p-2 text-start">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.map((u) => (
                                        <tr key={u._id}>
                                            <td className="p-2">{u._id}</td>
                                            <td className="p-2">{u.username}</td>
                                            <td className="p-2">{u.email}</td>
                                            <td className="p-2">{u.isAdmin ? "Yes" : "No"}</td>
                                            <td className="p-2 flex gap-3">
                                                <FiEdit2
                                                    className="cursor-pointer text-blue-600"
                                                    onClick={() => handleEditClick(u)}
                                                />
                                                <FiTrash2
                                                    className="cursor-pointer text-red-600"
                                                    onClick={() => {
                                                        setDeleteId(u._id);
                                                        setDeleteDialogueVisible(true);
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                <footer className="h-28 border border-[#D9D9D9] mt-10 fixed bottom-0 w-full">
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

            {/* Edit Modal */}
            <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
                <Box
                    className="bg-white p-6 rounded-lg shadow-lg mx-auto mt-20"
                    sx={{ width: 400 }}
                >
                    <h2 className="text-lg font-semibold mb-4">Edit User</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setDialogueVisible(true); // open confirmation dialog instead of saving directly
                        }}
                    >
                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Name"
                                    fullWidth
                                    margin="normal"
                                />
                            )}
                        />

                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    fullWidth
                                    margin="normal"
                                />
                            )}
                        />

                        <Controller
                            name="isAdmin"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            {...field}
                                            checked={field.value}
                                            onChange={(e) => field.onChange(e.target.checked)}
                                        />
                                    }
                                    label="Is Admin"
                                />
                            )}
                        />

                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Update
                        </Button>
                    </form>
                </Box>
            </Modal>

            {/* Edit Confirmation */}
            {dialogueVisible && (
                <AlertDialog
                    text="You're about to edit this user. Confirm to continue."
                    onConfirm={handleConfirmEdit}
                    onCancel={() => setDialogueVisible(false)}
                />
            )}

            {/* Delete Confirmation */}
            {deleteDialogueVisible && (
                <AlertDialog
                    text="Are you sure you want to delete this user?"
                    onConfirm={confirmDelete}
                    onCancel={() => setDeleteDialogueVisible(false)}
                />
            )}
        </>
    );
};

export default Users;
