import { useState } from "react";
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

export const Solicitud = ({ solicitud }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState("");

    const aceptarORechazarEvento = (e) => {
        const estadoEvento = e.target.name;
        const solicitudId = solicitud.id;

        fetch(`http://localhost:3000/solicitudes/${solicitudId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ estado: estadoEvento }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data));

        handleClose();
    };

    const eliminarSolicitud = () => {
        fetch(`http://localhost:3000/solicitud/${solicitud.id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => console.log(data));

        handleClose();
    };

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);
    };

    const [modalSize] = useState("5xl");
    return (
        <center>
            <Card
                mt={10}
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                borderRadius={10}
                bgColor={"#F5F5F5"}
                width={{ base: "100%", sm: "400px", md: "500px", lg: "50%" }}
                height={{ base: "200px", sm: "300px", md: "240px" }}
                onClick={handleOpen}
                cursor="pointer"
            >
                <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "200px", md: "200px" }}
                    maxH={{ base: "200px", sm: "300px", md: "250px" }}
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
                        {solicitud.estado === 'pendiente' && (
                            <Badge colorScheme='yellow'
                                    variant="solid"
                                    fontSize="md"
                                    padding={2.5}
                                    borderRadius={15}
                                    position="absolute"
                                    right={10}
                                    bottom={5}>
                                Pendiente
                            </Badge>
                        )}
                        {solicitud.estado === 'Aceptado' && (
                            <Badge colorScheme='green'
                                    variant="solid"
                                    fontSize="md"
                                    padding={2.5}
                                    borderRadius={15}
                                    position="absolute"
                                    right={10}
                                    bottom={5}>
                                Aceptado
                            </Badge>
                        )}
                        {solicitud.estado === 'Rechazado' && (
                            <Badge colorScheme='red'
                                    variant="solid"
                                    fontSize="md"
                                    padding={2.5}
                                    borderRadius={15}
                                    position="absolute"
                                    right={10}
                                    bottom={5}>
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
                        <div style={{ display: "flex", gap: "10px" }}>
                            <FormControl>
                                <FormLabel mt={2} fontSize="m">
                                    ID del Evento: {solicitud.id}
                                </FormLabel>
                                <FormLabel mt={2} fontSize="m">
                                    Nombre del Evento: {solicitud.nombre}
                                </FormLabel>
                                <FormLabel mt={2} fontSize="m">
                                    Ubicacion: {solicitud.ubicacion.direccion}
                                </FormLabel>
                                <FormLabel mt={2} fontSize="m">
                                    Fecha del Evento: {solicitud.fecha}
                                </FormLabel>
                                <FormLabel mt={2} fontSize="m">
                                    Responsable: {solicitud.responsable}
                                </FormLabel>
                            </FormControl>
                            <FormControl>
                                <FormLabel mt={2} fontSize="m">
                                    Hora Inicio: {solicitud.horaInicio}
                                </FormLabel>
                                <FormLabel mt={2} fontSize="m">
                                    Hora Fin: {solicitud.horaFin}
                                </FormLabel>
                                <FormLabel mt={2} fontSize="m">
                                    Modalidad: {solicitud.modalidad}
                                </FormLabel>
                                <FormLabel mt={2} fontSize="m">
                                    Capacidad: {solicitud.capacidad}
                                </FormLabel>
                                <FormLabel mt={2} fontSize="m">
                                    Total de Sellos: {solicitud.totalSellos}
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
                            name="Aceptado"
                            colorScheme="green"
                            mr={3}
                            onClick={aceptarORechazarEvento}
                        >
                            Aceptar
                        </Button>
                        <Button
                            name="Rechazado"
                            colorScheme="red"
                            mr={3}
                            onClick={aceptarORechazarEvento}
                        >
                            Rechazar
                        </Button>
                        <Button
                            name="Rechazado"
                            colorScheme="red"
                            mr={10}
                            onClick={eliminarSolicitud}
                        >
                            Eliminar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {console.log(solicitud.modalidad)}
            {console.log(solicitud.valorEnCreditos)}
        </center>
    );
};
