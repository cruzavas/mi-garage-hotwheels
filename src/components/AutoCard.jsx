import React from "react";
import { Trash2 } from "lucide-react";

export default function AutoCard({ auto, onDelete }) {
  const { codigo, modelo, categoria, serie, imagen, coleccion } = auto;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 flex flex-col items-center transition hover:scale-105 hover:shadow-xl">
      <img
        src={imagen}
        alt={modelo}
        className="w-48 h-48 object-contain mb-4 rounded-lg"
      />
      <div className="text-center w-full">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {modelo}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{categoria}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{serie}</p>

        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {coleccion?.nuevo && (
            <span className="new-badge text-xs px-2 py-1 rounded-full">
              New
            </span>
          )}
          {coleccion?.nombre && (
            <span className={`text-xs px-2 py-1 rounded-full collection-color ${coleccion.tipo}`}>
              {coleccion.nombre}
            </span>
          )}
        </div>

        {/*  <button
          onClick={() => onDelete(codigo)}
          className="mt-4 inline-flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition"
        >
          <Trash2 className="w-4 h-4" />
          Eliminar
        </button> */}
      </div>
    </div>
  );
}
