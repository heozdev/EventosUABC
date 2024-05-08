const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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
        responsable: "hector",
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
        responsable: "juan",
    },
];

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

const usuarios = [
    {
        correo: "hosuna2900@gmail.com",
        contrasena: "hosuna2900",
        idTipoUsuario: 1,
    },
    {
        correo: "leo.canett@gmail.com",
        contrasena: "leo.canett",
        idTipoUsuario: 2,
    },
    {
        correo: "alberto.guevara@gmail.com",
        contrasena: "alberto.guevara",
        idTipoUsuario: 3,
    },
];

async function main() {
    console.log(`Start seeding ...`);

    for (const s of solicitudes) {
        const solicitud = await prisma.solicitud.create({
            data: s,
        });
        console.log(`Se creo solicitud con el id: ${solicitud.id}`);
    }

    for (const r of roles) {
        const rol = await prisma.tipoDeUsuario.create({
            data: r,
        });
        console.log(`Se creo rol con el id: ${rol.id}`);
    }

    for (const u of usuarios) {
        const usuario = await prisma.usuario.create({
            data: u,
        });
        console.log(`Se creo usuario con el id: ${usuario.id}`);
    }

    console.log(`Seeding finished.`);

    const getSolicitudes = await prisma.solicitud.findMany();
    const getRoles = await prisma.tipoDeUsuario.findMany();
    const getUsuarios = await prisma.usuario.findMany();

    console.log(getSolicitudes);
    console.log(getRoles);
    console.log(getUsuarios);
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
