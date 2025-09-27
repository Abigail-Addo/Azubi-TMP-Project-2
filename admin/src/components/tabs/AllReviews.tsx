"use client";

import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const reviews = [
    {
        id: 1,
        name: "John Doe",
        rating: 4,
        comment: "Experience exceptional clarity and precision",
        date: "August 6, 2024",
    },
    {
        id: 2,
        name: "Jane Smith",
        rating: 5,
        comment: "Loved the performance and sleek design!",
        date: "August 10, 2024",
    },
];

const AllReviews = () => {
    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 p-6 rounded">
                    <h3 className="font-semibold">{review.name}</h3>

                    {/* Rating */}
                    <div className="flex text-blue-600 my-1">
                        {[...Array(5)].map((_, i) =>
                            i < review.rating ? (
                                <FaStar key={i} />
                            ) : (
                                <FaRegStar key={i} />
                            )
                        )}
                    </div>

                    {/* Comment */}
                    <p className="text-gray-700">{review.comment}</p>

                    {/* Date */}
                    <p className="text-sm text-gray-500 mt-2">{review.date}</p>
                </div>
            ))}
        </div>
    );
};

export default AllReviews;
