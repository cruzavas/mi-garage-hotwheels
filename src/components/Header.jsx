import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

export default function Header({ activo, setActivo }) {
    const [menuAbierto, setMenuAbierto] = useState(false);

    const links = [
        { texto: "Mi colección", href: "home" },
        { texto: "Estadísticas", href: "estadisticas" },
        { texto: "Favoritos", href: "favoritos" },
    ];

    return (
        <header className="bg-blue-700 dark:bg-blue-900 text-white shadow-md sticky top-0 z-50">
            {/*bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">*/}
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-wide">🚗 Mi Garage Hot Wheels</h1>
                {/* text-xl font-bold text-gray-800 dark:text-white */}
                <nav className="hidden md:flex gap-6 items-center">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-white dark:text-gray-200 hover:text-blue-200 dark:hover:text-blue-400 transition"
                        >
                            {link.texto}
                        </a>
                    ))}
                    <DarkModeToggle activo={activo} setActivo={setActivo} />
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
