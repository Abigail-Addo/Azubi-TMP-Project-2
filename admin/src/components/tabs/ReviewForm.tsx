"use client";

import React from "react";
import { FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";

const ReviewForm = () => {
    const [rating, setRating] = React.useState("");
    const [comment, setComment] = React.useState("");

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log({ rating, comment });
        setRating("");
        setComment("");
    };

    return (
        <form className="space-y-4 md:w-2/4 mx-auto" onSubmit={handleSubmit}>
            <div>
                <FormControl fullWidth size="small">
                    <InputLabel id="rating-label">Ratings</InputLabel>
                    <Select
                        labelId="rating-label"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    >
                        <MenuItem value="">Select</MenuItem>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <MenuItem key={star} value={star}>
                                {star} Star{star > 1 && "s"}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <div>
                <TextField
                    label="Comments"
                    placeholder="Write your review..."
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>

            <button
                type="submit"
                className="bg-[#01589A] text-white w-full py-2 rounded"
            >
                Submit
            </button>
        </form>
    );
};

export default ReviewForm;
