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
    const navigate = useNavigate(); // Hook para la navegación programática

    // Maneja el clic en la tarjeta, redirigiendo a la página de detalles del evento
    const handleCardClick = () => {
        navigate(`/eventos/evento-detalles/${evento.id}`);
    };

    console.log(evento); // Imprime el objeto evento en la consola para depuración

    return (
        <Center>
            {evento.estado === "Vigente" && ( // Renderiza la tarjeta solo si el estado del evento es "Vigente"
                <Card
                    mt={10} // Margen superior
                    direction={{ base: "column", sm: "row" }} // Dirección de los elementos: columna en pantallas pequeñas, fila en pantallas más grandes
                    overflow="hidden" 
                    variant="outline" 
                    borderRadius={10} 
                    bgColor={"#F5F5F5"} // Color de fondo
                    width={{ base: "90%", sm: "80%", md: "70%", lg: "60%" }} // Ancho adaptable según el tamaño de la pantalla
                    mx="auto" 
                    height={{ base: "auto", sm: "200px", md: "250px" }} // Altura adaptable según el tamaño de la pantalla
                    cursor="pointer" 
                    transition="transform 0.3s" 
                    _hover={{
                        transform: "scale(1.02)", 
                        boxShadow: "lg", 
                    }}
                    onClick={handleCardClick} // Llama a handleCardClick al hacer clic en la tarjeta
                >
                    {evento.solicitud.valorEnCreditos && (
                        <Text 
                            position="absolute"
                            right={3}
                            top={3}
                            fontWeight="bold"
                        >
                            8=1
                        </Text> 
                    )}
                    <Image
                        objectFit="cover" // Ajusta la imagen para cubrir el contenedor
                        maxW={{ base: "100%", sm: "200px", md: "300px" }} 
                        maxH={{ base: "200px", sm: "300px", md: "100%" }} 
                        src="src/recursos/imagenes/ejemploEvento.jpg" 
                        alt="Evento" 
                    />
                    <Stack spacing={4} p={6}> {/* Contenedor Stack para la disposición en columna con espaciado */}
                        <CardBody>
                            <Heading size="md">{evento.solicitud.nombre}</Heading> 
                            <Text fontSize="sm" color="gray.500" mt={2}>
                                {evento.solicitud.descripcion} 
                            </Text>
                            <HStack mt={4} spacing={4}> {/* Contenedor HStack para la disposición en fila */}
                                <Text fontWeight="bold">Fecha:</Text>
                                <Text>{evento.solicitud.fecha}</Text> 
                            </HStack>
                            <HStack mt={2} spacing={4}> {/* Contenedor HStack para la disposición en fila */}
                                <Text fontWeight="bold">Hora:</Text>
                                <Text>
                                    {evento.solicitud.horaInicio} - {evento.solicitud.horaFin} 
                                </Text>
                            </HStack>
                            <HStack mt={2} spacing={4}> {/* Contenedor HStack para la disposición en fila */}
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
