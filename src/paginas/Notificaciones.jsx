import { Box, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Notificacion from "../modelos/Notificacion";

export const Notificaciones = () => {
    const [notificaciones, setNotificaciones] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/notificaciones", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => setNotificaciones(data));
    }, []);

    return (
        <Box p={5}>
            <VStack spacing={4}>
                {notificaciones.map((notificacion) => (
                    <Notificacion
                        key={notificacion.id}
                        usuario={notificacion.usuario} // Suponiendo que 'usuario' está anidado en 'notificacion'
                        mensaje={notificacion.mensaje}
                        leida={notificacion.leida}
                        timestamp={new Date(
                            notificacion.createdAt
                        ).toLocaleString()} // Suponiendo que tienes un campo 'createdAt'
                    />
                ))}
            </VStack>
        </Box>
    );
};
