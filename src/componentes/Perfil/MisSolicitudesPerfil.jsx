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

export const MisSolicitudesPerfil = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [selectedSolicitud, setSelectedSolicitud] = useState(null);
    const [modalSize] = useState("5xl");
    const [mensajeModal, setMensajeModal] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const toast = useToast();

    useEffect(() => {
        fetch("http://localhost:3000/solicitudes")
            .then((response) => response.json())
            .then((data) => {
                // Filtrar las solicitudes para mostrar solo las que tienen estado "Pendiente" o "Rechazado"
                const pendientes = data.filter(
                    (solicitud) =>
                        solicitud.estado === "Pendiente" ||
                        solicitud.estado === "Rechazado"
                );
                setSolicitudes(pendientes);
            });
    }, []);

    const handleOpen = (solicitud) => setSelectedSolicitud(solicitud);
    const handleClose = () => setSelectedSolicitud(null);

    //Funciones para abrir y cerrar los Modal de mensajes
    const handleMensajeModalOpen = (solicitud) => {
        setSelectedSolicitud(solicitud);
        setMensajeModal(true);
        setMensaje(""); // Restablecer el valor de mensaje al abrir el modal
    };
    const handleMensajeModalClose = (solicitud) => {
        setSelectedSolicitud(solicitud);
        setMensajeModal(false);
        setMensaje(""); // Restablecer el valor de mensaje al cerrar el modal
    };

    const handleMensajeChange = (e) => setMensaje(e.target.value);

    //Funcion para guardar el mensaje enviado por el responsable del evento en la base de datos
    const enviarMensaje = (solicitudId) => {
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
                description:
                    "El mensaje no puede contener caracteres especiales.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
            return;
        }

        fetch(`http://localhost:3000/solicitudes/${solicitudId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mensaje }),
        })
            .then((response) => response.json())
            .then((data) => {
                toast({
                    title: "Mensaje enviado",
                    description: "El mensaje se ha enviado con éxito.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right",
                });
                handleMensajeModalClose();
            });
    };

    const aumentarRecordatorio = (solicitudId) => {
        fetch(`http://localhost:3000/solicitudes/${solicitudId}/recordatorio`, {
            method: "PUT",
        })
            .then((response) => response.json())
            .then((data) => {
                // Actualizar la solicitud en el estado local
                setSolicitudes((prevSolicitudes) =>
                    prevSolicitudes.map((solicitud) =>
                        solicitud.id === solicitudId
                            ? {
                                  ...solicitud,
                                  recordatorio: solicitud.recordatorio + 1,
                              }
                            : solicitud
                    )
                );
            });
    };

    const handleOpenDetalleModal = (solicitud) => {
        setSelectedSolicitud(solicitud);
        setMensajeModal(false); // Cerrar el modal de mensaje si estaba abierto
    };

    return (
        <Stack spacing={4}>
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
                        onClick={() => handleOpenDetalleModal(solicitud)}
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
                            maxW={{ base: "100%", sm: "200px", md: "25%" }}
                            maxH={{ base: "200px", sm: "300px", md: "100%" }}
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
                                        Fecha de Creación: {fechaFormateada}
                                    </FormLabel>
                                </FormControl>
                                <Box>
                                    {solicitud.estado === "Pendiente" && (
                                        <>
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
                                            <br />
                                            <Button
                                                colorScheme="blue"
                                                mt={3}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleMensajeModalOpen(
                                                        solicitud
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
                                                        solicitud.id
                                                    );
                                                }}
                                            >
                                                Recordatorio (
                                                {solicitud.recordatorio})
                                            </Button>
                                        </>
                                    )}
                                    {solicitud.estado === "Rechazado" && (
                                        <>
                                            <Text
                                                fontSize="md"
                                                fontWeight="bold"
                                                mb={2}
                                            >
                                                Motivo de rechazo:{" "}
                                                {solicitud.notas}
                                            </Text>
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
                                        </>
                                    )}
                                </Box>
                            </CardBody>
                        </Stack>
                    </Card>
                );
            })}

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
                                        {selectedSolicitud.responsable}
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
                                </FormControl>
                                <FormControl>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Descripción: </b>
                                        {selectedSolicitud.descripcion}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Facultad: </b>
                                        {selectedSolicitud.ubicacion.facultad}
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
                                        {selectedSolicitud.ubicacion.direccion}
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
                    </ModalContent>
                </Modal>
            )}

            <Modal isOpen={mensajeModal} onClose={handleMensajeModalClose}>
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
                            onClick={() => enviarMensaje(selectedSolicitud.id)}
                        >
                            Enviar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Stack>
    );
};
