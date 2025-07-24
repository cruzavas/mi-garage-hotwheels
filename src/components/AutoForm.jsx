import React, { useState } from "react";
import { supabase } from '../supabaseClient';

export default function AutoForm({ onNuevoAuto }) {
  const [auto, setAuto] = useState({
    codigo: "",
    numero: "",
    modelo: "",
    categoria: "",
    serie: "",
    imagen: "",
    coleccion: {
      nombre: "",
      tipo: "",
      nuevo: false,
    },
    anio: "",
  });

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("coleccion.")) {
      const key = name.split(".")[1];
      setAuto((prev) => ({
        ...prev,
        coleccion: {
          ...prev.coleccion,
          [key]: type === "checkbox" ? checked : value,
        },
      }));
    } else if (name === "anio") {
      setAuto((prev) => ({
        ...prev,
        [name]: value ? parseInt(value, 10) : "",
      }));
    } else {
      setAuto((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("autos").insert([auto]);
    if (error) {
      console.error(error);
      alert("Error al agregar el auto.");
    } else {
      setAuto({
        codigo: "",
        numero: "",
        modelo: "",
        categoria: "",
        serie: "",
        imagen: "",
        coleccion: { nombre: "", tipo: "", nuevo: false },
      });
      onNuevoAuto();
    }
  };

  return (
    <form
      onSubmit={manejarSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Agregar nuevo auto</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="input"
          name="codigo"
          placeholder="Código"
          value={auto.codigo}
          onChange={manejarCambio}
          required
        />
        <input
          className="input"
          name="numero"
          placeholder="Número"
          value={auto.numero}
          onChange={manejarCambio}
          required
        />
        <input
          className="input"
          name="modelo"
          placeholder="Modelo"
          value={auto.modelo}
          onChange={manejarCambio}
          required
        />
        <input
          className="input"
          name="categoria"
          placeholder="Categoría"
          value={auto.categoria}
          onChange={manejarCambio}
        />
        <input
          className="input"
          name="serie"
          placeholder="Serie"
          value={auto.serie}
          onChange={manejarCambio}
        />
        <input
          className="input"
          name="imagen"
          placeholder="URL de imagen"
          value={auto.imagen}
          onChange={manejarCambio}
        />
        <input
          className="input"
          name="coleccion.nombre"
          placeholder="Colección"
          value={auto.coleccion.nombre}
          onChange={manejarCambio}
        />
        <input
          className="input"
          name="coleccion.tipo"
          placeholder="Tipo colección"
          value={auto.coleccion.tipo}
          onChange={manejarCambio}
        />
        <input
          type="input"
          value={auto.anio}
          onChange={manejarCambio}
          className="w-full border px-3 py-2 rounded"
          placeholder="2024"
        />
      </div>

      <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
        <input
          type="checkbox"
          name="coleccion.nuevo"
          checked={auto.coleccion.nuevo}
          onChange={manejarCambio}
        />
        <span>¿Es nuevo?</span>
      </label>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Guardar
      </button>
    </form>
  );
}
