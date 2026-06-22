import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fechaInicio = searchParams.get('fechaInicio');
  const fechaFin = searchParams.get('fechaFin');

  if (!fechaInicio || !fechaFin) {
    return NextResponse.json({ error: 'Faltan fechas' }, { status: 400 });
  }

  // Filtrar por rango de fechas
  const repartidores = await prisma.repartidor.findMany({
    include: {
      envios: {
        where: {
          fecha_envio: {
            gte: new Date(fechaInicio),
            lte: new Date(fechaFin),
          }
        },
        include: { zona: true }
      }
    }
  });

  // Lógica del cálculo (peso_kg × tarifa_por_kg)
  const resultado = repartidores.map((rep: any) => {
    let totalKg = 0;
    let costoTotal = 0;
    const zonas = new Set<string>();
    const tarifas = new Set<number>();

    rep.envios.forEach((envio: any) => {
      totalKg += envio.peso_kg;
      costoTotal += (envio.peso_kg * envio.zona.tarifa_por_kg);
      zonas.add(envio.zona.nombre_zona);
      tarifas.add(envio.zona.tarifa_por_kg);
    });

    return {
      nombre: rep.nombre,
      cantidadEnvios: rep.envios.length,
      totalKg: totalKg > 0 ? `${totalKg} kg` : '—',
      zona: zonas.size > 1 ? 'Varias' : (Array.from(zonas)[0] || '—'),
      tarifa: tarifas.size > 1 ? 'Varias' : (Array.from(tarifas)[0] ? `$${Array.from(tarifas)[0].toFixed(2)}` : '—'),
      costoTotal: costoTotal > 0 ? `$${costoTotal.toFixed(2)}` : 'No aplica'
    };
  });

  return NextResponse.json(resultado);
}
