import {
    Box,
    Flex,
    Heading,
    Icon,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FiAlertCircle } from "react-icons/fi";

export const NotificacionSeleccionada = ({ notificacionSeleccionada }) => {
    const textColor = useColorModeValue("gray.800", "white");

    return (
        <Box p={5}>
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
        </Box>
    );
};
