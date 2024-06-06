import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Heading,
    Text,
    VStack,
    Button,
    useToast,
    Image,
    Grid,
    Center,
    FormControl,
    FormLabel,
    CloseButton,
} from "@chakra-ui/react";

export const DetallesDelEvento = () => {
    const { id } = useParams();
    const [evento, setEvento] = useState(null);
    const toast = useToast();
    const [asistira,setAsistira] = useState(false);

    

    const handleRegistroEvento = () => {
        try {
            const usuarioJSON = localStorage.getItem("usuario");

            if (!usuarioJSON) {
                throw new Error(
                    "No hay datos de usuario almacenados en localStorage"
                );
            }
            const usuario = JSON.parse(usuarioJSON);

            const eventoId = evento.id;

            const data = {
                usuarioId: usuario.id,
                eventoId: eventoId,
            };

            console.log(JSON.stringify(data));

            fetch(`http://localhost:3000/asistencias`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);
                    toast({
                        title:"Registro exitoso",
                        description:"Se ha registrado correctamente al evento",
                        status:"success",
                        duration:3000,
                        isClosable:true,
                        position:"top-right"
                    });
                    setAsistira(true);
                })
                .catch((error) => {
                    console.error("Error al registrar la asistencia:", error);
                    toast({
                        title: "Error",
                        description: "Hubo un error al registrar tu asistencia.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position:"top-right"
                    });
                });
        } catch (error) {
            console.error("Error al procesar los datos del usuario:", error);
            toast({
                title: "Error",
                description: "Hubo un error al procesar los datos del usuario.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position:"top-right"
            });
        }
    };

    const handleCancelarAsistencia = () => {
        try {
            const usuarioJSON = localStorage.getItem("usuario");
    
            if (!usuarioJSON) {
                throw new Error(
                    "No hay datos de usuario almacenados en localStorage"
                );
            }
            const usuario = JSON.parse(usuarioJSON);
    
            fetch("http://localhost:3000/asistencias", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    usuarioId: usuario.id,
                    eventoId: evento.id
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((responseData) => {
                    console.log(responseData);
                    toast({
                        title: "Cancelación exitosa",
                        description: "Se ha cancelado tu asistencia al evento.",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right"
                    });
                    setAsistira(false); 
                })
                .catch((error) => {
                    console.error("Error al cancelar la asistencia:", error);
                    toast({
                        title: "Error",
                        description: "Hubo un error al cancelar tu asistencia.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right"
                    });
                });
        } catch (error) {
            console.error("Error al procesar los datos del usuario:", error);
            toast({
                title: "Error",
                description: "Hubo un error al procesar los datos del usuario.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            });
        }
    };
    
      // Maneja el cambio entre botones basado en asistira
    const handleToggleAsistencia = () => {
        if (asistira) {
            handleCancelarAsistencia();
        } else {
            handleRegistroEvento();
        }
    };

    useEffect(() => {
        
        fetch(`http://localhost:3000/eventos/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setEvento(data);
            })
            .catch((error) => {
                console.error(
                    "Error al obtener los detalles del evento:",
                    error
                );
                toast({
                    title: "Error",
                    description:
                        "Hubo un problema al obtener los detalles del evento.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right",
                });
            });
    }, []);


    if (!evento) {
        return <div>Cargando...</div>;
    }

    function CloseButtonLink() {
        return (
            <a
                href="/eventos"
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "50px",
                    textDecoration: "none",
                }}
            >
                <CloseButton size="lg" />
            </a>
        );
    }

    return (
        <Box p={8}>
            <CloseButtonLink />
            <Heading as="h1" size="xl" textAlign={"center"}>
                {evento.solicitud.nombre}
            </Heading>
            <Center>
                <VStack
                    display="grid"
                    gridTemplateColumns={"1fr 1fr"}
                    align="stretch"
                    mt={10}
                    width={"50%"}
                >
                    <Image
                        src="/src/recursos/imagenes/ejemploEvento.jpg"
                        alt="Imagen del evento"
                        objectFit="cover"
                        width="70%"
                        height="200px"
                        borderRadius="md"
                    />
                    <Text fontSize="xl" textAlign={"justify"}>
                        {evento.solicitud.descripcion}
                    </Text>
                </VStack>
            </Center>
            <Center>
                <Grid
                    templateColumns="repeat(2, 1fr)"
                    gap={4}
                    width={"50%"}
                    mt={10}
                >
                    <FormControl>
                        <FormLabel mt={3} fontSize="m">
                            <b>Responsable: </b>
                            {evento.solicitud.responsable}
                        </FormLabel>
                        <FormLabel mt={3} fontSize="m">
                            <b>Modalidad: </b>
                            {evento.solicitud.modalidad}
                        </FormLabel>
                        <FormLabel mt={3} fontSize="m">
                            <b>Capacidad: </b>
                            {evento.solicitud.capacidad}
                        </FormLabel>
                        <FormLabel mt={3} fontSize="m">
                            <b>Valor en Créditos: </b>
                            {evento.solicitud.valorEnCreditos ? "Sí" : "No"}
                        </FormLabel>
                        <FormLabel mt={3} fontSize="m">
                            <b>Total de Sellos: </b>
                            {evento.solicitud.totalSellos}
                        </FormLabel>
                        <FormLabel mt={3} fontSize="m">
                            <b>Hora Inicio: </b>
                            {evento.solicitud.horaInicio}
                        </FormLabel>
                        <FormLabel mt={3} fontSize="m">
                            <b>Hora Fin: </b>
                            {evento.solicitud.horaFin}
                        </FormLabel>
                    </FormControl>
                    <FormControl>
                        <FormLabel mt={3} fontSize="m">
                            <b>Facultad: </b>
                            {evento.solicitud.ubicacion.facultad}
                        </FormLabel>
                        <FormLabel mt={3} fontSize="m">
                            <b>Estado: </b>
                            {evento.solicitud.ubicacion.estado}
                        </FormLabel>
                        <FormLabel mt={3} fontSize="m">
                            <b>Campus: </b>
                            {evento.solicitud.ubicacion.campus}
                        </FormLabel>
                        <FormLabel mt={3} fontSize="m">
                            <b>Ciudad: </b>
                            {evento.solicitud.ubicacion.ciudad}
                        </FormLabel>
                        <FormLabel mt={3} fontSize="m">
                            <b>Dirección: </b>
                            {evento.solicitud.ubicacion.direccion}
                        </FormLabel>
                        <FormLabel mt={3} fontSize="m">
                            <b>Aula: </b>
                            {evento.solicitud.ubicacion.aula}
                        </FormLabel>
                        <FormLabel mt={3} fontSize="m">
                            <b>Fecha: </b>
                            {evento.solicitud.fecha}
                        </FormLabel>
                    </FormControl>
                </Grid>
            </Center>
            <Center>
                <Button
                    colorScheme="green"
                    size="lg"
                    mt={10}
                    onClick={handleToggleAsistencia}
                    style={{ display: asistira ? "none" : "block" }}
                >
                    {asistira ? "Cancelar asistencia" : "Asistiré"}
                </Button>

                <Button
                    colorScheme="red"
                    size="lg"
                    mt={10}
                    onClick={handleToggleAsistencia}
                    style={{ display: asistira ? "block" : "none" }}
                >
                   {asistira ? "Cancelar asistencia" : "Asistiré"}
                </Button>
            </Center>
        </Box>
    );
};
