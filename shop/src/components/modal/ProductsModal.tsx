"use client";

import React from "react";
import {
    Modal, Fade, OutlinedInput, InputAdornment, TextField,
    Button,
    Autocomplete,
    CircularProgress,
} from "@mui/material";
import { IoIosClose } from "react-icons/io";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { getAllProducts, updateProduct } from "@/lib/features/products/productsSLice";
import { toast } from 'react-toastify';
import { getAllCategories } from "@/lib/features/category/categorySlice";
import AlertDialog from "../dialogue/AlertDialogue";


interface ProductsModalProps {
    open: boolean;
    handleClose: () => void;
    productData?: IFormInput | null;
}

interface IFormInput {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    quantity: number;
    brand: string;
    image: string;
}

const ProductsModal: React.FC<ProductsModalProps> = ({ open, handleClose, productData }) => {
    const { category, fetchAllLoading } = useAppSelector((state) => state.category)
    const { control, handleSubmit, formState: { errors }, getValues, reset } = useForm<IFormInput>({
        defaultValues: {
            name: '',
            description: '',
            price: 1,
            category: '',
            quantity: 1,
            brand: '',
            image: '',
        },
    })
    const dispatch = useAppDispatch();
    const [dialogueVisible, setDialogueVisible] = React.useState(false);

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const [fileName, setFileName] = React.useState('No file chosen');
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    React.useEffect(() => {
        setFileName('No file chosen');
        setSelectedFile(null);
        dispatch(getAllCategories());
    }, [dispatch]);

    // helper function to convert file to base64 string
    const toBase64 = (file: File) =>
        new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });


    React.useEffect(() => {
        if (productData) {
            reset(productData);
            setFileName(productData.image ? productData.image : "No file chosen");
        }
    }, [productData, reset]);

    // function to login a user
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const formData = new FormData();

            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('price', String(data.price));
            formData.append('category', data.category);
            formData.append('quantity', String(data.quantity));
            formData.append('brand', data.brand);

            if (selectedFile) {
                const base64Image = await toBase64(selectedFile);
                formData.append("image", base64Image);
            }

            const result = await dispatch(updateProduct({ formData, productId: productData?._id ?? null, }));

            if (updateProduct.fulfilled.match(result)) {
                dispatch(getAllProducts());
                toast.success('Product updated');
                reset();
                handleClose();
                reset();
            } else if (updateProduct.rejected.match(result)) {
                toast.error(result.payload as string);
            }
        } catch (error) {
            toast.error(error as string)
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

    // category options data
    const categoryOptions = category.map((c) => ({
        label: c.name,
        value: c._id,
    }));

    return (
        <>
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
                            <form className="w-full h-full flex flex-col gap-6" onSubmit={handleSubmit(handleFormSubmit)}>
                                {/* File Upload */}
                                <div className="mb-3 flex flex-col gap-2 p-5 rounded-md bg-[#EAF3F9]">
                                    <Controller
                                        name="image"
                                        control={control}
                                        rules={{ required: "Please upload an image" }}
                                        render={({ field }) => (
                                            <>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    ref={fileInputRef}
                                                    style={{ display: "none" }}
                                                    onChange={(event) => {
                                                        if (event.target.files && event.target.files[0]) {
                                                            const selected = event.target.files[0];
                                                            setFileName(selected.name);
                                                            setSelectedFile(selected);
                                                            field.onChange(selected);
                                                        } else {
                                                            setFileName("No file chosen");
                                                            setSelectedFile(null);
                                                            field.onChange(null);
                                                        }
                                                    }}
                                                />

                                                <OutlinedInput
                                                    fullWidth
                                                    value={fileName}
                                                    readOnly
                                                    notched={false}
                                                    sx={{
                                                        "& .MuiOutlinedInput-notchedOutline": {
                                                            border: "none",
                                                        },
                                                        height: 40,
                                                    }}
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <Button
                                                                variant="contained"
                                                                onClick={handleButtonClick}
                                                                sx={{ backgroundColor: "#01589A", "&:hover": { backgroundColor: "#014273" } }}
                                                            >
                                                                Choose File
                                                            </Button>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </>
                                        )}
                                    />
                                    {errors.image && (
                                        <p role="alert" className="text-red-500 text-sm">{errors.image.message}</p>
                                    )}
                                </div>

                                <div className="grid lg:grid-cols-2 gap-6">
                                    {/* name */}
                                    <div>
                                        <Controller
                                            name="name"
                                            control={control}
                                            rules={{
                                                required: "Please enter a valid name"
                                            }}
                                            render={({ field }) =>
                                                <TextField
                                                    {...field}
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
                                            }
                                        />
                                        {errors.name && (
                                            <p role="alert" className="text-red-500 text-sm">{errors.name.message}</p>
                                        )}
                                    </div>
                                    {/* price */}
                                    <div>
                                        <Controller
                                            name="price"
                                            control={control}
                                            rules={{
                                                required: "Please enter price",
                                                pattern: {
                                                    value: /\d+/,
                                                    message: "Only digits are allowed in this field"
                                                },
                                            }}
                                            render={({ field }) =>
                                                <TextField
                                                    {...field}
                                                    label="Price"
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
                                            }
                                        />
                                        {errors.price && (
                                            <p role="alert" className="text-red-500 text-sm">{errors.price.message}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="grid lg:grid-cols-2 gap-6">
                                    {/* quantity */}
                                    <div>
                                        <Controller
                                            name="quantity"
                                            control={control}
                                            rules={{
                                                required: "Please enter a quantity",
                                                pattern: {
                                                    value: /\d+/,
                                                    message: "Only digits are allowed in this field"
                                                },
                                            }}
                                            render={({ field }) =>
                                                <TextField
                                                    {...field}
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
                                            }
                                        />
                                        {errors.quantity && (
                                            <p role="alert" className="text-red-500 text-sm">{errors.quantity.message}</p>
                                        )}
                                    </div>
                                    {/* brand */}
                                    <div>
                                        <Controller
                                            name="brand"
                                            control={control}
                                            rules={{
                                                required: "Please enter a valid name"
                                            }}
                                            render={({ field }) =>
                                                <TextField
                                                    {...field}
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
                                            }
                                        />
                                        {errors.brand && (
                                            <p role="alert" className="text-red-500 text-sm">{errors.brand.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid lg:grid-cols-2 gap-6">
                                    {/* category */}
                                    <div>
                                        <Controller
                                            name="category"
                                            control={control}
                                            rules={{ required: "Please select an option" }}
                                            render={({ field }) =>
                                                <Autocomplete
                                                    options={categoryOptions}
                                                    getOptionLabel={(option) => option.label}
                                                    isOptionEqualToValue={(option, value) => option.value === value.value}
                                                    value={categoryOptions.find((opt) => opt.value === field.value) || null}
                                                    onChange={(_, newValue) => field.onChange(newValue?.value || '')}
                                                    renderOption={(props, option) => (
                                                        <li {...props} key={option.value}>
                                                            {option.label}
                                                        </li>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Category"
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
                                                            slotProps={{
                                                                input: {
                                                                    ...params.InputProps,
                                                                    endAdornment: (
                                                                        <React.Fragment>
                                                                            {fetchAllLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                                                            {params.InputProps.endAdornment}
                                                                        </React.Fragment>
                                                                    ),
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />
                                            }
                                        />
                                        {errors.category && (
                                            <p role="alert" className="text-red-500 text-sm">{errors.category.message}</p>
                                        )}
                                    </div>
                                </div>
                                {/* description */}
                                <div>
                                    <Controller
                                        name="description"
                                        control={control}
                                        rules={{
                                            required: "Please enter a description"
                                        }}
                                        render={({ field }) =>
                                            <TextField
                                                {...field}
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
                                        }
                                    />
                                    {errors.description && (
                                        <p role="alert" className="text-red-500 text-sm">{errors.description.message}</p>
                                    )}
                                </div>

                                <div className="flex justify-start">
                                    <button
                                        className="bg-[#01589A] hover:bg-[#014273] text-white w-1/4 py-2 rounded"
                                        type="submit"
                                        onClick={() => {
                                            const { name, price, category, quantity, description, image, brand } = getValues();
                                            const allFilled = name && price && category && quantity && description && image && brand;

                                            if (allFilled) {
                                                setDialogueVisible(true);
                                            }
                                        }}
                                    >
                                        Create
                                    </button>
                                </div>

                            </form >

                        </div>

                    </div>
                </Fade>
            </Modal>

            {/* Dialogue */}
            {dialogueVisible && (
                <AlertDialog
                    text="You're about to edit a product. Confirm to continue."
                    onConfirm={handleConfirm}
                    onCancel={() => setDialogueVisible(false)}
                />
            )}
        </>
    );
};

export default ProductsModal;
