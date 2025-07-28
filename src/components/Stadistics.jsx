import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from '../supabaseClient';

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c", "#d0ed57"];

export default function Stadistics() {
    const [autos, setAutos] = useState([]);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        const { data, error } = await supabase.from("autos").select("*");
        if (error) console.error(error);
        else setAutos(data);
    };

    const contarPor = (keyFn) => {
        const map = {};
        autos.forEach((a) => {
            const key = keyFn(a);
            map[key] = (map[key] || 0) + 1;
        });
        return Object.entries(map).map(([name, value]) => ({ name, value }));
    };

    const categorias = contarPor((a) => a.categoria);
    const colecciones = contarPor((a) => a.coleccion.nombre);
    const porAnio = contarPor((a) => a.anio || "Desconocido");

    return (
        <div className="container mx-auto p-4">
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Estadísticas del Garage</h2>
                <p className="mb-4">Total de autos: {autos.length}</p>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-semibold mb-2">Por Categoría</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={categorias} dataKey="value" nameKey="name" outerRadius={100} label>
                                    {categorias.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Top Colecciones</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={colecciones}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="md:col-span-2">
                        <h3 className="font-semibold mb-2">Por Año de Lanzamiento</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={porAnio}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
