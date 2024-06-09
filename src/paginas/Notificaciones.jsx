import {
    Box,
    Grid,
    GridItem,
    Heading,
    Text,
    Center,
    Icon,
} from "@chakra-ui/react"; 
import { FiAlertCircle } from "react-icons/fi"; 
import { useEffect, useState } from "react"; 
import Notificacion from "../modelos/Notificacion"; 
import { SeleccionarNotificacion } from "../componentes/Notificaciones/SeleccionarNotificacion"; 
import { NotificacionSeleccionada } from "../componentes/Notificaciones/NotificacionSeleccionada"; 
import "./scrollbar.css"; // Importa estilos para la barra de desplazamiento personalizada

export const Notificaciones = () => {
    // Define estados para las notificaciones, el usuario y la notificación seleccionada
    const [notificaciones, setNotificaciones] = useState([]);
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    );
    const [notificacionSeleccionada, setNotificacionSeleccionada] =
        useState(null);

    // Efecto que se ejecuta cuando cambia el estado del usuario
    useEffect(() => {
        // Si hay un usuario definido
        if (usuario) {
            // Realiza una solicitud GET al servidor para obtener las notificaciones del usuario
            fetch(
                `http://localhost:3000/usuarios/${usuario.id}/notificaciones`,
                {
                    method: "GET",
                }
            )
                .then((response) => response.json())
                .then((data) => setNotificaciones(data.reverse())) // Actualiza el estado de las notificaciones con los datos recibidos, invirtiendo el orden
                .catch((error) =>
                    console.error(
                        "Error al obtener las notificaciones: ",
                        error
                    )
                );
        }
    }, [usuario]); // Se ejecuta cuando el estado del usuario cambia

    return (
        // Contenedor principal de la página de notificaciones
        <Box h="100vh" p={5} overflow="hidden">
            <Heading p={10} textAlign="center" as="h2" size="xl">
                Notificaciones
            </Heading>

            {/* Condición para renderizar las notificaciones */}
            {notificaciones.length > 0 ? (
                // Si hay notificaciones disponibles
                <Grid
                    h="calc(100% - 200px)"
                    mt={4}
                    templateColumns="repeat(2, 1fr)"
                    gap={4}
                >
                    {/* Columna de la izquierda para mostrar la lista de notificaciones */}
                    <GridItem
                        overflowY="auto"
                        borderRight="1px solid gray"
                        h="100%"
                        pr={2}
                        className="custom-scrollbar"
                    >
                        {/* Mapea cada notificación y renderiza el componente de Notificación */}
                        {notificaciones.map((notificacion) => (
                            <Notificacion
                                setNotificacionSeleccionada={
                                    setNotificacionSeleccionada
                                }
                                key={notificacion.id}
                                notificacion={notificacion}
                            />
                        ))}
                    </GridItem>

                    {/* Columna de la derecha para mostrar los detalles de la notificación seleccionada */}
                    <GridItem>
                        {/* Condición para renderizar el componente de Notificación Seleccionada */}
                        {notificacionSeleccionada == null ? (
                            // Si no se ha seleccionado ninguna notificación, muestra el componente de Selección de Notificación
                            <SeleccionarNotificacion />
                        ) : (
                            // Si se ha seleccionado una notificación, muestra el componente de Notificación Seleccionada
                            <NotificacionSeleccionada
                                usuario={usuario}
                                setNotificaciones={setNotificaciones}
                                notificacionSeleccionada={
                                    notificacionSeleccionada
                                }
                                setNotificacionSeleccionada={
                                    setNotificacionSeleccionada
                                }
                            />
                        )}
                    </GridItem>
                </Grid>
            ) : (
                // Si no hay notificaciones disponibles, muestra un mensaje de alerta
                <Center h="calc(100% - 200px)">
                    <Box textAlign="center">
                        <Icon
                            as={FiAlertCircle}
                            w={16}
                            h={16}
                            color="gray.500"
                        />
                        <Text mt={4} fontSize="xl">
                            No cuenta con notificaciones
                        </Text>
                    </Box>
                </Center>
            )}
        </Box>
    );
};
