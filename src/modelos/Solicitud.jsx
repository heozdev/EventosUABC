import { useState } from "react";
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
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

import Solicitud1 from "../componentes/Solicitud/FormatoSolicitud1";
import Solicitud2 from "../componentes/Solicitud/FormatoSolicitud2";

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
                            <Grid
                                templateColumns={{
                                    base: "1fr",
                                    md: "repeat(2, 1fr)",
                                }}
                                gap={6}
                            >
                                <GridItem>
                                    <FormLabel mt={2} fontSize="xl">
                                        {solicitud.nombre}
                                    </FormLabel>
                                    <FormLabel mt={2} fontSize="xl">
                                        {solicitud.ubicacion.facultad}
                                    </FormLabel>
                                    <FormLabel mt={2} fontSize="xl">
                                        {solicitud.fecha}
                                    </FormLabel>
                                    <FormLabel mt={2} fontSize="xl">
                                        {solicitud.responsable}
                                    </FormLabel>
                                </GridItem>
                                <GridItem>
                                    <Badge
                                        colorScheme="green"
                                        variant="solid"
                                        fontSize="md"
                                        padding={2.5}
                                        borderRadius={15}
                                        position="absolute"
                                        right={0}
                                        bottom={0}
                                    >
                                        {solicitud.estado}
                                    </Badge>
                                </GridItem>
                            </Grid>
                        </FormControl>
                    </CardBody>
                    <CardFooter></CardFooter>
                </Stack>
            </Card>
            <Modal isOpen={isOpen} onClose={handleClose} size={modalSize}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Información del Evento</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Solicitud1 />
                            <Solicitud2 />
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
        </center>
    );
};
