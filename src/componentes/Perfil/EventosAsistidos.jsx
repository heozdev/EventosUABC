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

// Componente principal para mostrar eventos asistidos por el usuario
export const EventosAsistidos = () => {
    // Estado para almacenar la información del usuario desde el localStorage
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    );

    // Estado para almacenar los eventos a los que ha asistido el usuario
    const [eventosAsistidos, setEventosAsistidos] = useState([]);

    // Estado para almacenar el evento actual seleccionado
    const [eventoActual, setEventoActual] = useState(null);

    // Hooks de Chakra UI para controlar el estado del modal
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Hook de efecto para obtener los eventos asistidos del usuario desde el servidor
    useEffect(() => {
        fetch(`http://localhost:3000/usuarios/${usuario.id}/eventos-asistidos`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Eventos asistidos", data); // Log de los eventos asistidos
                setEventosAsistidos(data); // Actualiza el estado con los eventos obtenidos
            })
            .catch((error) => {
                console.error(
                    "Error al obtener los eventos del usuario:",
                    error
                );
            });
    }, [usuario.id]); 

    // Función para abrir el modal y establecer el evento actual
    const handleOpenModal = (evento) => {
        setEventoActual(evento);
        onOpen(); // Abre el modal
    };

    // Función para descargar el PDF de la carta de evidencia
    const handleDownloadPDF = () => {
        fetch(
            `http://localhost:3000/usuarios/${usuario.id}/eventos-asistidos/pdf`
        )
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob])); // Crea una URL para el archivo PDF
                const link = document.createElement("a"); // Crea un enlace para descargar el PDF
                link.href = url;
                link.setAttribute("download", "Carta de Evidencia.pdf"); // Establece el nombre del archivo
                document.body.appendChild(link);
                link.click(); // Simula un clic en el enlace para iniciar la descarga
                link.parentNode.removeChild(link); // Elimina el enlace del DOM
            })
            .catch((error) => {
                console.error("Error al descargar el PDF:", error); // Log de error
            });
    };

    return (
        <Stack spacing={4}>
            {/* Mapea y renderiza los eventos asistidos */}
            {eventosAsistidos.map((eventoAsistido) => (
                <Card
                    key={eventoAsistido.id} // Establece una clave única para cada evento
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
                            {eventoAsistido.solicitud.nombre} {/* Muestra el nombre del evento */}
                        </Heading>
                        <Button
                            mt={4}
                            colorScheme="green"
                            onClick={() => handleOpenModal(eventoAsistido)} // Llama a la función para abrir el modal
                        >
                            Ver Detalles
                        </Button>
                    </CardBody>
                </Card>
            ))}

            {/* Modal para mostrar los detalles del evento actual */}
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
                                {eventoActual.solicitud.horaInicio} con el valor 
                                en créditos de {eventoActual.solicitud.totalSellos}
                                {" "}sellos {/* Muestra la información del evento asistido */}
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
                            {usuario.tipoUsuario.rol === "Alumno" && (
                            <Button
                                colorScheme="green"
                                onClick={handleDownloadPDF} // Llama a la función para descargar el PDF
                            >
                                Obtener carta de evidencia
                            </Button>
                            )}
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </Stack>
    );
};
