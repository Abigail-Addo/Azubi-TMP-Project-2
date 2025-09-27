"use client";

import React from "react";
import {
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";

const categories = ["Phones", "Laptop", "Watches", "Camera"];

const UpdateProduct = () => {

    return (
        <div>
            <form className="w-full h-full flex flex-col gap-6">
                {/* File Upload */}
                <div className="mb-3 flex justify-center p-5 rounded-md bg-[#EAF3F9]">
                    <label className="bg-[#01589A] text-white px-5 py-2 rounded-md font-medium hover:bg-[#014273] cursor-pointer">
                        Choose file
                        <input type="file" accept="image/*" className="hidden" />
                    </label>
                </div>


                <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                        <TextField
                            label="Name"
                            id="outlined-basic"
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
                    </div>

                    <div>
                        <TextField
                            label="Price"
                            type="number"
                            id="outlined-basic"
                            variant="outlined"
                            className="w-full"
                            autoComplete="off"
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
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                        <TextField
                            label="Quantity"
                            type="number"
                            id="outlined-basic"
                            variant="outlined"
                            className="w-full"
                            autoComplete="off"
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
                    </div>

                    <div>
                        <TextField
                            label="Brand"
                            type="text"
                            id="outlined-basic"
                            variant="outlined"
                            className="w-full"
                            autoComplete="off"
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
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                        <TextField
                            label="Count in Stock"
                            type="number"
                            id="outlined-basic"
                            variant="outlined"
                            className="w-full"
                            autoComplete="off"
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
                    </div>

                    <div>
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
                            }}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={categories}
                                label="Category"
                            >
                                {categories.map((cat) => (
                                    <MenuItem key={cat} value={cat}>
                                        {cat}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div>
                    <TextField
                        multiline
                        rows={4}
                        label="Description"
                        id="outlined-basic"
                        variant="outlined"
                        className="w-full"
                        autoComplete="off"
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
                </div>

                <div className="flex justify-start">
                    <button className="bg-[#01589A] hover:bg-[#014273] text-white w-1/4 py-2 rounded">
                        Update
                    </button>
                </div>

            </form >
        </div >
    );
};

export default UpdateProduct;
