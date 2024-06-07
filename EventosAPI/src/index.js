const express = require("express");
const cors = require("cors");
const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
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
        nombreResponsable,
        responsableId,
        totalSellos,
        ubicacionData,
        capacidad,
    } = req.body;

    try {
        // Crear la nueva ubicación
        const nuevoUbicacion = await prisma.ubicacion.create({
            data: ubicacionData,
        });

        // Crear la nueva solicitud con el responsableId correcto
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
                nombreResponsable,
                responsableId, // Se usa responsableId en vez de responsable
                totalSellos,
                capacidad,
                ubicacionId: nuevoUbicacion.id,
            },
        });

        res.json(nuevaSolicitud);
    } catch (error) {
        console.error("Error al crear la solicitud: ", error);
        res.status(500).json({ error: "Error al crear la solicitud" });
    }
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
        include: {
            tipoUsuario: true,
        },
    });

    if (usuario) {
        if (
            correoIngresado === usuario.correo &&
            contrasenaIngresada === usuario.contrasena
        ) {
            res.json({ status: "200", usuario });
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

app.get("/usuarios/:id/eventos", async (req, res) => {
    const { id } = req.params;

    try {
        const eventos = await prisma.evento.findMany({
            where: {
                solicitud: {
                    responsableId: parseInt(id),
                },
            },
            include: {
                solicitud: {
                    include: {
                        ubicacion: true,
                    },
                },
            },
        });

        res.json(eventos);
    } catch (error) {
        console.error("Error al obtener los eventos del usuario:", error);
        res.status(500).json({
            error: "Error al obtener los eventos del usuario",
        });
    }
});

app.put("/eventos/:id", async (req, res) => {
    const { id } = req.params;
    const {
        ubicacionId,
        responsableId,
        nombreResponsable,
        nombre,
        descripcion,
        fecha,
        valorEnCreditos,
        horaInicio,
        horaFin,
        totalSellos,
        modalidad,
        estado,
        capacidad,
        fechaCreacion,
        notas,
        mensaje,
        recordatorio,
        ubicacion,
    } = req.body;

    try {
        const eventoActualizado = await prisma.evento.update({
            where: { id: Number(id) },
            data: {
                solicitud: {
                    update: {
                        ubicacionId,
                        responsableId,
                        nombreResponsable,
                        nombre,
                        descripcion,
                        fecha,
                        valorEnCreditos,
                        horaInicio,
                        horaFin,
                        totalSellos,
                        modalidad,
                        estado,
                        capacidad,
                        fechaCreacion,
                        notas,
                        mensaje,
                        recordatorio,
                    },
                },
            },
            include: {
                solicitud: {
                    include: {
                        ubicacion: true,
                    },
                },
            },
        });

        res.json(eventoActualizado);
    } catch (error) {
        console.error("Error al actualizar el evento:", error);
        res.status(500).json({ error: "Error al actualizar el evento" });
    }
});

app.delete("/eventos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const evento = await prisma.evento.delete({
            where: { id: Number(id) },
        });
        res.json({ message: "Evento eliminado", evento });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el evento" });
    }
});

app.get("/eventos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const evento = await prisma.evento.findUnique({
            where: { id: Number(id) },
            include: {
                solicitud: {
                    include: {
                        ubicacion: true,
                    },
                },
            },
        });
        if (!evento) {
            return res.status(404).json({ error: "Evento no encontrado" });
        }
        res.json(evento);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al obtener los detalles del evento",
        });
    }
});

app.get("/usuario", async (req, res) => {
    try {
        const userId = req.user.id;
        const usuario = await prisma.usuario.findUnique({
            where: {
                id: userId,
            },
        });
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany({
            include: {
                tipoUsuario: true,
                notificaciones: true,
            },
        });
        res.json(usuarios);
    } catch (error) {
        console.error("Error al obtener los usuarios: ", error);
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
});

// Obtener todos los usuarios con el rol "Encargado"
app.get("/usuarios/encargados", (req, res) => {
    prisma.usuario
        .findMany({
            where: {
                idTipoUsuario: 3,
            },
        })
        .then((encargados) => {
            res.json(encargados);
        })
        .catch((error) => {
            console.error("Error al obtener los usuarios encargados: ", error);
            res.status(500).json({
                error: "Error al obtener los usuarios encargados",
            });
        });
});

app.get("/usuarios/:id/solicitudes", async (req, res) => {
    const { id } = req.params;

    try {
        const solicitudes = await prisma.solicitud.findMany({
            where: {
                responsableId: parseInt(id),
            },
            include: {
                ubicacion: true,
                evento: true, // Incluye la relación evento si es relevante
            },
        });

        res.json(solicitudes);
    } catch (error) {
        console.error("Error al obtener las solicitudes del usuario: ", error);
        res.status(500).json({
            error: "Error al obtener las solicitudes del usuario",
        });
    }
});

// Crear una nueva notificación
app.post("/notificaciones", (req, res) => {
    const { usuarioId, mensaje, leida } = req.body;

    prisma.notificacion
        .create({
            data: {
                usuarioId,
                mensaje,
                leida,
            },
        })
        .then((nuevaNotificacion) => {
            res.status(201).json(nuevaNotificacion);
        })
        .catch((error) => {
            console.error("Error al crear la notificación: ", error);
            res.status(500).json({ error: "Error al crear la notificación" });
        });
});

// Obtener todas las notificaciones
app.get("/notificaciones", async (req, res) => {
    try {
        const notificaciones = await prisma.notificacion.findMany();
        res.json(notificaciones);
    } catch (error) {
        console.error("Error al obtener las notificaciones: ", error);
        res.status(500).json({ error: "Error al obtener las notificaciones" });
    }
});

// Obtener todas las notificaciones de un usuario
app.get("/usuarios/:usuarioId/notificaciones", async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const notificaciones = await prisma.notificacion.findMany({
            where: {
                usuarioId: parseInt(usuarioId),
            },
        });
        res.json(notificaciones);
    } catch (error) {
        console.error("Error al obtener las notificaciones: ", error);
        res.status(500).json({ error: "Error al obtener las notificaciones" });
    }
});

// Actualizar una notificación
app.put("/notificaciones/:id", async (req, res) => {
    const { id } = req.params;
    const { usuarioId, mensaje, leida } = req.body;

    try {
        const notificacionActualizada = await prisma.notificacion.update({
            where: { id: Number(id) },
            data: { usuarioId, mensaje, leida },
        });
        res.json(notificacionActualizada);
    } catch (error) {
        console.error("Error al actualizar la notificación: ", error);
        res.status(500).json({ error: "Error al actualizar la notificación" });
    }
});

// Eliminar una notificación
app.delete("/notificaciones/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const notificacionEliminada = await prisma.notificacion.delete({
            where: { id: Number(id) },
        });
        res.json({
            message: "Notificación eliminada",
            notificacion: notificacionEliminada,
        });
    } catch (error) {
        console.error("Error al eliminar la notificación: ", error);
        res.status(500).json({ error: "Error al eliminar la notificación" });
    }
});

app.post("/asistencias", async (req, res) => {
    const { usuarioId, eventoId } = req.body;

    try {
        const asistencia = await prisma.asistencia.create({
            data: {
                usuario: { connect: { id: usuarioId } },
                evento: { connect: { id: eventoId } },
            },
        });

        res.json(asistencia);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar la asistencia" });
    }
});

app.delete("/asistencias", async (req, res) => {
    const { usuarioId, eventoId } = req.body;

    try {
        await prisma.asistencia.delete({
            where: {
                usuarioId_eventoId: {
                    usuarioId: parseInt(usuarioId),
                    eventoId: parseInt(eventoId),
                },
            },
        });

        res.json({ message: "Asistencia eliminada correctamente" });
    } catch (error) {
        console.error("Error en el servidor al cancelar la asistencia:", error);
        res.status(500).json({
            error: "Error al cancelar la asistencia",
            details: error.message,
        });
    }
});

app.get("/eventos/:eventoId", async (req, res) => {
    const { eventoId } = req.params;

    try {
        const evento = await prisma.evento.findUnique({
            where: { id: parseInt(eventoId) },
        });

        if (!evento) {
            return res.status(404).json({ error: "Evento no encontrado" });
        }

        res.json(evento);
    } catch (error) {
        console.error("Error al obtener el evento:", error);
        res.status(500).json({ error: "Error al obtener el evento" });
    }
});

app.get("/asistencias", async (req, res) => {
    const { usuarioId, eventoId } = req.query;

    try {
        const asistencia = await prisma.asistencia.findFirst({
            where: {
                usuarioId: parseInt(usuarioId),
                eventoId: parseInt(eventoId),
            },
        });

        res.json({ exists: !!asistencia }); // Devuelve true si existe asistencia, false si no existe
    } catch (error) {
        console.error("Error al obtener asistencias:", error);
        res.status(500).json({ error: "Error al obtener asistencias" });
    }
});

app.get("/eventos/:eventId/asistencia/:usuarioId", async (req,res) => {
    const {eventoId, usuarioId} = req.params

    const evento = await prisma.evento.findUnique({
        where:{
            id: parseInt(eventoId)
        },
        include:{
            asistencias:{
                where:{
                    usuarioId: parseInt(usuarioId)
                }
            }
        }
    });
    if (evento && evento.asistencias.length > 0) {
        res.json(true);
    } else {
        res.json(false);
    }
});

app.get("/usuarios/:usuarioId/eventos-asistidos", async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const eventos = await prisma.evento.findMany({
            where: {
                asistencia: {
                    some: {
                        usuarioId: parseInt(usuarioId),
                    },
                },
            },
            include: {
                solicitud: {
                    include: {
                        ubicacion: true,
                    },
                },
            },
        });

        res.json(eventos);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al obtener los eventos del usuario",
        });
    }
});

app.get("/eventos/:eventoId/usuarios", async (req, res) => {
    const { eventoId } = req.params;

    try {
        const usuarios = await prisma.usuario.findMany({
            where: {
                asistencia: {
                    some: {
                        eventoId: parseInt(eventoId),
                    },
                },
            },
        });

        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al obtener los usuarios del evento",
        });
    }
});

