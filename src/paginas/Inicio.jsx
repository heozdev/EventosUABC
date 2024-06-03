import React, { useState } from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
    {
        src: "src/recursos/imagenes/ejemploEvento.jpg",
        alt: "Evento 1",
        title: "Curso de Programación de JavaScript",
        description: "Se llevara a cabo un curso hablando de conceptos basicos de JavaScript, como funciona y muchas funcionalidades que se pueden realizar dentro del mismo lenguaje.",
        responsable: "Luis Miguel Castilla",
        modalidad: "Presencial",
        facultad: "Ingeniería",
        ciudad: "Mexicali",
        aula: "Laboratorio A",
        fecha: "2024-06-10",
        horaInicio: "17:00",
        horaFin: "18:00",
        sellos: "1",
    },
    {
        src: "src/recursos/imagenes/EventoArt.png",
        alt: "Evento 2",
        title: "Clase de Arte Abstracto",
        description: "Se dara una conferencia tipo clase, para enseñar sobre como fue el inicio del movimiento",
        responsable: "Pablo Pikazo",
        modalidad: "Presencial",
        facultad: "Arquitectura y Diseño",
        ciudad: "Mexicali",
        aula: "Explanada",
        fecha: "2024-06-15",
        horaInicio: "18:00",
        horaFin: "19:00",
        sellos: "1",
    },
    {
        src: "src/recursos/imagenes/EventoRobotica.png",
        alt: "Evento 3",
        title: "Competencias de Robots",
        description: "Se haran luchas entre robots",
        responsable: "Javier Colado",
        modalidad: "Presencial",
        facultad: "Ingeniería",
        ciudad: "Mexicali",
        aula: "Laboratorio C",
        fecha: "2024-06-20",
        horaInicio: "15:00",
        horaFin: "16:00",
        sellos: "3",
    },
];

const Carrusel = ({ images, onOpen, setSelectedEvent }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const openModal = (event) => {
        setSelectedEvent(event);
        onOpen();
    };

    return (
        <Box position="relative" maxW="900px" mx="auto" mt={5}>
            <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    cursor: "pointer",
                }}
                onClick={() => openModal(images[currentIndex])}
            />
            <Flex
                justifyContent="space-between"
                position="absolute"
                w="100%"
                top={120}
            >
                <IconButton
                    icon={<FaChevronLeft style={{ color: "green" }} />}
                    aria-label="Previous"
                    onClick={goToPrevious}
                    variant="ghost"
                    colorScheme="gray"
                    size="lg"
                    fontSize="4xl"
                />
                <IconButton
                    icon={<FaChevronRight style={{ color: "green" }} />}
                    aria-label="Next"
                    onClick={goToNext}
                    variant="ghost"
                    colorScheme="gray"
                    size="lg"
                    fontSize="4xl"
                />
            </Flex>
        </Box>
    );
};

export const Inicio = () => {
    const [rol, setRol] = useState(localStorage.getItem("rol"));
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedEvent, setSelectedEvent] = useState(null);

    const openModal = (event) => {
        setSelectedEvent(event);
        onOpen();
    };

    return (
        <Box>
            <Heading size="xl" color="black" mt={5} textAlign="center">
                Bienvenido {rol}
            </Heading>
            <Text textAlign="center" mt={2} color="black" paddingTop={5}>
                Más importantes
            </Text>
            <Carrusel images={images} onOpen={onOpen} setSelectedEvent={setSelectedEvent} />
            <Text textAlign="center" mt={10} color="black">
                Eventos del día
            </Text>
            <Flex justifyContent="center" mt={5}>
                {images.map((image, index) => (
                    <Box key={index} mx={4}>
                        <img
                            src={image.src}
                            alt={image.alt}
                            style={{
                                width: "300px",
                                height: "200px",
                                objectFit: "cover",
                                cursor: "pointer",
                            }}
                            onClick={() => openModal(image)}
                        />
                    </Box>
                ))}
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selectedEvent?.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <img
                            src={selectedEvent?.src}
                            alt={selectedEvent?.alt}
                            style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                            }}
                        />
                        <Text mt={4} textAlign={"justify"}><b>Descripción:</b> {selectedEvent?.description}</Text>
                        <Text mt={4} textAlign={"justify"}><b>Responsable:</b> {selectedEvent?.responsable}</Text>
                        <Text mt={4} textAlign={"justify"}><b>Modalidad:</b> {selectedEvent?.modalidad}</Text>
                        <Text mt={4} textAlign={"justify"}><b>Facultad:</b> {selectedEvent?.facultad}</Text>
                        <Text mt={4} textAlign={"justify"}><b>Ciudad:</b> {selectedEvent?.ciudad}</Text>
                        <Text mt={4} textAlign={"justify"}><b>Aula:</b> {selectedEvent?.aula}</Text>
                        <Text mt={4} textAlign={"justify"}><b>Fecha:</b> {selectedEvent?.fecha}</Text>
                        <Text mt={4} textAlign={"justify"}><b>Hora Inicio:</b> {selectedEvent?.horaInicio}</Text>
                        <Text mt={4} textAlign={"justify"}><b>Hora Fin:</b> {selectedEvent?.horaFin}</Text>
                        <Text mt={4} textAlign={"justify"}><b>Hora Sellos:</b> {selectedEvent?.sellos}</Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};