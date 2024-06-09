import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Heading,
    Text,
    VStack,
    Button,
    useToast,
    Image,
    Grid,
    Center,
    FormControl,
    FormLabel,
    CloseButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from "@chakra-ui/react";
import ReactToPrint from "react-to-print";
import { FaPrint } from "react-icons/fa";

export const DetallesDelEvento = () => {
    const { id } = useParams();
    const [evento, setEvento] = useState();
    const toast = useToast();
    const [registrado, setRegistrado] = useState(false);
    const componentRef = useRef();
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    );
    const [cantidadEnEspera, setCantidadEnEspera] = useState(0);
    const [enListaDeEspera, setEnListaDeEspera] = useState(false);
    const [selectUsuarios, setSelectUsuarios] = useState({}); // Estado para mantener el seguimiento de usuarios seleccionados
    const [InvitarModalAbrir, setInvitarModalAbrir] = useState(false); // Estado para el modal de invitar grupos
    const [usuarios, setUsuarios] = useState([]);

    const fetchEvento = async () => {
        try {
            const response = await fetch(`http://localhost:3000/eventos/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setEvento(data); // Actualiza el estado con los datos del evento recibido
        } catch (error) {
            console.error("Error al obtener los detalles del evento:", error);
            toast({
                title: "Error",
                description:
                    "Hubo un problema al obtener los detalles del evento.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
        }
    };

    useEffect(() => {
        fetchEvento();
    }, [id, toast]);

    useEffect(() => {
        fetchEvento();

        fetch(`http://localhost:3000/usuarios/${usuario.id}/eventos-asistidos`)
            .then((response) => response.json())
            .then((data) => {
                console.log("data", data);
                const existeEvento = data.find((e) => e.id == id);

                if (existeEvento) {
                    setRegistrado(true);
                } else {
                    setRegistrado(false);
                }
            })
            .catch((error) => {
                console.error(
                    "Error al obtener los eventos del usuario:",
                    error
                );
            });

        console.log(registrado);
    }, []);

    const [usuariosAsistentes, setUsuariosAsistentes] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const handleRegistroEvento = () => {
        if (registrado || enListaDeEspera) {
            toast({
                title: "Ya estás registrado",
                description: "No puedes registrarte nuevamente.",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
            return;
        }
        try {
            const eventoId = evento.id;
    
            // Verificar si la capacidad del evento está llena
            if (usuariosAsistentes.length >= evento.solicitud.capacidad) {
                // Mostrar alerta de capacidad llena
                const confirmacion = window.confirm(
                    "La capacidad del evento está llena. ¿Desea inscribirse en la lista de espera?"
                );
    
                if (confirmacion) {
                    // Agregar usuario a la lista de espera
                    fetch(`http://localhost:3000/lista-espera`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            eventoId: eventoId,
                            usuarioId: usuario.id,
                            fechaRegistro: new Date(),
                        }),
                    })
                        .then((response) => response.json())
                        .then(() => {
                            toast({
                                title: "Inscripción en lista de espera",
                                description:
                                    "Te has inscrito en la lista de espera para este evento.",
                                status: "info",
                                duration: 3000,
                                isClosable: true,
                                position: "top-right",
                            });
                            setEnListaDeEspera(true); // Actualiza el estado enListaDeEspera a true
                        })
                        .catch((error) => {
                            console.error(
                                "Error al inscribir en la lista de espera:",
                                error
                            );
                            toast({
                                title: "Error",
                                description:
                                    "Hubo un error al inscribirte en la lista de espera.",
                                status: "error",
                                duration: 5000,
                                isClosable: true,
                                position: "top-right",
                            });
                        });
                }
            } else {
                // Registrar asistencia normalmente
                const data = {
                    usuarioId: usuario.id,
                    eventoId: eventoId,
                };
    
                fetch(`http://localhost:3000/asistencias`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                    .then((response) => response.json())
                    .then(() => {
                        toast({
                            title: "Registro exitoso",
                            description: "Se ha registrado correctamente al evento",
                            status: "success",
                            duration: 3000,
                            isClosable: true,
                            position: "top-right",
                        });
    
                        fetch("http://localhost:3000/notificaciones", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                usuarioId: usuario.id,
                                tipoDeNotificacionId: 1,
                                mensaje: `Usted a sido registrado exitosamente al evento: ${evento.solicitud.nombre}, le pedimos estar al tanto de las fechas y comunicados del evento`,
                                leida: false,
                            }),
                        })
                            .then((resp) => resp.json())
                            .then((data) => {
                                console.log("notificacion", data);
                            })
                            .catch((error) => {
                                console.error(
                                    "Error al crear la notificación: ",
                                    error
                                );
                            });
    
                        setRegistrado(true);
                    })
                    .catch((error) => {
                        console.error("Error al registrar la asistencia:", error);
                        toast({
                            title: "Error",
                            description:
                                "Hubo un error al registrar tu asistencia.",
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                            position: "top-right",
                        });
                    });
            }
        } catch (error) {
            console.error("Error al procesar los datos del usuario:", error);
            toast({
                title: "Error",
                description: "Hubo un error al procesar los datos del usuario.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
        }
    };

    const handleCancelarAsistencia = () => {
        try {
            const usuarioJSON = localStorage.getItem("usuario");
    
            if (!usuarioJSON) {
                throw new Error(
                    "No hay datos de usuario almacenados en localStorage"
                );
            }
            const usuario = JSON.parse(usuarioJSON);
    
            fetch("http://localhost:3000/asistencias", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    usuarioId: usuario.id,
                    eventoId: evento.id,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(() => {
                    toast({
                        title: "Cancelación exitosa",
                        description: "Se ha cancelado tu asistencia al evento.",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right",
                    });
                    setRegistrado(false);
    
                    // Verificar si hay usuarios en la lista de espera
                    fetch(
                        `http://localhost:3000/lista-espera/${evento.id}?_sort=fechaRegistro&_order=asc&_limit=1`
                    )
                        .then((response) => response.json())
                        .then((usuariosEnEspera) => {
                            if (usuariosEnEspera.length > 0) {
                                const usuarioEnEspera = usuariosEnEspera[0];
    
                                // Registrar automáticamente al usuario en espera
                                fetch(`http://localhost:3000/asistencias`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        usuarioId: usuarioEnEspera.usuarioId,
                                        eventoId: evento.id,
                                    }),
                                })
                                    .then((response) => response.json())
                                    .then(() => {
                                        // Eliminar usuario de la lista de espera
                                        fetch(
                                            `http://localhost:3000/lista-espera/${usuarioEnEspera.id}`,
                                            {
                                                method: "DELETE",
                                            }
                                        )
                                            .then((response) => response.json())
                                            .then(() => {
                                                console.log(
                                                    "Usuario eliminado de la lista de espera"
                                                );
                                            });
                                    });
                            }
                        });
                })
                .catch((error) => {
                    console.error("Error al cancelar la asistencia:", error);
                    toast({
                        title: "Error",
                        description: "Hubo un error al cancelar tu asistencia.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right",
                    });
                });
        } catch (error) {
            console.error("Error al procesar los datos del usuario:", error);
            toast({
                title: "Error",
                description: "Hubo un error al procesar los datos del usuario.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
        }
    };

    const handleCancelarListaDeEspera = () => {
        fetch(`http://localhost:3000/lista-espera`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                usuarioId: usuario.id,
                eventoId: evento.id,
            }),
        })
            .then((response) => response.json())
            .then(() => {
                toast({
                    title: "Cancelación exitosa",
                    description: "Se ha cancelado tu asistencia de la lista de espera.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right",
                });
                setEnListaDeEspera(false);
            })
            .catch((error) => {
                console.error("Error al cancelar la asistencia de la lista de espera:", error);
                toast({
                    title: "Error",
                    description: "Hubo un error al cancelar tu asistencia de la lista de espera.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right",
                });
            });
    };

    // Dependencia vacía para ejecutar una sola vez al montar el componente// Dependencias para volver a ejecutar useEffect cuando id o usuario.id cambien

    // Maneja el cambio entre botones basado en asistira
    const handleToggleAsistencia = () => {
        if (registrado) {
            handleCancelarAsistencia();
        } else if (enListaDeEspera) {
            handleCancelarListaDeEspera();
        } else {
            handleRegistroEvento();
        }
    };

    const obtenerUsuariosAsistentes = () => {
        fetch(`http://localhost:3000/eventos/${evento.id}/usuarios`)
            .then((response) => response.json())
            .then((data) => {
                setUsuariosAsistentes(data);
    
                // Obtener cantidad de usuarios en la lista de espera
                fetch(`http://localhost:3000/lista-espera/${evento.id}/count`)
                    .then((response) => response.json())
                    .then((cantidadEnEspera) => {
                        setCantidadEnEspera(cantidadEnEspera);
                        setIsOpen(true); // Abrir el modal
                    });
            })
            .catch((error) => {
                console.error("Error al obtener los usuarios asistentes:", error);
                toast({
                    title: "Error",
                    description:
                        "No se pudieron obtener los usuarios que asistirán al evento.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right",
                });
            });
    };

    useEffect(() => {
        fetch(`http://localhost:3000/eventos/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setEvento(data);
            })
            .catch((error) => {
                console.error(
                    "Error al obtener los detalles del evento:",
                    error
                );
                toast({
                    title: "Error",
                    description:
                        "Hubo un problema al obtener los detalles del evento.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right",
                });
            });
    }, []);

    const obtenerUsuarios = async () => {
        try {
            const response = await fetch("http://localhost:3000/usuarios");
            if (!response.ok) {
                throw new Error("Error al obtener los usuarios");
            }
            const data = await response.json();
            setUsuarios(data);
            // Inicializar el estado de selección para los usuarios
            const seleccionInicial = data.reduce((acc, user) => {
                acc[user.id] = false; // Suponiendo que 'id' es único para cada usuario
                return acc;
            }, {});

            setSelectUsuarios(seleccionInicial);
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
            toast({
                title: "Error",
                description: "No se pudieron obtener los usuarios.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
        }
    };

    const cambioSeleccion = (userId) => {
        setSelectUsuarios((prevState) => ({
            ...prevState,
            [userId]: !prevState[userId],
        }));
    };

    const seleccionarTodos = (event) => {
        const { checked } = event.target;
        const nuevaSeleccion = {};
        usuarios.forEach((user) => {
            nuevaSeleccion[user.id] = checked;
        });
        setSelectUsuarios(nuevaSeleccion);
    };

    // Función para abrir el modal y obtener usuarios
    const AbrirModalInvitar = () => {
        obtenerUsuarios();
        setInvitarModalAbrir(true);
    };

    if (!evento) {
        return <div>Cargando...</div>;
    }

    function CloseButtonLink() {
        return (
            <a
                href="/eventos"
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "50px",
                    textDecoration: "none",
                }}
            >
                <CloseButton size="lg" />
            </a>
        );
    }

    const invitarUsuarios = () => {
        for (const key in selectUsuarios) {
            if (selectUsuarios[key]) {
                fetch(`http://localhost:3000/notificaciones`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        tipoDeNotificacionId: 3,
                        usuarioId: key,
                        mensaje: `El ${usuario.tipoUsuario.rol}: ${usuario.nombres} te ha invidado a asistir al evento: ${evento.solicitud.nombre}`,
                        leida: false,
                    }),
                })
                    .then((resp) => resp.json())
                    .then((data) => console.log(data));
            }
        }
    };

    const pageStyle = `
        @page {
            size: auto;
            margin: 20mm;
        }
        @media print {
            body {
                -webkit-print-color-adjust: exact;
                font-family: Arial, sans-serif;
            }
        }
    `;

    return (
        <Box p={8}>
            <CloseButtonLink />
            <Heading as="h1" size="xl" textAlign={"center"}>
                {evento.solicitud.nombre}
            </Heading>
            <Center>
                <VStack
                    display="grid"
                    gridTemplateColumns={"1fr 1fr"}
                    align="stretch"
                    mt={10}
                    width={"50%"}
                >
                    <Image
                        src="/src/recursos/imagenes/ejemploEvento.jpg"
                        alt="Imagen del evento"
                        objectFit="cover"
                        width="70%"
                        height="200px"
                        borderRadius="md"
                    />
                    <Text fontSize="xl" textAlign={"justify"}>
                        {evento.solicitud.descripcion}
                    </Text>
                </VStack>
            </Center>
            <Center>
                <Grid
                    templateColumns="repeat(2, 1fr)"
                    gap={4}
                    width={"50%"}
                    mt={10}
                >
                    <FormControl>
                        <FormLabel mt={3} fontSize="m">
                            <b>Responsable: </b>
                            {evento.solicitud.nombreResponsable}
                        </FormLabel>
                        <FormLabel mt={3} fontSize="m">
                            <b>Modalidad: </b>
                            {evento.solicitud.modalidad}
                        </FormLabel>
                        <FormLabel mt={3} fontSize="m">
                            <b>Capacidad: </b>
                            {evento.solicitud.capacidad}
                        </FormLabel>
                        <FormLabel mt={3} fontSize="m">
                            <b>Valor en Créditos: </b>
                            {evento.solicitud.valorEnCreditos ? "Sí" : "No"}
                        </FormLabel>
                        <FormLabel mt={3} fontSize="m">
                            <b>Total de Sellos: </b>
                            {evento.solicitud.totalSellos}
                        </FormLabel>
                        <FormLabel mt={3} fontSize="m">
                            <b>Hora Inicio: </b>
                            {evento.solicitud.horaInicio}
                        </FormLabel>
                        <FormLabel mt={3} fontSize="m">
                            <b>Hora Fin: </b>
                            {evento.solicitud.horaFin}
                        </FormLabel>
                    </FormControl>
                    <FormControl>
                        <FormLabel mt={3} fontSize="m">
                            <b>Facultad: </b>
                            {evento.solicitud.ubicacion.facultad}
                        </FormLabel>
                        <FormLabel mt={3} fontSize="m">
                            <b>Estado: </b>
                            {evento.solicitud.ubicacion.estado}
                        </FormLabel>
                        <FormLabel mt={3} fontSize="m">
                            <b>Campus: </b>
                            {evento.solicitud.ubicacion.campus}
                        </FormLabel>
                        <FormLabel mt={3} fontSize="m">
                            <b>Ciudad: </b>
                            {evento.solicitud.ubicacion.ciudad}
                        </FormLabel>
                        <FormLabel mt={3} fontSize="m">
                            <b>Dirección: </b>
                            {evento.solicitud.ubicacion.direccion}
                        </FormLabel>
                        <FormLabel mt={3} fontSize="m">
                            <b>Aula: </b>
                            {evento.solicitud.ubicacion.aula}
                        </FormLabel>
                        <FormLabel mt={3} fontSize="m">
                            <b>Fecha: </b>
                            {evento.solicitud.fecha}
                        </FormLabel>
                    </FormControl>
                </Grid>
            </Center>
            <Center>
            {registrado ? (
                <Button
                    colorScheme="red"
                    size="lg"
                    mt={10}
                    onClick={handleToggleAsistencia}
                    style={{ display: "block" }}
                >
                    Cancelar asistencia
                </Button>
            ) : enListaDeEspera ? (
                <Button
                    colorScheme="yellow"
                    size="lg"
                    mt={10}
                    onClick={handleToggleAsistencia}
                    style={{ display: "block" }}
                >
                    Cancelar lista de espera
                </Button>
            ) : (
                <Button
                    colorScheme="green"
                    size="lg"
                    mt={10}
                    onClick={handleToggleAsistencia}
                    style={{ display: "block" }}
                >
                    Asistiré
                </Button>
            )}

                {usuario.tipoUsuario.rol != "Alumno" && (
                    <Button
                        colorScheme="green"
                        size="lg"
                        mt={10}
                        ml={4}
                        onClick={AbrirModalInvitar}
                    >
                        Invitar Grupos
                    </Button>
                )}

                {usuario.tipoUsuario.rol !== "Alumno" && (
                    <Button
                        colorScheme="green"
                        size="lg"
                        mt={10}
                        ml={4}
                        onClick={obtenerUsuariosAsistentes}
                    >
                        Ver asistentes
                    </Button>
                )}
                {/* Modal para mostrar usuarios asistentes */}
                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    size="4xl"
                >
                    <ModalOverlay />
                        <ModalContent ref={componentRef}>
                        <ModalHeader>
                            <div>Usuarios que asistieron a: {evento.solicitud.nombre}</div>
                            <div>Responsable: {evento.solicitud.nombreResponsable}</div>
                            <div>Fecha: {evento.solicitud.fecha}</div>
                            <div>Cantidad en lista de espera: {cantidadEnEspera}</div>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Matrícula</Th>
                                        <Th>Nombre</Th>
                                        <Th>Apellidos</Th>
                                        <Th>Carrera</Th>
                                        <Th>Facultad</Th>
                                        <Th>Correo</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {usuariosAsistentes.map((usuario) => (
                                        <Tr key={usuario.id}>
                                            <Td>{usuario.matricula}</Td>
                                            <Td>{usuario.nombres}</Td>
                                            <Td>{usuario.apellidos}</Td>
                                            <Td>{usuario.carrera}</Td>
                                            <Td>{usuario.facultad}</Td>
                                            <Th>{usuario.correo}</Th>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </ModalBody>
                        <ModalFooter
                            display="flex"
                            justifyContent="space-between"
                        >
                            {usuario.tipoUsuario.rol !== "Alumno" && (
                                <ReactToPrint
                                    trigger={() => (
                                        <FaPrint
                                            size={30}
                                            cursor="pointer"
                                            style={{ marginLeft: "20px" }}
                                        />
                                    )}
                                    content={() => componentRef.current}
                                    pageStyle={pageStyle}
                                />
                            )}
                            <Button
                                colorScheme="green"
                                onClick={() => setIsOpen(false)}
                            >
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {/* Modal para "Invitar Grupos" */}
                <Modal
                    isOpen={InvitarModalAbrir}
                    onClose={() => setInvitarModalAbrir(false)}
                    size="4xl"
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Invitar Grupos</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>
                                            <Text>Seleccionar todos</Text>
                                            <input
                                                type="checkbox"
                                                onChange={seleccionarTodos}
                                                checked={usuarios.every(
                                                    (user) =>
                                                        selectUsuarios[user.id]
                                                )}
                                            />
                                        </Th>
                                        <Th>Matrícula</Th>
                                        <Th>Nombre</Th>
                                        <Th>Apellidos</Th>
                                        <Th>Carrera</Th>
                                        <Th>Correo</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {usuarios.map((usuario) => (
                                        <Tr key={usuario.id}>
                                            <Td>
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        selectUsuarios[
                                                            usuario.id
                                                        ]
                                                    }
                                                    onChange={() =>
                                                        cambioSeleccion(
                                                            usuario.id
                                                        )
                                                    }
                                                />
                                            </Td>
                                            <Td>{usuario.matricula}</Td>
                                            <Td>{usuario.nombres}</Td>
                                            <Td>{usuario.apellidos}</Td>
                                            <Td>{usuario.carrera}</Td>
                                            <Td>{usuario.correo}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                onClick={invitarUsuarios}
                                colorScheme="green"
                                ml={4}
                                mt={10}
                            >
                                {" "}
                                Invitar{" "}
                            </Button>
                            <Button
                                colorScheme="green"
                                ml={4}
                                mt={10}
                                onClick={() => setInvitarModalAbrir(false)}
                            >
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Center>
        </Box>
    );
};
