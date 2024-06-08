import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Center,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Text,
    useDisclosure,
    Card,
    CardBody,
    Stack,
    Heading,
    Image,
    Flex,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";

export const EventosAsistidos = () => {
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    );

    const [eventosAsistidos, setEventosAsistidos] = useState([]);
    const [eventoActual, setEventoActual] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        fetch(`http://localhost:3000/usuarios/${usuario.id}/eventos-asistidos`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Eventos asistidos", data);
                setEventosAsistidos(data);
            })
            .catch((error) => {
                console.error(
                    "Error al obtener los eventos del usuario:",
                    error
                );
            });
    }, [usuario.id]);

    const handleOpenModal = (evento) => {
        setEventoActual(evento);
        onOpen();
    };

    const handleDownloadPDF = () => {
        fetch(
            `http://localhost:3000/usuarios/${usuario.id}/eventos-asistidos/pdf`
        )
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "Carta de Evidencia.pdf");
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch((error) => {
                console.error("Error al descargar el PDF:", error);
            });
    };

    return (
        <Stack spacing={4}>
            {eventosAsistidos.map((eventoAsistido) => (
                <Card
                    key={eventoAsistido.id}
                    mt={3}
                    direction={{ base: "column", sm: "row" }}
                    overflow="hidden"
                    variant="outline"
                    borderRadius={10}
                    bgColor={"#F5F5F5"}
                    cursor="pointer"
                    position="relative"
                    flex={1}
                    transition="transform 0.3s"
                    _hover={{
                        transform: "scale(1.02)",
                        boxShadow: "lg",
                    }}
                >
                    <CardBody>
                        <Heading size="md">
                            {eventoAsistido.solicitud.nombre}
                        </Heading>
                        <Button
                            mt={4}
                            colorScheme="green"
                            onClick={() => handleOpenModal(eventoAsistido)}
                        >
                            Ver Detalles
                        </Button>
                    </CardBody>
                </Card>
            ))}

            {eventoActual && (
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Detalles del Evento Asistido</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>
                                {usuario.nombres} {usuario.apellidos} asistió al
                                evento {eventoActual.solicitud.nombre} el día{" "}
                                {eventoActual.solicitud.fecha} a las{" "}
                                {eventoActual.solicitud.horaInicio}
                            </Text>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme="green"
                                onClick={onClose}
                                mr={3}
                            >
                                Cerrar
                            </Button>
                            <Button
                                colorScheme="green"
                                onClick={handleDownloadPDF}
                            >
                                Obtener carta de evidencia
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </Stack>
    );
};
