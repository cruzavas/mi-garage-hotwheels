import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 text-center text-sm text-gray-600 dark:text-gray-400 py-4 mt-10">
            <p>
                © {new Date().getFullYear()} Mi colección de Hot Wheels 2023-2025.
            </p>
        </footer>
    );
}