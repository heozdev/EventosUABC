import { useEffect, useState } from "react";
import {
    Card,
    Text,
    Badge,
    Stack,
    Box,
    Image,
    CardBody,
    FormControl,
    FormLabel,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Button,
    Input,
    useToast,
    ModalFooter,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { AgregarSolicitud } from "./AgregarSolicitud";

export const MisSolicitudesPerfil = ({ solicitud }) => {
    // Estado para almacenar las solicitudes
    const [solicitudes, setSolicitudes] = useState([]);

    // Estado para la solicitud seleccionada
    const [selectedSolicitud, setSelectedSolicitud] = useState(null);

    // Estado para el tamaño del modal
    const [modalSize] = useState("5xl");

    // Estado para controlar la visibilidad del mensaje modal
    const [mensajeModal, setMensajeModal] = useState(false);

    // Estado para almacenar el mensaje del modal
    const [mensaje, setMensaje] = useState("");

    // Estado para mostrar notificaciones
    const toast = useToast();
    
    // Estado para almacenar la información del usuario
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    );

    // useEffect para cargar las solicitudes del usuario al montar el componente
    useEffect(() => {
        if (usuario) {
            fetch(`http://localhost:3000/usuarios/${usuario.id}/solicitudes`)
                .then((response) => response.json())
                .then((data) => {
                    // Filtrar las solicitudes pendientes o rechazadas
                    const pendientes = data.filter(
                        (solicitud) =>
                            solicitud.estado === "Pendiente" ||
                            solicitud.estado === "Rechazado"
                    );
                    setSolicitudes(pendientes);
                })
                .catch((error) => {
                    console.error("Error al obtener las solicitudes:", error);
                });
        }
    }, []);

    // Funciones para manejar la apertura y cierre del modal de detalles de solicitud
    const handleOpen = (solicitud) => setSelectedSolicitud(solicitud);
    const handleClose = () => setSelectedSolicitud(null);

    // Funciones para manejar la apertura y cierre del modal de mensaje
    const handleMensajeModalOpen = (solicitud) => {
        setSelectedSolicitud(solicitud);
        setMensajeModal(true);
        setMensaje("");
    };
    const handleMensajeModalClose = (messageSent = false) => {
        setMensajeModal(false);
        setMensaje("");
        if (!messageSent) {
            setSelectedSolicitud(null); // Cerrar el modal de detalles del evento solo si el mensaje no se envió correctamente
        }
    };

    // Función para manejar cambios en el textarea del mensaje
    const handleMensajeChange = (e) => setMensaje(e.target.value);

    // Función para enviar un mensaje
    const enviarMensaje = (solicitudId) => {
        // Validar que el mensaje no esté vacío y no contenga caracteres especiales
        if (mensaje.trim().length === 0) {
            toast({
                title: "Error",
                description: "El mensaje no puede estar vacío.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
            return;
        }

        if (!/^[a-zA-Z0-9\s.,?!]*$/.test(mensaje)) {
            toast({
                title: "Error",
                description: "El mensaje no puede contener caracteres especiales.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
            return;
        }

        // Obtener todos los usuarios con el rol "Encargado"
        fetch("http://localhost:3000/usuarios/encargados")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener los encargados");
                }
                return response.json();
            })
            .then((encargados) => {
                // Crear una notificación para cada encargado
                const promesas = encargados.map((encargado) => {
                    const notificacion = {
                        usuarioId: encargado.id,
                        tipoDeNotificacionId: 7,
                        mensaje: `El Responsable: ${usuario.nombres} tiene el siguiente mensaje para usted: ${mensaje}`,
                        leida: false,
                    };

                    return fetch("http://localhost:3000/notificaciones", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(notificacion),
                    }).then((response) => {
                        if (!response.ok) {
                            throw new Error("Error al crear la notificación");
                        }
                    });
                });

                return Promise.all(promesas);
            })
            .then(() => {
                // Mostrar toast de éxito
                toast({
                    title: "Mensaje enviado con éxito",
                    status: "success",
                    position: "top",
                    duration: 2000,
                    isClosable: true,
                });
            })
            .catch((error) => {
                // Mostrar toast de error
                toast({
                    title: "Error",
                    description: error.message,
                    status: "error",
                    position: "top",
                    duration: 2000,
                    isClosable: true,
                });
            });

        handleMensajeModalClose(true);
        handleClose(); // Cerrar el modal de detalles del evento
    };

    // Función para aumentar el recordatorio de una solicitud
    const aumentarRecordatorio = (solicitudId) => {
        fetch(`http://localhost:3000/solicitudes/${solicitudId}/recordatorio`, {
            method: "PUT",
        })
            .then((response) => response.json())
            .then((data) => {
                setSelectedSolicitud((prevSolicitud) => ({
                    ...prevSolicitud,
                    recordatorio: data.recordatorio,
                }));
            });
    };

    // Función para manejar la apertura del modal de detalles de solicitud
    const handleOpenDetalleModal = (solicitud) => {
        setSelectedSolicitud(solicitud);
        setMensajeModal(false);
        // Obtener el valor actualizado de recordatorio desde la base de datos
        fetch(`http://localhost:3000/solicitudes/${solicitud.id}`)
            .then((response) => response.json())
            .then((data) => {
                setSelectedSolicitud((prevSolicitud) => ({
                    ...prevSolicitud,
                    recordatorio: data.recordatorio,
                }));
            });
    };

    return (
        <>
            <Stack p={"10px"} spacing={4} maxHeight={"500px"}>
                <Box overflowY={"scroll"} padding={"20px"}>
                    {solicitudes.map((solicitud) => {
                        const fechaCreacion = solicitud.fechaCreacion;
                        const fechaFormateada = format(
                            new Date(fechaCreacion),
                            "dd/MM/yyyy HH:mm:ss"
                        );
                        return (
                            <Card
                                key={solicitud.id}
                                mt={5}
                                direction={{ base: "column", sm: "row" }}
                                overflow="hidden"
                                variant="outline"
                                borderRadius={10}
                                bgColor={"#F5F5F5"}
                                onClick={() =>
                                    handleOpenDetalleModal(solicitud)
                                }
                                cursor="pointer"
                                transition="transform 0.3s"
                                _hover={{
                                    transform: "scale(1.02)",
                                    boxShadow: "lg",
                                }}
                            >
                                {solicitud.valorEnCreditos && (
                                    <Text
                                        position="absolute"
                                        right={3}
                                        top={3}
                                        fontWeight="bold"
                                    >
                                        8=1
                                    </Text>
                                )}
                                <Image
                                    objectFit="cover"
                                    maxW={{
                                        base: "100%",
                                        sm: "200px",
                                        md: "25%",
                                    }}
                                    maxH={{
                                        base: "200px",
                                        sm: "300px",
                                        md: "100%",
                                    }}
                                    src="src/recursos/imagenes/ejemploEvento.jpg"
                                    alt="Evento"
                                />
                                <Stack>
                                    <CardBody>
                                        <FormControl>
                                            <FormLabel mt={2} fontSize="md">
                                                {solicitud.nombre}
                                            </FormLabel>
                                            <FormLabel mt={2} fontSize="md">
                                                Fecha de Creación:{" "}
                                                {fechaFormateada}
                                            </FormLabel>
                                        </FormControl>
                                        {solicitud.estado === "Pendiente" && (
                                            <Badge
                                                display="inline-block"
                                                variant="solid"
                                                fontSize="md"
                                                padding={2.5}
                                                borderRadius={15}
                                                colorScheme="yellow"
                                            >
                                                Pendiente
                                            </Badge>
                                        )}
                                        {solicitud.estado === "Rechazado" && (
                                            <Badge
                                                display="inline-block"
                                                variant="solid"
                                                fontSize="md"
                                                padding={2.5}
                                                borderRadius={15}
                                                colorScheme="red"
                                            >
                                                Rechazado
                                            </Badge>
                                        )}
                                    </CardBody>
                                </Stack>
                            </Card>
                        );
                    })}
                </Box>

                {selectedSolicitud && (
                    <Modal
                        isOpen={selectedSolicitud !== null && !mensajeModal}
                        onClose={handleClose}
                        size={modalSize}
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Información del Evento</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        fontSize: "18px",
                                    }}
                                >
                                    <FormControl>
                                        <FormLabel mt={3} fontSize="m">
                                            <b>ID del Evento: </b>
                                            {selectedSolicitud.id}
                                        </FormLabel>
                                        <FormLabel mt={3} fontSize="m">
                                            <b>Nombre del Evento: </b>
                                            {selectedSolicitud.nombre}
                                        </FormLabel>
                                        <FormLabel mt={3} fontSize="m">
                                            <b>Responsable: </b>
                                            {
                                                selectedSolicitud.nombreResponsable
                                            }
                                        </FormLabel>
                                        <FormLabel mt={3} fontSize="m">
                                            <b>Modalidad: </b>
                                            {selectedSolicitud.modalidad}
                                        </FormLabel>
                                        <FormLabel mt={3} fontSize="m">
                                            <b>Capacidad: </b>
                                            {selectedSolicitud.capacidad}
                                        </FormLabel>
                                        <FormLabel mt={3} fontSize="m">
                                            <b>Valor en Créditos: </b>
                                            {selectedSolicitud.valorEnCreditos
                                                ? "Sí"
                                                : "No"}
                                        </FormLabel>
                                        <FormLabel mt={3} fontSize="m">
                                            <b>Total de Sellos: </b>
                                            {selectedSolicitud.totalSellos}
                                        </FormLabel>
                                        <FormLabel mt={3} fontSize="m">
                                            <b>Hora Inicio: </b>
                                            {selectedSolicitud.horaInicio}
                                        </FormLabel>
                                        <FormLabel mt={3} fontSize="m">
                                            <b>Hora Fin: </b>
                                            {selectedSolicitud.horaFin}
                                        </FormLabel>
                                        {selectedSolicitud.estado ===
                                            "Rechazado" && (
                                            <FormLabel
                                                fontSize="m"
                                                color={"red"}
                                                mb={2}
                                            >
                                                <b>Motivo de rechazo:</b>{" "}
                                                {selectedSolicitud.notas}
                                            </FormLabel>
                                        )}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel mt={3} fontSize="m">
                                            <b>Descripción: </b>
                                            {selectedSolicitud.descripcion}
                                        </FormLabel>
                                        <FormLabel mt={3} fontSize="m">
                                            <b>Facultad: </b>
                                            {
                                                selectedSolicitud.ubicacion
                                                    .facultad
                                            }
                                        </FormLabel>
                                        <FormLabel mt={3} fontSize="m">
                                            <b>Estado: </b>
                                            {selectedSolicitud.ubicacion.estado}
                                        </FormLabel>
                                        <FormLabel mt={3} fontSize="m">
                                            <b>Campus: </b>
                                            {selectedSolicitud.ubicacion.campus}
                                        </FormLabel>
                                        <FormLabel mt={3} fontSize="m">
                                            <b>Ciudad: </b>
                                            {selectedSolicitud.ubicacion.ciudad}
                                        </FormLabel>
                                        <FormLabel mt={3} fontSize="m">
                                            <b>Dirección: </b>
                                            {
                                                selectedSolicitud.ubicacion
                                                    .direccion
                                            }
                                        </FormLabel>
                                        <FormLabel mt={3} fontSize="m">
                                            <b>Aula: </b>
                                            {selectedSolicitud.ubicacion.aula}
                                        </FormLabel>
                                        <FormLabel mt={3} fontSize="m">
                                            <b>Fecha: </b>
                                            {selectedSolicitud.fecha}
                                        </FormLabel>
                                        <FormLabel mt={3} fontSize="m">
                                            <b>Fecha de envio: </b>
                                            {format(
                                                new Date(
                                                    selectedSolicitud.fechaCreacion
                                                ),
                                                "dd/MM/yyyy HH:mm:ss"
                                            )}
                                        </FormLabel>
                                    </FormControl>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Box>
                                    {selectedSolicitud.estado ===
                                        "Pendiente" && (
                                        <>
                                            <Button
                                                colorScheme="green"
                                                mt={3}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleMensajeModalOpen(
                                                        selectedSolicitud
                                                    );
                                                }}
                                            >
                                                Mensaje
                                            </Button>
                                            <Button
                                                colorScheme="orange"
                                                mt={3}
                                                ml={3}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    aumentarRecordatorio(
                                                        selectedSolicitud.id
                                                    );
                                                }}
                                            >
                                                Recordatorio (
                                                {selectedSolicitud.recordatorio}
                                                )
                                            </Button>
                                        </>
                                    )}
                                </Box>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                )}

                <Modal
                    isOpen={mensajeModal}
                    onClose={() => handleMensajeModalClose(false)}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Enviar mensaje</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input
                                value={mensaje}
                                onChange={handleMensajeChange}
                                placeholder="Escribe tu mensaje"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme="blue"
                                onClick={() =>
                                    enviarMensaje(selectedSolicitud.id)
                                }
                                onClose={() => handleClose()}
                            >
                                Enviar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Stack>
            <AgregarSolicitud />
        </>
    );
};
