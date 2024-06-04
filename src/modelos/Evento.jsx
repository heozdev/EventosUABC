import { useEffect, useState } from "react";
import {
    Center,
    Card,
    CardBody,
    Image,
    Stack,
    FormControl,
    FormLabel,
    Badge,
    CardFooter,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    useToast
} from "@chakra-ui/react";

export const Evento = ({ evento, onDelete }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalSize, setModalSize] = useState("xl");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showRegistrarModal, setShowRegistrarModal] = useState(false);
    const toast = useToast();

    const handleOpen = () => {
        setModalSize("xl");
        onOpen();
    };

    const handleClose = () => {
        onClose();
    };

    const eliminarEvento = () => {
        setShowConfirmModal(true);
    };

    const RegistrarEvento = () => {
        setShowRegistrarModal(true);
    };

    const handleConfirmEliminar = async () => {
        setShowConfirmModal(false);
        onClose();

        try {
            const response = await fetch(`http://localhost:3000/eventos/${evento.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el evento');
            }

            const data = await response.json();
            console.log(data.message);

            onDelete(evento.id);

            toast({
                title: "Solicitud eliminada.",
                description: "La solicitud ha sido eliminada correctamente.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });

        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Hubo un problema al eliminar la solicitud.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
        }
    };

    const handleConfirmRegistrar = async () => {
        setShowRegistrarModal(false);
        onClose();

        try {
            // Fetch the current number of registered participants
            const responseCapacity = await fetch(`http://localhost:3000/eventos/${evento.id}/registrados`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!responseCapacity.ok) {
                throw new Error('Error al verificar la capacidad del evento');
            }

            const dataCapacity = await responseCapacity.json();
            const numeroRegistrados = dataCapacity.numeroRegistrados;

            if (numeroRegistrados >= evento.solicitud.capacidad) {
                toast({
                    title: "Capacidad llena.",
                    description: "No hay cupo disponible para este evento.",
                    status: "warning",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right",
                });
                return;
            }

            // Proceed to register the user if there is capacity
            const responseRegister = await fetch(`http://localhost:3000/eventos/${evento.id}/registrar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!responseRegister.ok) {
                const data = await responseRegister.json();
                throw new Error(data.message || 'Error al registrarse en el evento');
            }

            const data = await responseRegister.json();
            console.log(data.message);

            toast({
                title: "Registro exitoso.",
                description: "Te has registrado correctamente en el evento.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });

        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Hubo un problema al registrarse en el evento.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
        }
    };

    const handleCancelEliminar = () => {
        setShowConfirmModal(false);
    };

    const handleCancelRegistrar = () => {
        setShowRegistrarModal(false);
    };

    return (
        <Center>
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
                                {evento.solicitud.nombre}
                            </FormLabel>
                            <FormLabel mt={2} fontSize="xl">
                                {evento.solicitud.ubicacion?.direccion}
                            </FormLabel>
                            <FormLabel mt={2} fontSize="xl">
                                {evento.solicitud.fecha}
                            </FormLabel>
                            <FormLabel mt={2} fontSize="xl">
                                {evento.solicitud.responsable}
                            </FormLabel>
                        </FormControl>
                    </CardBody>
                    <CardFooter>
                        {evento.estado === "Vigente" && (
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
                                Vigente
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
                                    {evento.id}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Nombre del Evento: </b>
                                    {evento.solicitud.nombre}
                                </FormLabel>
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
                                    <b>Descripción: </b>
                                    {evento.solicitud.descripcion}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Facultad: </b>
                                    {evento.solicitud.ubicacion?.facultad}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Estado: </b>
                                    {evento.solicitud.ubicacion?.estado}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Campus: </b>
                                    {evento.solicitud.ubicacion?.campus}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Salón: </b>
                                    {evento.solicitud.ubicacion?.salon}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Dirección: </b>
                                    {evento.solicitud.ubicacion?.direccion}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Fecha: </b>
                                    {evento.solicitud.fecha}
                                </FormLabel>
                            </FormControl>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={RegistrarEvento}>
                            Registrar
                        </Button>
                        <Button colorScheme="red" mr={3} onClick={eliminarEvento}>
                            Eliminar
                        </Button>
                        <Button variant="ghost" onClick={handleClose}>
                            Cerrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Confirmación de Eliminación */}
            <Modal isOpen={showConfirmModal} onClose={handleCancelEliminar}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirmar Eliminación</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        ¿Estás seguro de que deseas eliminar este evento?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" onClick={handleConfirmEliminar}>
                            Confirmar
                        </Button>
                        <Button variant="ghost" onClick={handleCancelEliminar}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Confirmación de Registro */}
            <Modal isOpen={showRegistrarModal} onClose={handleCancelRegistrar}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirmar Registro</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        ¿Estás seguro de que deseas registrarte en este evento?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleConfirmRegistrar}>
                            Confirmar
                        </Button>
                        <Button variant="ghost" onClick={handleCancelRegistrar}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Center>
    );
};
