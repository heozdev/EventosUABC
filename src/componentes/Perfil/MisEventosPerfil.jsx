import { useEffect, useState } from "react";
import { Card, Text, Badge, Stack, Box } from "@chakra-ui/react";
import { format } from "date-fns";

export const MisEventosPerfil = () => {
    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/solicitudes")
            .then((response) => response.json())
            .then((data) => {
                // Filtrar las solicitudes para mostrar solo las que tienen estado "Pendiente"
                const pendientes = data.filter(
                    (solicitud) => solicitud.estado === "Aceptado" 
                );
                setSolicitudes(pendientes);
            });
    }, []);

    return (
        <Stack spacing={4}>
            {solicitudes.map((solicitud) => {
                const fechaCreacion = solicitud.fechaCreacion;
                const fechaFormateada = format(new Date(fechaCreacion), 'dd/MM/yyyy HH:mm:ss');

                return (
                    <Card
                        key={solicitud.id}
                        p={5}
                        shadow="md"
                        borderWidth="1px"
                        bgColor={"#F5F5F5"}
                    >
                        <Text fontSize="xl" fontWeight="bold" mb={2}>
                            Nombre del evento: {solicitud.nombre}
                        </Text>
                        <Text fontSize="xl" fontWeight="bold" mb={2}>
                            Responsable del evento: {solicitud.responsable}
                        </Text>
                        <Text fontSize="md" mb={2}>
                            Fecha de Creación: {fechaFormateada}
                        </Text>
                        <Box>
                            <Badge
                                display="inline-block"
                                colorScheme="green"
                                variant="solid"
                                fontSize="md"
                                padding={2.5}
                                borderRadius={15}
                            >
                                {solicitud.estado}
                            </Badge>
                        </Box>
                    </Card>
                );
            })}
        </Stack>
    );
};
