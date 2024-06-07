import {
    Center,
    Tab,
    TabIndicator,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Box,
} from "@chakra-ui/react";
import { MisEventosPerfil } from "./MisEventosPerfil";
import { MisSolicitudesPerfil } from "./MisSolicitudesPerfil";
import { AgregarSolicitud } from "./AgregarSolicitud";
import { useEffect, useState } from "react";
import { EventosAsistidos } from "./EventosAsistidos";

export const AccionesPerfil = () => {
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    );

    useEffect(() => {
        setUsuario(JSON.parse(localStorage.getItem("usuario")));
    }, []);

    return (
        <Center>
            <Box width="100%">
                <Tabs mt={10} position="relative" variant="unstyled">
                    <TabList justifyContent="center">
                        {usuario.tipoUsuario.rol != "Alumno" && (
                            <Tab>Mis solicitudes</Tab>
                        )}
                        {usuario.tipoUsuario.rol != "Alumno" && (
                            <Tab>Mis eventos</Tab>
                        )}

                        <Tab>Eventos asistidos</Tab>
                    </TabList>
                    <TabIndicator
                        mt="-1.5px"
                        height="2px"
                        bg="#00723F"
                        borderRadius="1px"
                    />
                    <TabPanels>
                        {usuario.tipoUsuario.rol != "Alumno" && (
                            <TabPanel>
                                <MisSolicitudesPerfil />
                            </TabPanel>
                        )}
                        {usuario.tipoUsuario.rol != "Alumno" && (
                            <TabPanel>
                                <MisEventosPerfil />
                            </TabPanel>
                        )}

                        <TabPanel>
                            <EventosAsistidos />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Center>
    );
};
