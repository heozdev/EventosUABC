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
                variant="left-accent"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="auto"
            >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                    No ha seleccionado ninguna notificación
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                    Seleccione una notificación para abrir su información
                    detallada.
                </AlertDescription>
            </Alert>
        </Box>
    );
};
