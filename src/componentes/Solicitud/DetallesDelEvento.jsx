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

// Componente principal para mostrar los detalles del evento
export const DetallesDelEvento = () => {
    const { id } = useParams(); 
    const [evento, setEvento] = useState(); 
    const toast = useToast(); 
    const [registrado, setRegistrado] = useState(false); 
    const componentRef = useRef(); 
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    ); 

    const [selectUsuarios, setSelectUsuarios] = useState({}); // Estado para mantener el seguimiento de usuarios seleccionados
    const [InvitarModalAbrir, setInvitarModalAbrir] = useState(false); // Estado para el modal de invitar grupos
    const [usuarios, setUsuarios] = useState([]); // Estado para almacenar la lista de usuarios

    // Función para obtener los detalles del evento desde el servidor
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

    // useEffect para obtener los detalles del evento cuando se monta el componente
    useEffect(() => {
        fetchEvento();
    }, [id, toast]);

    // useEffect para verificar si el usuario está registrado en el evento
    useEffect(() => {
        fetchEvento();

        fetch(`http://localhost:3000/usuarios/${usuario.id}/eventos-asistidos`)
            .then((response) => response.json())
            .then((data) => {
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
    }, []);

    const [usuariosAsistentes, setUsuariosAsistentes] = useState([]); // Estado para almacenar los usuarios asistentes al evento
    const [isOpen, setIsOpen] = useState(false); // Estado para manejar la apertura del modal de usuarios asistentes

    // Función para registrar al usuario en el evento
    const handleRegistroEvento = () => {
        try {
            const eventoId = evento.id;

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

    // Función para cancelar la asistencia del usuario al evento
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
                        throw new Error(
                            `HTTP error! Status: ${response.status}`
                        );
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

    // Función para alternar entre registro y cancelación de asistencia
    const handleToggleAsistencia = () => {
        if (registrado) {
            handleCancelarAsistencia();
        } else {
            handleRegistroEvento();
        }
    };

    // Función para obtener los usuarios asistentes al evento
    const obtenerUsuariosAsistentes = () => {
        fetch(`http://localhost:3000/eventos/${evento.id}/usuarios`)
            .then((response) => response.json())
            .then((data) => {
                setUsuariosAsistentes(data);
                setIsOpen(true); // Abrir el modal
            })
            .catch((error) => {
                console.error(
                    "Error al obtener los usuarios asistentes:",
                    error
                );
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

    // useEffect para obtener los detalles del evento cuando se monta el componente
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

    // Función para obtener la lista de usuarios
    const obtenerUsuarios = async () => {
        try {
            const response = await fetch(`http://localhost:3000/usuarios`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setUsuarios(data); // Actualiza el estado con los datos de los usuarios recibidos
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
            toast({
                title: "Error",
                description: "Hubo un problema al obtener los usuarios.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
        }
    };

    // useEffect para obtener la lista de usuarios cuando se monta el componente
    useEffect(() => {
        obtenerUsuarios();
    }, []);

    // Render del componente
    return (
        <Box>
            <VStack spacing={4}>
                <Heading as="h1" size="xl">
                    {evento?.nombre}
                </Heading>
                <Text>{evento?.descripcion}</Text>
                <Text>Fecha: {evento?.fecha}</Text>
                <Text>Ubicación: {evento?.ubicacion}</Text>
                <Image src={evento?.imagen} alt={evento?.nombre} />

                <Button
                    colorScheme="teal"
                    onClick={handleToggleAsistencia}
                >
                    {registrado ? "Cancelar asistencia" : "Registrarse"}
                </Button>

                <Button colorScheme="blue" onClick={obtenerUsuariosAsistentes}>
                    Ver usuarios asistentes
                </Button>

                <ReactToPrint
                    trigger={() => (
                        <Button
                            leftIcon={<FaPrint />}
                            colorScheme="blue"
                            variant="outline"
                        >
                            Imprimir detalles del evento
                        </Button>
                    )}
                    content={() => componentRef.current}
                />

                <Box ref={componentRef} style={{ display: "none" }}>
                    <Heading as="h1" size="xl">
                        {evento?.nombre}
                    </Heading>
                    <Text>{evento?.descripcion}</Text>
                    <Text>Fecha: {evento?.fecha}</Text>
                    <Text>Ubicación: {evento?.ubicacion}</Text>
                    <Image src={evento?.imagen} alt={evento?.nombre} />
                </Box>

                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Usuarios asistentes</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Nombre</Th>
                                        <Th>Email</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {usuariosAsistentes.map((usuario) => (
                                        <Tr key={usuario.id}>
                                            <Td>{usuario.nombre}</Td>
                                            <Td>{usuario.email}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" onClick={() => setIsOpen(false)}>
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </VStack>
        </Box>
    );
};
