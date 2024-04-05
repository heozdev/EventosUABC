const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.listen(3000, (error) => {
    if (error) console.log(error);

    console.log("Servidor corriendo en el puerto 3000");
});

app.get("/solicitudes", async (req, res) => {
    const solicitudes = await prisma.solicitud.findMany();
    res.json(solicitudes);
});

app.post("/solicitudes", async (req, res) => {
    const {
        nombre,
        descripcion,
        fecha,
        modalidad,
        horaInicio,
        horaFin,
        valorEnCreditos,
        estado,
        responsable,
        totalSellos,
        ubicacionData,
    } = req.body;

    const nuevoUbicacion = await prisma.ubicacion.create({
        data: ubicacionData,
    });

    const nuevaSolicitud = await prisma.solicitud.create({
        data: {
            nombre,
            descripcion,
            fecha,
            modalidad,
            horaInicio,
            horaFin,
            valorEnCreditos,
            estado,
            responsable,
            totalSellos,
            ubicacionId: nuevoUbicacion.id,
        },
    });

    res.json(nuevaSolicitud);
});

app.put("/solicitudes/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    const solicitud = await prisma.solicitud.update({
        where: { id: Number(id) },
        data: { estado },
    });

    res.json(solicitud);
});

app.delete(`/solicitud/:id`, async (req, res) => {
    const { id } = req.params;

    const solicitud = await prisma.solicitud.delete({
        where: {
            id: Number(id),
        },
    });

    res.json(solicitud);
});
