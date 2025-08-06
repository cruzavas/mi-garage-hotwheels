import React, { useEffect, useState } from "react";
import { supabase } from '../supabaseClient';
import AutoCard from "./AutoCard";
import AutoModal from "./AutoModal";
import AutoCardSkeleton from "./AutoCardSkeleton";

export default function Favoritos() {
    const [autos, setAutos] = useState([]);
    const [autoSeleccionado, setAutoSeleccionado] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarFavoritos();
    }, []);

    const cargarFavoritos = async () => {
        setCargando(true);
        const { data, error } = await supabase.from("autos").select("*").eq("favorito", true);
        if (error) console.error(error);
        else setAutos(data);
        setCargando(false);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">⭐ Mis Favoritos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {cargando
                    ? Array.from({ length: 10 }).map((_, i) => <AutoCardSkeleton key={i} />)
                    : autos.map((auto) => (
                        <AutoCard key={auto.codigo} auto={auto} onClick={setAutoSeleccionado} />
                    ))}
            </div>
            <AutoModal auto={autoSeleccionado} onClose={() => setAutoSeleccionado(null)} />
        </div>
    );
}
