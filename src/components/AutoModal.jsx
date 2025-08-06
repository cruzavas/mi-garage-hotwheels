import React from "react";
import { Tag, Calendar, Star, Package } from "lucide-react";

export default function AutoModal({ auto, onClose }) {
    if (!auto) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md relative shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                >
                    ✕
                </button>

                <img
                    src={auto.imagen}
                    alt={auto.modelo}
                    className="w-full h-64 object-cover rounded-lg shadow-xl ring-2 ring-indigo-500 mb-4"
                />

                <h2 className="text-2xl font-bold mb-2">{auto.modelo}</h2>

                <div className="flex flex-wrap gap-2 mb-4">
                    {auto.coleccion?.nuevo && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            Nuevo
                        </span>
                    )}
                    {auto.favorito && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            ⭐ Favorito
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <p className="flex items-center gap-2"><Tag className="w-4 h-4" /> Código: {auto.codigo}</p>
                    <p className="flex items-center gap-2"><Package className="w-4 h-4" /> Serie: {auto.serie}</p>
                    {auto.anio && (
                        <p className="flex items-center gap-2 col-span-2">
                            <Calendar className="w-4 h-4" /> Año: {auto.anio}
                        </p>
                    )}
                    <p className="flex items-center gap-2 col-span-2">
                        <Tag className="w-4 h-4" /> Categoría: {auto.categoria}
                    </p>
                    <p className="col-span-2"><strong>Colección:</strong> {auto.coleccion?.nombre}</p>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
