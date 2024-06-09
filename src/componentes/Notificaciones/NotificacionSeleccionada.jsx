import {
    Box,
    Button,
    Flex,
    Heading,
    Text,
    useColorModeValue,
} from "@chakra-ui/react"; // Importa componentes de Chakra UI para la interfaz de usuario
import React from "react"; // Importa React
import { FiAlertCircle } from "react-icons/fi"; // Importa un ícono específico de react-icons
import { useNavigate } from "react-router-dom"; // Importa hook para la navegación

// Componente que muestra la notificación seleccionada
export const NotificacionSeleccionada = ({
    usuario,
    setNotificaciones,
    notificacionSeleccionada,
    setNotificacionSeleccionada,
}) => {
    // Hook para cambiar el color del texto dependiendo del modo de color (claro/oscuro)
    const textColor = useColorModeValue("gray.800", "white");

    // Función para eliminar una notificación
    const eliminarNotificacion = () => {
        fetch(
            `http://localhost:3000/notificaciones/${notificacionSeleccionada.id}`,
            {
                method: "DELETE", // Método DELETE para eliminar la notificación
            }
        )
            .then((resp) => resp.json())
            .then((data) => {
                // Actualiza el estado de las notificaciones filtrando la notificación eliminada
                setNotificaciones((prevNotificaciones) =>
                    prevNotificaciones.filter(
                        (notificacion) =>
                            notificacion.id !== notificacionSeleccionada.id
                    )
                );
            });

        // Reinicia la notificación seleccionada a null
        setNotificacionSeleccionada(null);
    };

<<<<<<< HEAD
    // Función para marcar una notificación como leída (vacía por ahora)
    const marcarNotificacionLeida = () => {};
=======
    const marcarNotificacionLeida = () => {
        fetch(
            `http://localhost:3000/notificaciones/${notificacionSeleccionada.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    leida: true,
                }),
            }
        )
            .then((resp) => resp.json())
            .then((data) => {
                setNotificacionSeleccionada((prevNotificacion) => ({
                    ...prevNotificacion,
                    leida: true,
                }));

                // Actualizar el estado de la notificación en la lista de notificaciones
                setNotificaciones((prevNotificaciones) =>
                    prevNotificaciones.map((notificacion) =>
                        notificacion.id === notificacionSeleccionada.id
                            ? { ...notificacion, leida: true }
                            : notificacion
                    )
                );

                console.log(data);
            });
    };
>>>>>>> bf441a589c07cd73c965835f95908f2cc529b96a

    return (
        // Caja principal que contiene la información de la notificación
        <Box h={"100%"} p={5} position={"relative"}>
            <Heading
                as="h4"
                size="md"
                textAlign="center"
                color={textColor}
                mb={4}
            >
                Información de la Notificación
            </Heading>
            <Box fontSize="lg" color={textColor}>
                {/* Muestra el título de la notificación */}
                <Box mt={"30px"}>
                    <Text as="span" fontWeight="bold">
                        Título:
                    </Text>{" "}
                    <Text as="span" fontWeight={"semibold"}>
                        {
                            notificacionSeleccionada.tipoDeNotificacion
                                .tipoDeNotificacion
                        }
                    </Text>
                </Box>
                <br />
                {/* Muestra la descripción de la notificación */}
                <Box mt={"30px"}>
                    <Text as="span" fontWeight="bold">
                        Descripción:
                    </Text>{" "}
                    <Text as="span" fontWeight={"semibold"}>
                        {notificacionSeleccionada.mensaje}
                    </Text>
                </Box>
            </Box>
            {/* Botones para marcar la notificación como leída o eliminarla */}
            <Flex
                position={"absolute"}
                bottom={10}
                gap={"10px"}
                justifyContent={"center"}
                width={"100%"}
            >
                {!notificacionSeleccionada.leida && (
                    <Button
                        colorScheme="blue"
                        variant={"outline"}
                        onClick={marcarNotificacionLeida}
                    >
                        Marcar como leída
                    </Button>
                )}

                <Button colorScheme="red" onClick={eliminarNotificacion}>
                    Eliminar notificación
                </Button>
            </Flex>
        </Box>
    );
};
