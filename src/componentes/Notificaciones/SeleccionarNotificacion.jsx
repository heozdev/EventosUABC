import {
    Box,
    Text,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/react";
import React from "react";

export const SeleccionarNotificacion = () => {
    return (
        <Box
            h={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            p={4}
        >
            <Alert
                status="warning"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="auto"
                bg="none" // Establecer el fondo como transparente
                borderWidth={0} // Establecer el ancho del borde como 0
            >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg" color="black">
                    {" "}
                    {/* Cambiar el color del título a negro */}
                    No ha seleccionado ninguna notificación
                </AlertTitle>
                <AlertDescription maxWidth="sm" color="black">
                    {" "}
                    {/* Cambiar el color del texto a negro */}
                    Seleccione una notificación para abrir su información
                    detallada.
                </AlertDescription>
            </Alert>
        </Box>
    );
};
