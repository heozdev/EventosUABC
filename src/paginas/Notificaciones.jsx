import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Notificacion from "../modelos/Notificacion";
import { SeleccionarNotificacion } from "../componentes/Notificaciones/SeleccionarNotificacion";
import { NotificacionSeleccionada } from "../componentes/Notificaciones/NotificacionSeleccionada";
import "./scrollbar.css";

export const Notificaciones = () => {
    const [notificaciones, setNotificaciones] = useState([]);
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    );
    const [notificacionSeleccionada, setNotificacionSeleccionada] =
        useState(null);

    useEffect(() => {
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
    }, [usuario]);

    return (
        <Box h="100vh" p={5} overflow="hidden">
            <Heading p={10} textAlign="center" as="h2" size="xl">
                Notificaciones
            </Heading>
            {notificaciones.length > 0 ? (
                <Grid
                    h="calc(100% - 200px)"
                    mt={4}
                    templateColumns="repeat(2, 1fr)"
                    gap={4}
                >
                    <GridItem
                        overflowY="auto"
                        borderRight="1px solid gray"
                        h="100%"
                        pr={2}
                        className="custom-scrollbar"
                    >
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
                    <GridItem>
                        {notificacionSeleccionada == null ? (
                            <SeleccionarNotificacion />
                        ) : (
                            <NotificacionSeleccionada
                                notificacionSeleccionada={
                                    notificacionSeleccionada
                                }
                            />
                        )}
                    </GridItem>
                </Grid>
            ) : (
                <Text>No cuenta con notificaciones</Text>
            )}
        </Box>
    );
};
