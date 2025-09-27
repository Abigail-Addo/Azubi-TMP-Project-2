"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Autocomplete } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addProductReview } from "@/lib/features/products/productsSLice";
import { toast } from 'react-toastify';

interface ReviewFormProps {
    productId: string;
    onReviewAdded?: () => void;
}

type ReviewFormInputs = {
    rating: number;
    comment: string;
};

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onReviewAdded }) => {
    const dispatch = useAppDispatch();
    const { reviewLoading } = useAppSelector((state) => state.products);

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<ReviewFormInputs>({
        defaultValues: {
            rating: 0,
            comment: "",
        },
    });

    const onSubmit = async (data: ReviewFormInputs) => {
        try {
            const result = await dispatch(
                addProductReview({
                    productId,
                    review: { rating: data.rating, comment: data.comment },
                })
            );

            if (addProductReview.fulfilled.match(result)) {
                toast.success("Rating added");
                reset();

                // ✅ Trigger refresh in parent
                if (onReviewAdded) onReviewAdded();
            } else if (addProductReview.rejected.match(result)) {
                toast.error(result.payload as string);
            }
        } catch (error) {
            toast.error((error as Error).message || "Unexpected error");
        }
    };

    // ✅ Correct rating options
    const ratingOptions = [
        { label: "1 Star", value: 1 },
        { label: "2 Stars", value: 2 },
        { label: "3 Stars", value: 3 },
        { label: "4 Stars", value: 4 },
        { label: "5 Stars", value: 5 },
    ];

    return (
        <form className="space-y-4 md:w-2/4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
            {/* Rating */}
            <div>
                <Controller
                    name="rating"
                    control={control}
                    rules={{ required: "Please select a rating" }}
                    render={({ field }) => (
                        <Autocomplete
                            options={ratingOptions}
                            getOptionLabel={(option) => option.label}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            value={ratingOptions.find((opt) => opt.value === field.value) || null}
                            onChange={(_, newValue) => field.onChange(newValue ? newValue.value : 0)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Rating"
                                    error={!!errors.rating}
                                    helperText={errors.rating?.message}
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
                    )}
                />

            </div>

            {/* Comment */}
            <div>
                <Controller
                    name="comment"
                    control={control}
                    rules={{ required: "Comment is required", minLength: { value: 5, message: "Please write at least 5 characters" } }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Comments"
                            placeholder="Write your review..."
                            multiline
                            rows={4}
                            fullWidth
                            variant="outlined"
                            error={!!errors.comment}
                            helperText={errors.comment?.message}
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
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={reviewLoading}
                className="bg-[#01589A] text-white w-full py-2 rounded disabled:opacity-50 cursor-pointer"
            >
                {reviewLoading ? "Submitting..." : "Submit"}
            </button>
        </form>
    );
};

export default ReviewForm;
