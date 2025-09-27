"use client";

import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

interface Review {
    _id: string;
    name: string;
    rating: number;
    comment: string;
    createdAt: string;
}

const AllReviews: React.FC<{ reviews: Review[] }> = ({ reviews }) => {

    if (!reviews || reviews.length === 0) {
        return <p className="text-center text-gray-500">No reviews yet.</p>;
    }

    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <div key={review._id} className="bg-gray-50 p-6 rounded">
                    <h3 className="font-semibold">{review.name}</h3>

                    {/* Rating */}
                    <div className="flex text-yellow-500 my-1">
                        {[...Array(5)].map((_, i) =>
                            i < review.rating ? <FaStar key={i} /> : <FaRegStar key={i} />
                        )}
                    </div>

                    {/* Comment */}
                    <p className="text-gray-700">{review.comment}</p>

                    {/* Date */}
                    <p className="text-sm text-gray-500 mt-2">
                        {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default AllReviews;
