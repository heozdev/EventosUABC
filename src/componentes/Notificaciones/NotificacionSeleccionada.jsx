import {
    Box,
    Button,
    Flex,
    Heading,
    Icon,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const NotificacionSeleccionada = ({
    usuario,
    setNotificaciones,
    notificacionSeleccionada,
    setNotificacionSeleccionada,
}) => {
    const textColor = useColorModeValue("gray.800", "white");
    console.log(notificacionSeleccionada);

    const eliminarNotificacion = () => {
        fetch(
            `http://localhost:3000/notificaciones/${notificacionSeleccionada.id}`,
            {
                method: "DELETE",
            }
        )
            .then((resp) => resp.json())
            .then((data) => {
                setNotificaciones((prevNotificaciones) =>
                    prevNotificaciones.filter(
                        (notificacion) =>
                            notificacion.id !== notificacionSeleccionada.id
                    )
                );
            });

        setNotificacionSeleccionada(null);
    };

    const marcarNotificacionLeida = () => {};

    return (
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
                <Box mt={"30px"}>
                    <Text as="span" fontWeight="bold">
                        Descripción:
                    </Text>{" "}
                    <Text as="span" fontWeight={"semibold"}>
                        {notificacionSeleccionada.mensaje}
                    </Text>
                </Box>
            </Box>
            <Flex
                position={"absolute"}
                bottom={10}
                gap={"10px"}
                justifyContent={"center"}
                width={"100%"}
            >
                <Button
                    colorScheme="blue"
                    variant={"outline"}
                    onClick={marcarNotificacionLeida}
                >
                    Marcar como leida
                </Button>
                <Button colorScheme="red" onClick={eliminarNotificacion}>
                    Eliminar notificacion
                </Button>
            </Flex>
        </Box>
    );
};
