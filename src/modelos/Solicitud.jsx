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
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const toast = useToast();

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

        handleClose();
    };

    const rechazarSolicitud = () => {
        if (!value.trim()) {
            // Verificar si se ha ingresado alguna nota antes de rechazar la solicitud
            toast({
                title: "Error",
                description:
                    "Agrega observaciones antes de rechazar una solicitud",
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
                updateSolicitudes();
                if (estadoEvento === "Rechazado") {
                    // Mostrar mensaje de exito solo si se rechaza la solicitud
                    toast({
                        title: "Solicitud rechazada",
                        description:
                            "La solicitud ha sido rechazada correctamente.",
                        status: "success",
                        position: "top-right",
                        duration: 3000,
                        isClosable: true,
                    });
                } else {
                    // Mostrar mensaje de exito para lo demas
                    toast({
                        title: "Solicitud enviada",
                        description: "La solicitud fue aceptada correctamente.",
                        status: "success",
                        position: "top-right",
                        duration: 3000,
                        isClosable: true,
                    });
                }
            });

        handleClose();
    };

    const eliminarSolicitud = () => {
        setShowConfirmModal(true);
    };

    const handleConfirmEliminar = () => {
        fetch(`http://localhost:3000/solicitud/${solicitud.id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => {
                updateSolicitudes();
                toast({
                    title: "Solicitud eliminada",
                    description:
                        "La solicitud ha sido eliminada correctamente.",
                    status: "success",
                    position: "top-right",
                    duration: 3000,
                    isClosable: true,
                });
            });

        handleClose();
        setShowConfirmModal(false);
    };

    const handleCancelEliminar = () => {
        setShowConfirmModal(false);
    };

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);
    };

    const [modalSize] = useState("5xl");

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
            >
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
                                {solicitud.responsable}
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
                                    {solicitud.responsable}
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
                                    {solicitud.valorEnCreditos}
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
                                        <FormLabel mt={3} fontSize="xl" color={"red"}>
                                            <b>Mensaje Responsable: </b>
                                            {solicitud.mensaje}
                                        </FormLabel>
                                        <FormLabel mt={3} fontSize="xl" color={"red"}>
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
