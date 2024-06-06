import { Box, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Notificacion from "../modelos/Notificacion";

export const Notificaciones = () => {
    const [notificaciones, setNotificaciones] = useState([]);
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    );

    useEffect(() => {
        console.log(usuario);
        if (usuario) {
            fetch(
                `http://localhost:3000/usuarios/${usuario.id}/notificaciones`,
                {
                    method: "GET",
                }
            )
                .then((response) => response.json())
                .then((data) => setNotificaciones(data))
                .catch((error) =>
                    console.error(
                        "Error al obtener las notificaciones: ",
                        error
                    )
                );
        }
    }, []);

    return (
        <Box p={5}>
            <VStack spacing={4}>
                {notificaciones.map((notificacion) => (
                    <Notificacion
                        key={notificacion.id}
                        usuario={usuario}
                        mensaje={notificacion.mensaje}
                        leida={notificacion.leida}
                        timestamp={new Date(
                            notificacion.createdAt
                        ).toLocaleString()}
                    />
                ))}
            </VStack>
        </Box>
    );
};
