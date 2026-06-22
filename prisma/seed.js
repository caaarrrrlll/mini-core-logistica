const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Crear Zonas
  const zonaNorte = await prisma.zona.create({ data: { nombre_zona: 'Norte', tarifa_por_kg: 1.50 } });
  const zonaSur = await prisma.zona.create({ data: { nombre_zona: 'Sur', tarifa_por_kg: 2.00 } });

  // Crear Repartidores
  const andres = await prisma.repartidor.create({ data: { nombre: 'Andrés', email: 'andres@udla.edu.ec' } });
  const camila = await prisma.repartidor.create({ data: { nombre: 'Camila', email: 'camila@udla.edu.ec' } });
  const luis = await prisma.repartidor.create({ data: { nombre: 'Luis', email: 'luis@udla.edu.ec' } });

  // Crear Envíos 
  await prisma.envio.createMany({
    data: [
      { id_repartidor: andres.id_repartidor, id_zona: zonaNorte.id_zona, peso_kg: 10, fecha_envio: new Date('2025-05-10') },
      { id_repartidor: andres.id_repartidor, id_zona: zonaNorte.id_zona, peso_kg: 22, fecha_envio: new Date('2025-05-15') },
      { id_repartidor: camila.id_repartidor, id_zona: zonaSur.id_zona, peso_kg: 18, fecha_envio: new Date('2025-05-20') },
    ],
  });

  console.log("Seed completado con éxito.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });