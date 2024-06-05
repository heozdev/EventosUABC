import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Heading,
    Text,
    VStack,
    HStack,
    Badge,
    Button,
    useToast,
} from "@chakra-ui/react";

export const DetallesDelEvento = () => {
    const { id } = useParams();
    const [evento, setEvento] = useState(null);
    const toast = useToast();

    useEffect(() => {
        fetch(`http://localhost:3000/eventos/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setEvento(data);
            })
            .catch((error) => {
                console.error("Error al obtener los detalles del evento:", error);
                toast({
                    title: "Error",
                    description: "Hubo un problema al obtener los detalles del evento.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right",
                });
            });
    }, [id, toast]);

    if (!evento) {
        return <div>Cargando...</div>;
    }

    return (
        <Box p={8}>
            <VStack spacing={4} align="stretch">
                <Heading as="h1" size="xl">
                    {evento.solicitud.nombre}
                </Heading>
                <Text fontSize="xl">{evento.solicitud.descripcion}</Text>
                <HStack>
                    <Text fontWeight="bold">Fecha:</Text>
                    <Text>{evento.solicitud.fecha}</Text>
                </HStack>
                <HStack>
                    <Text fontWeight="bold">Hora:</Text>
                    <Text>
                        {evento.solicitud.horaInicio} - {evento.solicitud.horaFin}
                    </Text>
                </HStack>
                <HStack>
                    <Text fontWeight="bold">Ubicación:</Text>
                    <Text>{evento.solicitud.ubicacion?.direccion}</Text>
                </HStack>
                <HStack>
                    <Text fontWeight="bold">Capacidad:</Text>
                    <Text>{evento.solicitud.capacidad}</Text>
                </HStack>
                <HStack>
                    <Text fontWeight="bold">Responsable:</Text>
                    <Text>{evento.solicitud.responsable}</Text>
                </HStack>
                <HStack>
                    <Text fontWeight="bold">Modalidad:</Text>
                    <Text>{evento.solicitud.modalidad}</Text>
                </HStack>
                <HStack>
                    <Text fontWeight="bold">Valor en Créditos:</Text>
                    <Text>{evento.solicitud.valorEnCreditos ? "Sí" : "No"}</Text>
                </HStack>
                <HStack>
                    <Text fontWeight="bold">Total de Sellos:</Text>
                    <Text>{evento.solicitud.totalSellos}</Text>
                </HStack>
                <Badge colorScheme="green" fontSize="lg">
                    {evento.estado}
                </Badge>
                <Button colorScheme="blue" size="lg">
                    Registrarse
                </Button>
            </VStack>
        </Box>
    );
};