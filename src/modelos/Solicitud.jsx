import { useEffect, useState } from "react"; 
import { useToast } from "@chakra-ui/react"; 
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    FormControl,
    FormLabel,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    Textarea,
} from "@chakra-ui/react"; 
import { format } from "date-fns"; 


export const Solicitud = ({ solicitud, setSolicitud, updateSolicitudes }) => {
    const [isOpen, setIsOpen] = useState(false); 
    const [value, setValue] = useState(""); 
    const [showConfirmModal, setShowConfirmModal] = useState(false); // Estado para controlar la apertura del modal de confirmación
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    ); 
    const toast = useToast(); // Hook para mostrar notificaciones

    // Función para crear un evento basado en una solicitud
    const crearEvento = (solicitudId) => {
        fetch("http://localhost:3000/evento", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                estado: "Vigente",
                solicitudId,
            }),
        })
        .then((response) => response.json())
        .then((data) => console.log(data));
    };

    // Función para aceptar una solicitud
    const aceptarSolicitud = () => {
        fetch(`http://localhost:3000/solicitudes/${solicitud.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ estado: "Aceptado" }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data) {
                crearEvento(solicitud.id);
                // Crear notificación para el responsable de la solicitud
                fetch(`http://localhost:3000/notificaciones`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        tipoDeNotificacionId: 8,
                        usuarioId: solicitud.responsableId,
                        mensaje: `Su solicitud para la creacion del evento: ${solicitud.nombre} ha sido aceptada con exito por el Encargado ${usuario.nombres}.`,
                        leida: false,
                    }),
                })
                .then((resp) => resp.json())
                .then((data) => console.log(data));
                // Mostrar notificación de éxito
                toast({
                    title: "Solicitud aceptada",
                    description: "La solicitud fue aceptada correctamente.",
                    status: "success",
                    position: "top-right",
                    duration: 3000,
                    isClosable: true,
                });
            }
        });

        handleClose(); // Cierra el modal
    };

    // Función para rechazar una solicitud
    const rechazarSolicitud = () => {
        if (!value.trim()) {
            // Verificar si se ha ingresado alguna nota antes de rechazar la solicitud
            toast({
                title: "Error",
                description: "Agrega observaciones antes de rechazar una solicitud",
                status: "error",
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
            return; // Detener si no se ingresan observaciones
        }

        fetch(`http://localhost:3000/solicitudes/${solicitud.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ estado: "Rechazado", notas: value }),
        })
        .then((response) => response.json())
        .then((data) => {
            updateSolicitudes(); // Actualiza la lista de solicitudes
            // Mostrar mensaje de éxito
            toast({
                title: "Solicitud rechazada",
                description: "La solicitud ha sido rechazada correctamente.",
                status: "success",
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
        });

        handleClose(); // Cierra el modal
    };

    // Función para eliminar una solicitud (muestra el modal de confirmación)
    const eliminarSolicitud = () => {
        setShowConfirmModal(true);
    };

    // Función para confirmar la eliminación de una solicitud
    const handleConfirmEliminar = () => {
        fetch(`http://localhost:3000/solicitud/${solicitud.id}`, {
            method: "DELETE",
        })
        .then((response) => response.json())
        .then((data) => {
            updateSolicitudes(); // Actualiza la lista de solicitudes
            // Mostrar notificación de éxito
            toast({
                title: "Solicitud eliminada",
                description: "La solicitud ha sido eliminada correctamente.",
                status: "success",
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });
        });

        handleClose(); // Cierra el modal
        setShowConfirmModal(false); // Cierra el modal de confirmación
    };

    // Función para cancelar la eliminación de una solicitud (cierra el modal de confirmación)
    const handleCancelEliminar = () => {
        setShowConfirmModal(false);
    };

    // Funciones para abrir y cerrar el modal principal
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    // Función para manejar el cambio de valor del textarea
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);
    };

    const [modalSize] = useState("5xl"); // Tamaño del modal

    // Formatear la fecha de creación de la solicitud
    const fechaCreacion = solicitud.fechaCreacion;
    const fechaFormateada = format(
        new Date(fechaCreacion),
        "dd/MM/yyyy HH:mm:ss"
    );

    return (
        <center>
            <Card
                mt={10}
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                borderRadius={10}
                bgColor={"#F5F5F5"}
                width={{ base: "10%", sm: "10%", md: "10%", lg: "95%" }}
                height={{ base: "auto", sm: "200px", md: "250px" }}
                onClick={handleOpen}
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
                    maxW={{ base: "100%", sm: "200px", md: "40%" }}
                    maxH={{ base: "200px", sm: "300px", md: "100%" }}
                    src="src/recursos/imagenes/ejemploEvento.jpg"
                    alt="Evento"
                />
                <Stack>
                    <CardBody>
                        <FormControl>
                            <FormLabel mt={2} fontSize="xl">
                                {solicitud.nombre}
                            </FormLabel>
                            <FormLabel mt={2} fontSize="xl">
                                {solicitud.ubicacion.direccion}
                            </FormLabel>
                            <FormLabel mt={2} fontSize="xl">
                                {solicitud.fecha}
                            </FormLabel>
                            <FormLabel mt={2} fontSize="xl">
                                {solicitud.nombreResponsable}
                            </FormLabel>
                        </FormControl>
                    </CardBody>
                    <CardFooter>
                        {solicitud.estado === "Pendiente" && (
                            <Badge
                                colorScheme="yellow"
                                variant="solid"
                                fontSize="md"
                                padding={2.5}
                                borderRadius={15}
                                position="absolute"
                                right={3}
                                bottom={3}
                            >
                                Pendiente
                            </Badge>
                        )}
                        {solicitud.estado === "Aceptado" && (
                            <Badge
                                colorScheme="green"
                                variant="solid"
                                fontSize="md"
                                padding={2.5}
                                borderRadius={15}
                                position="absolute"
                                right={3}
                                bottom={3}
                            >
                                Aceptado
                            </Badge>
                        )}
                        {solicitud.estado === "Rechazado" && (
                            <Badge
                                colorScheme="red"
                                variant="solid"
                                fontSize="md"
                                padding={2.5}
                                borderRadius={15}
                                position="absolute"
                                right={3}
                                bottom={3}
                            >
                                Rechazado
                            </Badge>
                        )}
                    </CardFooter>
                </Stack>
            </Card>
            <Modal isOpen={isOpen} onClose={handleClose} size={modalSize}>
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
                                    {solicitud.id}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Nombre del Evento: </b>
                                    {solicitud.nombre}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Responsable: </b>
                                    {solicitud.nombreResponsable}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Modalidad: </b>
                                    {solicitud.modalidad}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Capacidad: </b>
                                    {solicitud.capacidad}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Valor en Créditos: </b>
                                    {solicitud.valorEnCreditos ? "Sí" : "No"}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Total de Sellos: </b>
                                    {solicitud.totalSellos}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Hora Inicio: </b>
                                    {solicitud.horaInicio}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Hora Fin: </b>
                                    {solicitud.horaFin}
                                </FormLabel>
                                {solicitud.estado === "Pendiente" && (
                                    <>
                                        <FormLabel
                                            mt={3}
                                            fontSize="xl"
                                            color={"red"}
                                        >
                                            <b>Mensaje Responsable: </b>
                                            {solicitud.mensaje}
                                        </FormLabel>
                                        <FormLabel
                                            mt={3}
                                            fontSize="xl"
                                            color={"red"}
                                        >
                                            <b>Recordatorio: </b>
                                            {solicitud.recordatorio}
                                        </FormLabel>
                                    </>
                                )}
                            </FormControl>
                            <FormControl>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Descripción: </b>
                                    {solicitud.descripcion}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Facultad: </b>
                                    {solicitud.ubicacion.facultad}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Estado: </b>
                                    {solicitud.ubicacion.estado}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Campus: </b>
                                    {solicitud.ubicacion.campus}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Ciudad: </b>
                                    {solicitud.ubicacion.ciudad}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Dirección: </b>
                                    {solicitud.ubicacion.direccion}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Aula: </b>
                                    {solicitud.ubicacion.aula}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Fecha: </b>
                                    {solicitud.fecha}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Fecha de envio: </b>
                                    {fechaFormateada}
                                </FormLabel>
                            </FormControl>
                        </div>
                        <Text mb="8px" mt={10}>
                            Notas: {value}
                        </Text>
                        <Textarea
                            value={value}
                            onChange={handleInputChange}
                            placeholder="Agregar observaciones sobre la solicitud"
                            size="sm"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            name="Rechazado"
                            colorScheme="red"
                            mr={10}
                            onClick={eliminarSolicitud}
                            position="absolute"
                            left={10}
                            bottom={5}
                        >
                            Eliminar
                        </Button>
                        <Modal
                            isOpen={showConfirmModal}
                            onClose={handleCancelEliminar}
                        >
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Confirmar eliminacion</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    ¿Seguro que quieres eliminar esta solicitud?
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        colorScheme="green"
                                        mr={3}
                                        onClick={handleCancelEliminar}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        colorScheme="red"
                                        onClick={handleConfirmEliminar}
                                    >
                                        Eliminar
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                        <Button
                            name="Aceptado"
                            colorScheme="green"
                            mr={3}
                            onClick={aceptarSolicitud}
                        >
                            Aceptar
                        </Button>
                        <Button
                            name="Rechazado"
                            colorScheme="red"
                            mr={3}
                            onClick={rechazarSolicitud}
                        >
                            Rechazar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </center>
    );
};
