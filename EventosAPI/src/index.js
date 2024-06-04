const express = require("express");
const cors = require('cors');
const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

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



app.use(express.urlencoded({ extended: true }));

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
    const { estado, notas, mensaje } = req.body;

    const solicitud = await prisma.solicitud.update({
        where: { id: Number(id) },
        data: { estado, notas, mensaje },
    });

    res.json(solicitud);
});

app.put("/solicitudes/:id/recordatorio", async (req, res) => {
    const { id } = req.params;

    const solicitud = await prisma.solicitud.update({
        where: { id: Number(id) },

        data: {
            recordatorio: {
                increment: 1,
            },
        },
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

app.post("/auth", async (req, res) => {
    const { correo: correoIngresado, contrasena: contrasenaIngresada } =
        await req.body;

    const usuario = await prisma.usuario.findFirst({
        where: {
            correo: correoIngresado,
        },
    });

    if (usuario) {
        if (
            correoIngresado === usuario.correo &&
            contrasenaIngresada === usuario.contrasena
        ) {
            const rol = await prisma.tipoDeUsuario.findUnique({
                where: {
                    IdTipoUsuario: usuario.idTipoUsuario,
                },
            });

            res.json({ status: "200", rol: rol.rol });
        }

        if (
            correoIngresado === usuario.correo &&
            contrasenaIngresada != usuario.contrasena
        ) {
            res.json({
                status: "404",
                mensaje: "Contrasena incorrecta, intentelo de nuevo.",
            });
        }
    } else {
        res.json({
            status: "404",
            mensaje: "Usuario no encontrado, intentelo de nuevo.",
        });
    }
});

app.put("/usuario/:correo", async (req, resp) => {
    const { correo: correoUsuario } = req.params;
    const { contrasena: contrasenaUsuario } = req.body;

    try {
        await prisma.usuario.update({
            where: {
                correo: correoUsuario,
            },

            data: {
                contrasena: contrasenaUsuario,
            },
        });

        resp.json({
            status: 200,
            mensaje: "Contraseña actualizada correctamente",
        });
    } catch (e) {
        if (
            e instanceof Prisma.PrismaClientKnownRequestError &&
            e.code === "P2025"
        ) {
            resp.json({ status: 404, mensaje: "Usuario no encontrado." });
        }
    }
});

//Asi no es la sintaxis para crear un endpoint
app.post("/evento", async (req, res) => {
    const { estado, solicitudId } = req.body;

    try {
        const nuevoEvento = await prisma.evento.create({
            data: {
                solicitudId,
                estado,
            },
        });

        res.json(nuevoEvento);
    } catch (error) {
        console.error("Error al crear el evento: ", error);
        throw error;
    }
});

app.get("/eventos", async (req, res) => {
    const eventos = await prisma.evento.findMany({
        include: {
            solicitud: {
                include: {
                    ubicacion: true,
                },
            },
        },
    });

    res.json(eventos);
});

app.delete('/eventos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const evento = await prisma.evento.delete({
            where: { id: Number(id) }
        });
        res.json({ message: 'Evento eliminado', evento });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el evento' });
    }
});

app.get('/usuario', async (req, res) => {
    try {
        const userId = req.user.id; // Suponiendo que has configurado middleware para extraer el ID del usuario del token de autenticación
        const usuario = await prisma.usuario.findUnique({
            where: {
                id: userId,
            },
        });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
