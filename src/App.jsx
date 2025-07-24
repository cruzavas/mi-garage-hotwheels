import React, { useState, useEffect } from "react";
import { supabase } from './supabaseClient';
import AutoCard from "./components/AutoCard";
import AutoForm from "./components/AutoForm";
import SearchBar from "./components/SearchBar";
import Filtros from "./components/Filtros";
import DarkModeToggle from "./components/DarkModeToggle";

export default function App() {
  const [autos, setAutos] = useState([]);
  const [filtro, setFiltro] = useState({ categoria: "", nuevo: null, anio: "" });
  const [busqueda, setBusqueda] = useState("");
  const [modoOscuro, setModoOscuro] = useState(false);

  useEffect(() => {
    cargarAutos();
  }, []);

  const cargarAutos = async () => {
    const { data, error } = await supabase.from("autos").select("*").neq("sold", true);
    if (error) console.error(error);
    else setAutos(data);
  };

  const eliminarAuto = async (codigo) => {
    const { error } = await supabase.from("autos").delete().eq("codigo", codigo);
    if (error) console.error(error);
    else cargarAutos();
  };

  const filtrarAutos = () => {
    return autos.filter((auto) => {
      const coincideBusqueda = auto.modelo.toLowerCase().includes(busqueda.toLowerCase());
      const coincideCategoria = !filtro.categoria || auto.coleccion.nombre === filtro.categoria;
      const coincideNuevo = filtro.nuevo === null || auto.coleccion.nuevo === filtro.nuevo;
      const coincideAnio = !filtro.anio || auto.anio?.toString() === filtro.anio;
      return coincideBusqueda && coincideCategoria && coincideNuevo && coincideAnio;
    });
  };

  return (
    <div className={modoOscuro ? "dark bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      <header className="bg-blue-700 dark:bg-blue-900 text-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">🚗 Mi Garage Hot Wheels</h1>
          <DarkModeToggle activo={modoOscuro} setActivo={setModoOscuro} />
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <SearchBar busqueda={busqueda} setBusqueda={setBusqueda} />
        </div>
        <Filtros filtro={filtro} setFiltro={setFiltro} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
          {filtrarAutos().map((auto) => (
            <AutoCard key={auto.codigo} auto={auto} onDelete={eliminarAuto} />
          ))}
        </div>
        {/* <div className="mt-8">
          <AutoForm onNuevoAuto={cargarAutos} />
        </div> */}
      </div>

      <footer className="bg-gray-100 dark:bg-gray-800 text-center text-sm text-gray-600 dark:text-gray-400 py-4 mt-10">
        <p>
          © {new Date().getFullYear()} Mi colección de Hot Wheels 2023-2025.
        </p>
      </footer>
    </div>
  );
}