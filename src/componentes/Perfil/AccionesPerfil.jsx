import {
    Center,
    Tab,
    TabIndicator,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Box
} from "@chakra-ui/react";
import { MisEventosPerfil } from "./MisEventosPerfil";
import { MisSolicitudesPerfil } from "./MisSolicitudesPerfil";
import {AgregarSolicitud} from "./AgregarSolicitud";



export const AccionesPerfil = () => {
    return (
        <Center >
            <Box width="100%">
                <Tabs mt={10} position="relative" variant="unstyled">
                    <TabList justifyContent="center">
                        <Tab>Mis solicitudes</Tab>
                        <Tab>Mis eventos</Tab>
                        <Tab>Agregar solicitud</Tab>
                    </TabList>
                    <TabIndicator
                        mt="-1.5px"
                        height="2px"
                        bg="#00723F"
                        borderRadius="1px"
                    />
                    <TabPanels>
                        <TabPanel>
                            <MisSolicitudesPerfil />
                        </TabPanel>
                        <TabPanel>
                            <MisEventosPerfil />
                        </TabPanel>
                        <TabPanel>
                            <AgregarSolicitud/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Center>
    );
};
