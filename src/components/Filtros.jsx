import React, { useState, useEffect } from "react";
import { supabase } from '../supabaseClient';

export default function Filtros({ filtro, setFiltro }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const { data, error } = await supabase.from("collections").select("name").neq("is_empty", true);
    if (error) console.error(error);
    else setCategories(data.map(cat => cat.name).sort());
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-start mb-6">
      <select
        value={filtro.categoria}
        onChange={(e) =>
          setFiltro((prev) => ({ ...prev, categoria: e.target.value }))
        }
        className="rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Todas las categorías</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        value={filtro.nuevo === null ? "" : filtro.nuevo ? "nuevo" : "usado"}
        onChange={(e) => {
          const value = e.target.value;
          setFiltro((prev) => ({
            ...prev,
            nuevo: value === "" ? null : value === "nuevo",
          }));
        }}
        className="rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Todos</option>
        <option value="nuevo">Nuevos</option>
        <option value="usado">Existentes</option>
      </select>

      <select
        value={filtro.anio}
        onChange={(e) =>
          setFiltro((prev) => ({ ...prev, anio: e.target.value }))
        }
        className="rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Año</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
      </select>
    </div>
  );
}
