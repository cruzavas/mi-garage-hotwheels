import React from "react";

export default function AutoCardSkeleton() {
    return (
        <div className="rounded-2xl shadow p-4 bg-white dark:bg-gray-800 animate-pulse">
            <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded-xl mb-4" />

            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-3/4" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-1/2" />

            <div className="flex justify-between mt-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4" />
            </div>
        </div>
    );
};