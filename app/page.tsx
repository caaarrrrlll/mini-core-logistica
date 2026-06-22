'use client';
import { useState } from 'react';

type Resultado = {
  nombre: string;
  cantidadEnvios: number;
  totalKg: string;
  zona: string;
  tarifa: string;
  costoTotal: string;
};

export default function Home() {
  const [fechaInicio, setFechaInicio] = useState('2025-05-01');
  const [fechaFin, setFechaFin] = useState('2025-05-31');
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [cargando, setCargando] = useState(false);

  const consultarCostos = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    
    try {
      const res = await fetch(`/api/calculo?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
      const data = await res.json();
      setResultados(data);
    } catch (error) {
      console.error("Error al consultar", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="min-h-screen p-10 bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Sistema de Logística - Mini Core MVC</h1>
        
        {/* Formulario (View) */}
        <form onSubmit={consultarCostos} className="bg-white p-6 rounded-lg shadow-md flex gap-4 items-end mb-8">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Fecha Inicio</label>
            <input 
              type="date" 
              value={fechaInicio} 
              onChange={(e) => setFechaInicio(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Fecha Fin</label>
            <input 
              type="date" 
              value={fechaFin} 
              onChange={(e) => setFechaFin(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            {cargando ? 'Calculando...' : 'Filtrar'}
          </button>
        </form>

        {/* Tabla de Resultados (View) */}
        {resultados.length > 0 && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 border-b">Repartidor</th>
                  <th className="p-4 border-b">Envíos</th>
                  <th className="p-4 border-b">Total kg</th>
                  <th className="p-4 border-b">Zona</th>
                  <th className="p-4 border-b">Tarifa/kg</th>
                  <th className="p-4 border-b text-right">Costo Total</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((rep, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-4 border-b font-medium">{rep.nombre}</td>
                    <td className="p-4 border-b">{rep.cantidadEnvios}</td>
                    <td className="p-4 border-b">{rep.totalKg}</td>
                    <td className="p-4 border-b">{rep.zona}</td>
                    <td className="p-4 border-b">{rep.tarifa}</td>
                    <td className="p-4 border-b text-right font-bold text-green-600">{rep.costoTotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}