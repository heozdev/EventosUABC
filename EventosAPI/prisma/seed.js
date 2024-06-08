const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const roles = [
    {
        rol: "Profesor",
    },
    {
        rol: "Alumno",
    },
    {
        rol: "Encargado",
    },
];

const tiposDeNotificacion = [
    { tipoDeNotificacion: "Registrarse a un evento" },
    { tipoDeNotificacion: "Cancelar un evento" },
    { tipoDeNotificacion: "Invitacion a un evento" },
    { tipoDeNotificacion: "Cancelar tu asistencia a un evento" },
    { tipoDeNotificacion: "Modificacion de un evento" },
];

const usuarios = [
    {
        correo: "hosuna2900@gmail.com",
        contrasena: "hosuna2900",
        idTipoUsuario: 1,
        matricula: 1183231,
        nombres: "Hector Eduardo",
        apellidos: "Osuna",
        carrera: "Lic. en Sistemas",
        facultad: "Facultad de Ingeniería",
    },
    {
        correo: "leo.canett@gmail.com",
        contrasena: "leo.canett",
        idTipoUsuario: 2,
        matricula: 1183233,
        nombres: "Leonardo Javier",
        apellidos: "Canett Gómez",
        carrera: "Lic. en Arquitectura",
        facultad: "Facultad de Arquitectura",
    },
    {
        correo: "alberto.guevara@gmail.com",
        contrasena: "alberto.guevara",
        idTipoUsuario: 3,
        matricula: 1183235,
        nombres: "Alberto",
        apellidos: "Guevara",
        carrera: "Lic. en Derecho",
        facultad: "Facultad de Derecho",
    },
];

const solicitudes = [
    {
        ubicacion: {
            create: {
                facultad: "Facultad de Ciencias Sociales",
                estado: "Baja California",
                campus: "Campus Tijuana",
                ciudad: "Tijuana",
                direccion: "Calle de la universidad 456",
                aula: "Salón de conferencias A",
            },
        },
        nombre: "Charla sobre historia contemporánea",
        descripcion:
            "Charla abierta al público sobre los eventos históricos más relevantes del siglo XX.",
        fecha: "2024-05-20T11:00:00Z",
        valorEnCreditos: false,
        horaInicio: "2024-05-20T11:00:00Z",
        horaFin: "2024-05-20T13:00:00Z",
        totalSellos: 1,
        modalidad: "Presencial",
        estado: "Pendiente",
        capacidad: 20,
        responsable: "hosuna2900@gmail.com",
    },
    {
        ubicacion: {
            create: {
                facultad: "Ingeniería",
                estado: "Baja California",
                campus: "Mexicali",
                ciudad: "Mexicali",
                direccion: "Av Benito Juarez",
                aula: "Aula Magna",
            },
        },
        nombre: "Platica sobre Inteligencia Artificial",
        descripcion:
            "Se hablara sobre la evolución que ha tenido la IA a lo largo de los años",
        fecha: "2024-06-07T00:00:00Z",
        valorEnCreditos: true,
        horaInicio: "2024-06-07T15:00:00Z",
        horaFin: "2024-06-07T16:00:00Z",
        totalSellos: 3,
        modalidad: "Presencial",
        estado: "Pendiente",
        capacidad: 150,
        responsable: "alberto.guevara@gmail.com",
    },
    {
        ubicacion: {
            create: {
                facultad: "Facultad de Artes",
                estado: "Baja California",
                campus: "Campus Ensenada",
                ciudad: "Ensenada",
                direccion: "Calle de la universidad 789",
                aula: "Auditorio Principal",
            },
        },
        nombre: "Concierto de música clásica",
        descripcion:
            "Concierto de la orquesta sinfónica de la universidad interpretando obras clásicas de renombrados compositores.",
        fecha: "2024-06-10T19:00:00Z",
        valorEnCreditos: true,
        horaInicio: "2024-06-10T19:00:00Z",
        horaFin: "2024-06-10T21:00:00Z",
        totalSellos: 3,
        modalidad: "Presencial",
        estado: "Pendiente",
        capacidad: 20,
        responsable: "leo.canett@gmail.com",
    },
];

async function main() {
    console.log(`Start seeding ...`);

    for (const r of roles) {
        const rol = await prisma.tipoDeUsuario.create({
            data: r,
        });
        console.log(`Se creó rol con el id: ${rol.IdTipoUsuario}`);
    }

    for (const u of usuarios) {
        try {
            const existingUser = await prisma.usuario.findUnique({
                where: { correo: u.correo },
            });
            if (!existingUser) {
                const usuario = await prisma.usuario.create({
                    data: u,
                });
                console.log(`Se creó usuario con el id: ${usuario.id}`);
            } else {
                console.log(`Usuario con el correo ${u.correo} ya existe.`);
            }
        } catch (e) {
            console.error(`Error al crear usuario con correo ${u.correo}:`, e);
        }
    }

    for (const s of solicitudes) {
        try {
            const responsable = await prisma.usuario.findUnique({
                where: { correo: s.responsable },
            });
            if (responsable) {
                const solicitud = await prisma.solicitud.create({
                    data: {
                        ubicacion: s.ubicacion,
                        nombre: s.nombre,
                        descripcion: s.descripcion,
                        fecha: s.fecha,
                        valorEnCreditos: s.valorEnCreditos,
                        horaInicio: s.horaInicio,
                        horaFin: s.horaFin,
                        totalSellos: s.totalSellos,
                        modalidad: s.modalidad,
                        estado: s.estado,
                        capacidad: s.capacidad,
                        nombreResponsable: responsable.nombres,
                        responsable: { connect: { id: responsable.id } },
                    },
                });
                console.log(`Se creó solicitud con el id: ${solicitud.id}`);
            } else {
                console.log(
                    `Responsable con correo ${s.responsable} no encontrado.`
                );
            }
        } catch (e) {
            console.error(`Error al crear solicitud:`, e);
        }
    }

    for (const tipo of tiposDeNotificacion) {
        try {
            const notificacion = await prisma.tipoDeNotificacion.create({
                data: tipo,
            });
            console.log(
                `Se creó tipo de notificación con el id: ${notificacion.id}`
            );
        } catch (e) {
            console.error(`Error al crear tipo de notificación:`, e);
        }
    }

    console.log(`Seeding finished.`);

    const getSolicitudes = await prisma.solicitud.findMany();
    const getRoles = await prisma.tipoDeUsuario.findMany();
    const getUsuarios = await prisma.usuario.findMany();
    const getTiposDeNotificacion = await prisma.tipoDeNotificacion.findMany();

    console.log(getSolicitudes);
    console.log(getRoles);
    console.log(getUsuarios);
    console.log(getTiposDeNotificacion);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
