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
    const [asistira, setAsistira] = useState(false);
    const componentRef = useRef();
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    );

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
        // const getAsistencia = async () => {
        //     try {
        //         const eventoId = evento.id;

        //         // Construir la URL con los parámetros de eventId y usuarioId
        //         const url = `http://localhost:3000/eventos/${eventoId}/asistencia/${usuario.id}`;

        //         const response = await fetch(url, {
        //             method: "GET",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //         });

        //         if (!response.ok) {
        //             throw new Error(
        //                 "Error al obtener la solicitud de asistencia"
        //             );
        //         }

        //         const data = await response.json();

        //         // Actualizar localmente setAsistira basado en la respuesta del servidor
        //         setAsistira(data); // Suponiendo que data contiene true o false

        //         // Aquí puedes hacer lo que necesites con setAsistira, como actualizar en tu interfaz
        //         // Ejemplo: actualizarEstado(setAsistira);
        //     } catch (error) {
        //         console.error("Error al obtener solicitud:", error);
        //         // Manejar el error según tus necesidades
        //     }
        // };

        // // Llamar a getSolicitud al montar el componente
        // if (evento && evento.id) {
        //     getAsistencia();
        // }
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
                .then((responseData) => {
                    toast({
                        title: "Registro exitoso",
                        description: "Se ha registrado correctamente al evento",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right",
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
                .then((responseData) => {
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

    // Dependencia vacía para ejecutar una sola vez al montar el componente// Dependencias para volver a ejecutar useEffect cuando id o usuario.id cambien

    // Maneja el cambio entre botones basado en asistira
    const handleToggleAsistencia = () => {
        if (registrado) {
            handleCancelarAsistencia();
        } else {
            handleRegistroEvento();
        }
    };

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
                            {evento.solicitud.responsable}
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

                <Button
                    colorScheme="green"
                    size="lg"
                    mt={10}
                    ml={4}
                    onClick={obtenerUsuariosAsistentes}
                >
                    Ver asistentes
                </Button>
                {/* Modal para mostrar usuarios asistentes */}
                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    size="2xl"
                >
                    <ModalOverlay />
                    <ModalContent ref={componentRef}>
                        <ModalHeader>
                            <div>
                                Usuarios que asistieron a:{" "}
                                {evento.solicitud.nombre}
                            </div>
                            <div>
                                Responsable:{" "}
                                {evento.solicitud.nombreResponsable}
                            </div>
                            <div>Fecha: {evento.solicitud.fecha}</div>
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
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {usuariosAsistentes.map((usuario) => (
                                        <Tr key={usuario.id}>
                                            <Td>{usuario.matricula}</Td>
                                            <Td>{usuario.nombres}</Td>
                                            <Td>{usuario.apellidos}</Td>
                                            <Td>{usuario.carrera}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </ModalBody>
                        <ModalFooter
                            display="flex"
                            justifyContent="space-between"
                        >
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
                            <Button
                                colorScheme="green"
                                onClick={() => setIsOpen(false)}
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
