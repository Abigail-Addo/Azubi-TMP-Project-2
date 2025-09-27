"use client";

import React from "react";
import { Modal, TextField, Fade, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormControlLabel, Checkbox } from "@mui/material";
import { IoIosClose } from "react-icons/io";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { register } from "@/lib/features/auth/authSlice";
import { toast } from 'react-toastify';


interface RegisterModalProps {
    open: boolean;
    handleClose: () => void;
}

interface IFormInput {
    _id: string | number;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ open, handleClose }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const { loading } = useAppSelector((state) => state.userAuth)
    const { control, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            isAdmin: false,
        }
    })
    const dispatch = useAppDispatch();

    // function to register a user
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const result = await dispatch(register(data));
            console.log(data)
            if (register.fulfilled.match(result)) {
                toast.success("Registration successful")
                reset();
                handleClose();
            } else if (register.rejected.match(result)) {
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
                        <h1>Register</h1>
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
                                {/* user name */}
                                <div>
                                    <Controller
                                        name="username"
                                        control={control}
                                        rules={{
                                            required: "Username cannot be empty"
                                        }}
                                        render={({ field }) =>
                                            <TextField
                                                {...field}
                                                id="username"
                                                label="UserName"
                                                variant="outlined"
                                                className="w-full"
                                                autoComplete="off"
                                                required
                                                type="text"
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
                                    {errors.username && (
                                        <p role="alert" className="text-red-500 text-sm">{errors.username.message}</p>
                                    )}
                                </div>
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
                                                id="email"
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
                                {/* password */}
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
                                {/* isAdmin */}
                                <div>
                                    <Controller
                                        name="isAdmin"
                                        control={control}
                                        render={({ field }) =>
                                            <FormControl
                                                sx={{
                                                    '& .MuiInputLabel-root.Mui-focused ': {
                                                        color: '#01589A',
                                                    },
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: '#01589A',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: '#01589A',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: '#01589A',
                                                        },
                                                    },
                                                }}
                                            >
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={field.value}
                                                            onChange={(e) => field.onChange(e.target.checked)}
                                                            sx={{
                                                                color: '#01589A',
                                                                '&.Mui-checked': {
                                                                    color: '#01589A',
                                                                },
                                                            }}
                                                        />
                                                    }
                                                    label="Do you want to register as an admin?"
                                                />

                                            </FormControl>
                                        }
                                    />
                                </div>
                                {/* button */}
                                <div className="w-full flex justify-center">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-[#01589A] text-white w-full py-2 rounded">
                                        {loading ? 'Loading...' : 'Register'}
                                    </button>
                                </div>

                                <p className='text-center underline flex items-center justify-center'>Already have an account?
                                    <Link href="/signup" className='text-[#01589A] pr-6'> Login in here</Link> <MdOutlineArrowOutward />
                                </p>
                            </div>

                        </form>
                    </div>

                </div>
            </Fade>
        </Modal>
    );
};

export default RegisterModal;
