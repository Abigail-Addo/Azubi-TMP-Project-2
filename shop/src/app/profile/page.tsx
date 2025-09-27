"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/app/DefaultLayout";
import {
    TextField,
    Button,
    CircularProgress,
    FormControlLabel,
    Checkbox,
    FormControl,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProfile, updateProfile } from "@/lib/features/auth/authSlice";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';

// Form inputs
interface IFormInput {
    username: string;
    email: string;
    password?: string;
    isAdmin?: boolean;
}

// Payload type for backend
interface UpdatePayload {
    username: string;
    email: string;
    password?: string;
    isAdmin?: boolean;
}

const Profile = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { userAuth, loading, success, error } = useAppSelector(
        (state) => state.userAuth
    );
    const [showPassword, setShowPassword] = React.useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IFormInput>({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            isAdmin: false,
        },
    });

    // Load profile on mount
    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    // Prefill form with user data
    useEffect(() => {
        if (userAuth) {
            reset({
                username: userAuth.username || "",
                email: userAuth.email || "",
                password: "",
                isAdmin: userAuth.isAdmin || false,
            });
        }
    }, [userAuth, reset]);

    // Handle form submit
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const payload: UpdatePayload = {
                username: data.username,
                email: data.email,
            };

            if (data.password && data.password.trim() !== "") {
                payload.password = data.password;
            }

            if (userAuth?.isAdmin) {
                payload.isAdmin = data.isAdmin ?? false;
            }
            const result = await dispatch(updateProfile(payload));
            console.log(data)
            if (updateProfile.fulfilled.match(result)) {
                toast.success("Profile updated")
            } else if (updateProfile.rejected.match(result)) {
                toast.error(result.payload as string)
            }
        } catch (error) {
            toast.error(error as string)
        }



    };

    return (
        <DefaultLayout>
            <div className="container mx-auto py-10 bg-[#F9FBFC] h-full my-10 px-6">
                {/* Back Button */}
                <div
                    className="flex items-center justify-start gap-2 text-blue-600 underline cursor-pointer mb-6"
                    onClick={() => router.back()}
                >
                    <FiChevronLeft /> Go back
                </div>

                {/* Update Profile Form */}
                <div className=" p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">
                        Update Profile
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                        {/* Username */}
                        <div>
                            <Controller
                                name="username"
                                control={control}
                                rules={{ required: "Username is required" }}
                                render={({ field }) => (
                                    <TextField {...field} fullWidth label="Username" size='medium'
                                        sx={{
                                            '& .MuiInputLabel-root.Mui-focused ': {
                                                color: '#01589A',
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                '&:hover fieldset': {
                                                    borderColor: '#01589A',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#01589A',
                                                },
                                            },
                                        }} />
                                )}
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm">{errors.username.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email address",
                                    },
                                }}
                                render={({ field }) => (
                                    <TextField {...field} fullWidth label="Email" type="email" size='medium'
                                        sx={{
                                            '& .MuiInputLabel-root.Mui-focused ': {
                                                color: '#01589A',
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                '&:hover fieldset': {
                                                    borderColor: '#01589A',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#01589A',
                                                },
                                            },
                                        }} />
                                )}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <Controller
                                name="password"
                                control={control}
                                rules={{
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                                        message:
                                            "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
                                    },
                                }}
                                render={({ field }) => (
                                    <FormControl fullWidth variant="outlined" size='medium'
                                        sx={{
                                            '& .MuiInputLabel-root.Mui-focused ': {
                                                color: '#01589A',
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                '&:hover fieldset': {
                                                    borderColor: '#01589A',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#01589A',
                                                },
                                            },
                                        }}
                                    >
                                        <InputLabel>Password</InputLabel>
                                        <OutlinedInput
                                            {...field}
                                            type={showPassword ? "text" : "password"}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                    </FormControl>
                                )}
                            />
                        </div>

                        {/* Admin Checkbox - only show if current user is admin */}
                        {userAuth?.isAdmin && (
                            <Controller
                                name="isAdmin"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Checkbox {...field} checked={field.value} />}
                                        label="Admin Account"
                                        disabled
                                    />
                                )}
                            />
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Update"}
                        </Button>

                        {error && (
                            <p className="text-red-500 text-sm mt-2">Error: {error}</p>
                        )}
                        {success && (
                            <p className="text-green-600 text-sm mt-2">
                                Profile updated successfully!
                            </p>
                        )}
                    </form>
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
    );
};

export default Profile;
