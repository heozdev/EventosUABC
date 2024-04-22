const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(express.json());
app.listen(3000, (error) => {
    if (error) console.log(error);

    console.log("Servidor corriendo en el puerto 3000");
});

app.get("/solicitudes", async (req, res) => {
    const solicitudes = await prisma.solicitud.findMany({
        include: {
            ubicacion: true,
        },
    });
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
        capacidad,
    } = req.body;

   
    // if (!nombre) {
    //   return res.status(400).json({ error: "Missing 'nombre' field" });
    // }
    // if (!descripcion) {
    //   return res.status(400).json({ error: "Missing 'descripcion' field" });
    // }
    // if (!fecha) {
    //   return res.status(400).json({ error: "Missing 'fecha' field" });
    // }
    // if (!modalidad) {
    //   return res.status(400).json({ error: "Missing 'modalidad' field" });
    // }
    // if (!horaInicio) {
    //   return res.status(400).json({ error: "Missing 'horaInicio' field" });
    // }
    // if (!horaFin) {
    //   return res.status(400).json({ error: "Missing 'horaFin' field" });
    // }
    // if (valorEnCreditos === undefined || valorEnCreditos === null) {
    //   return res.status(400).json({ error: "Missing 'valorEnCreditos' field" });
    // }
    // if (!estado) {
    //   return res.status(400).json({ error: "Missing 'estado' field" });
    // }
    // if (!responsable) {
    //   return res.status(400).json({ error: "Missing 'responsable' field" });
    // }
    // if (!totalSellos) {
    //   return res.status(400).json({ error: "Missing 'totalSellos' field" });
    // }
    // if (!ubicacionData) {
    //   return res.status(400).json({ error: "Missing 'ubicacionData' field" });
    // }
    // if (!capacidad) {
    //   return res.status(400).json({ error: "Missing 'capacidad' field" });
    // }

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
            capacidad,
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