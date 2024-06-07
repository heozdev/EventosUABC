import {
    Center,
    Card,
    CardBody,
    Image,
    Stack,
    Badge,
    CardFooter,
    Heading,
    Text,
    HStack
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Evento = ({ evento }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/eventos/evento-detalles/${evento.id}`);
    };

    console.log(evento);
    return (
        <Center>
            {evento.estado === "Vigente" && (
                <Card
                    mt={10}
                    direction={{ base: "column", sm: "row" }}
                    overflow="hidden"
                    variant="outline"
                    borderRadius={10}
                    bgColor={"#F5F5F5"}
                    width={{ base: "90%", sm: "80%", md: "70%", lg: "60%" }}
                    mx="auto"
                    height={{ base: "auto", sm: "200px", md: "250px" }}
                    cursor="pointer"
                    transition="transform 0.3s"
                    _hover={{
                        transform: "scale(1.02)",
                        boxShadow: "lg",
                    }}
                    onClick={handleCardClick}
                >
                    {evento.solicitud.valorEnCreditos && <Text 
                            position="absolute"
                            right={3}
                            top={3}
                            fontWeight="bold"
                        >8=1</Text> 
                    }
                    <Image
                        objectFit="cover"
                        maxW={{ base: "100%", sm: "200px", md: "300px" }}
                        maxH={{ base: "200px", sm: "300px", md: "100%" }}
                        src="src/recursos/imagenes/ejemploEvento.jpg"
                        alt="Evento"
                    />
                    <Stack spacing={4} p={6}>
                        <CardBody>
                            <Heading size="md">{evento.solicitud.nombre}</Heading>
                            <Text fontSize="sm" color="gray.500" mt={2}>
                                {evento.solicitud.descripcion}
                            </Text>
                            <HStack mt={4} spacing={4}>
                                <Text fontWeight="bold">Fecha:</Text>
                                <Text>{evento.solicitud.fecha}</Text>
                            </HStack>
                            <HStack mt={2} spacing={4}>
                                <Text fontWeight="bold">Hora:</Text>
                                <Text>
                                    {evento.solicitud.horaInicio} - {evento.solicitud.horaFin}
                                </Text>
                            </HStack>
                            <HStack mt={2} spacing={4}>
                                <Text fontWeight="bold">Ubicación:</Text>
                                <Text>{evento.solicitud.ubicacion?.direccion}</Text>
                            </HStack>
                        </CardBody>
                        <CardFooter>
                            <Badge
                                colorScheme="green"
                                variant="solid"
                                fontSize="md"
                                padding={2.5}
                                borderRadius={15}
                                position="absolute"
                                right={10}
                                bottom={5}
                            >
                                Vigente
                            </Badge>
                        </CardFooter>
                    </Stack>
                </Card>
            )}
        </Center>
    );
};