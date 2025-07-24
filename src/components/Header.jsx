import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [menuAbierto, setMenuAbierto] = useState(false);

    const links = [
        { texto: "Mi colección", href: "#coleccion" },
        { texto: "Favoritos", href: "#favoritos" },
        { texto: "Años", href: "#años" },
    ];

    return (
        <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">🚗 Mi Garage Hot Wheels</h1>

                <nav className="hidden md:flex gap-6">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                        >
                            {link.texto}
                        </a>
                    ))}
                </nav>

                {/* Menú móvil */}
                <button
                    className="md:hidden text-gray-700 dark:text-gray-200"
                    onClick={() => setMenuAbierto(!menuAbierto)}
                >
                    {menuAbierto ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Menú desplegable en móvil */}
            {menuAbierto && (
                <div className="md:hidden bg-white dark:bg-gray-800 px-4 pb-4">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                            onClick={() => setMenuAbierto(false)}
                        >
                            {link.texto}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
}
