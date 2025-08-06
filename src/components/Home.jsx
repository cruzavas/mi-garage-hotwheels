import React, { useState, useEffect } from "react";
import { supabase } from '../supabaseClient';
import AutoCard from "./AutoCard";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import AutoModal from "./AutoModal";
import AutoCardSkeleton from "./AutoCardSkeleton";
// import AutoForm from "./AutoForm";

export default function Home() {
    const [autos, setAutos] = useState([]);
    const [filtro, setFiltro] = useState({ categoria: "", nuevo: null, anio: "" });
    const [busqueda, setBusqueda] = useState("");
    const [autoSeleccionado, setAutoSeleccionado] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarAutos();
    }, []);

    const cargarAutos = async () => {
        setCargando(true);
        const { data, error } = await supabase.from("autos").select("*").neq("sold", true);
        if (error) console.error(error);
        else setAutos(data);
        setCargando(false);
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
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <SearchBar busqueda={busqueda} setBusqueda={setBusqueda} />
            </div>
            <Filters filtro={filtro} setFiltro={setFiltro} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                {cargando
                    ? Array.from({ length: 10 }).map((_, i) => <AutoCardSkeleton key={i} />)
                    : filtrarAutos().map((auto) => (
                        <AutoCard key={auto.codigo} auto={auto} onClick={setAutoSeleccionado} />
                    ))}
            </div>
            <AutoModal auto={autoSeleccionado} onClose={() => setAutoSeleccionado(null)} />
            {/* <div className="mt-8">
                  <AutoForm onNuevoAuto={cargarAutos} />
                </div> */}
        </div>
    );
}