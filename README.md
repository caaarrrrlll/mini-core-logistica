# Sistema de Logística - Mini Core MVC

Este proyecto es una pequeña aplicación funcional (Mini Core) que resuelve un problema de logística: calcular el costo total de envíos por repartidor dentro de un rango de fechas. El sistema filtra los registros exclusivamente por **Fecha de Inicio** y **Fecha Fin**, calculando el total según la tarifa de la zona de entrega.

## Patrón MVC Utilizado
Se implementó el framework **Next.js** en conjunto con **Prisma ORM** y **SQLite** para cumplir con la arquitectura Modelo-Vista-Controlador (MVC):
* **Modelo (Model):** Definido en `prisma/schema.prisma` y gestionado mediante Prisma Client contra una base de datos local SQLite.
* **Controlador (Controller):** Implementado en un Route Handler de Next.js (`app/api/calculo/route.ts`), encargado de recibir los parámetros de fecha, consultar al modelo y procesar la lógica matemática.
* **Vista (View):** Construida con React (`app/page.tsx`), presentando un formulario limpio de filtrado de fechas y la tabla de resultados.

## 📹 Video Explicativo
(https://youtu.be/AhXIy5OKsQ8)](https://youtu.be/AhXIy5OKsQ8)

## 🚀 Instrucciones para correrlo localmente

1. Clonar este repositorio:
   ```bash
   git clone [https://github.com/caaarrrrlll/mini-core-logistica.git](https://github.com/caaarrrrlll/mini-core-logistica.git)

   Instalar las dependencias:

Bash
npm install
Generar el cliente de Prisma:

Bash
npx prisma generate
Iniciar el servidor de desarrollo:

Bash
npm run dev
