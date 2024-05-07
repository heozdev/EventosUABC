import React, { useState } from "react";
import { Box, Flex, Heading, Text, IconButton } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
    "src/recursos/imagenes/ejemploEvento.jpg",
    "src/recursos/imagenes/EventoArt.png",
    "src/recursos/imagenes/EventoRobotica.png",
];

const Carrusel = ({ images }) => {
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

    return (
        <Box position="relative" maxW="900px" mx="auto" mt={5}>
            <img
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
            <Flex justifyContent="space-between" position="absolute" w="100%" top={120}>
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
    return (
        <Box>
            <Heading size="xl" color="black" mt={5} textAlign="center">
                Bienvenido Encargado
            </Heading>
            <Text textAlign="center" mt={2} color="black" paddingTop={5}>
                Más importantes
            </Text>
            <Carrusel images={images} />
            <Text textAlign="center" mt={10} color="black">
                Eventos del día
            </Text>
            <Flex justifyContent="center" mt={5}>
                {images.map((image, index) => (
                    <Box key={index} mx={4}>
                        <img
                            src={image}
                            alt={`Image ${index + 1}`}
                            style={{ width: "300px", height: "200px", objectFit: "cover" }}
                        />
                    </Box>
                ))}
            </Flex>
        </Box>
    );
};
