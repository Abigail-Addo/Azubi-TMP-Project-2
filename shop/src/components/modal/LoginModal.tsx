"use client";

import React from "react";
import { Modal, TextField, Fade, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { IoIosClose } from "react-icons/io";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { login } from "@/lib/features/auth/authSlice";
import { toast } from 'react-toastify';

interface LoginModalProps {
    open: boolean;
    handleClose: () => void;
}

interface IFormInput {
    _id: string | number;
    email: string;
    password: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, handleClose, }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const { loading } = useAppSelector((state) => state.userAuth)
    const { control, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>({
        defaultValues: {
            email: '',
            password: '',
        }
    })
    const dispatch = useAppDispatch();

    // function to login a user
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const result = await dispatch(login(data));
            console.log(data)
            if (login.fulfilled.match(result)) {
                toast.success("Login successful")
                reset();
                handleClose();
            } else if (login.rejected.match(result)) {
                toast.error(result.payload as string)
            }
        } catch (error) {
            toast.error(error as string)
        }
    };

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={(e, reason) => {
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    handleClose();
                }
            }}
            className='outline-none w-full flex items-center justify-center backdrop-blur-sm px-2'
        >
            <Fade in={open}>
                <div className='w-full lg:w-2/4 bg-white max-h-[80vh] h-fit overflow-y-auto'>

                    {/* Close Icon */}
                    <div className='border-b-4 text-2xl font-bold border-gray-400 p-4 flex items-center justify-between'>
                        <h1>Login</h1>
                        <IoIosClose
                            onClick={() => {
                                handleClose();
                            }}
                            className=" cursor-pointer"
                        />
                    </div>

                    <div>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="w-full h-full"
                        >
                            <div className="py-10 px-5 md:px-16 lg:px-16 md:py-16 grid grid-cols-1 gap-8">
                                {/* email */}
                                <div>
                                    <Controller
                                        name="email"
                                        control={control}
                                        rules={{
                                            required: "Please enter a valid email",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Invalid email address",
                                            }
                                        }}
                                        render={({ field }) =>
                                            <TextField
                                                {...field}
                                                id="outlined-basic"
                                                label="Email"
                                                variant="outlined"
                                                className="w-full"
                                                autoComplete="off"
                                                type="text"
                                                required
                                                size='medium'
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
                                            />
                                        }
                                    />
                                    {errors.email && (
                                        <p role="alert" className="text-red-500 text-sm">{errors.email.message}</p>
                                    )}
                                </div>
                                <div>
                                    <Controller
                                        name="password"
                                        control={control}
                                        rules={{
                                            required: "Password is required",
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                                                message:
                                                    "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <FormControl fullWidth variant="outlined" size='medium' required
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
                                    {errors.password && (<p className="text-red-500 text-sm">{errors.password.message}</p>)}
                                </div>

                                {/* button */}
                                <div className="w-full flex justify-center">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-[#01589A] text-white w-full py-2 rounded">
                                        {loading ? 'Loading...' : 'Login'}
                                    </button>
                                </div>

                                <p className='text-center underline flex items-center justify-center'>New customer?
                                    <Link href="/signup" className='text-[#01589A] pr-6'> Create your account</Link> <MdOutlineArrowOutward />
                                </p>
                            </div>

                        </form>
                    </div>

                </div>
            </Fade>
        </Modal>
    );
};

export default LoginModal;
