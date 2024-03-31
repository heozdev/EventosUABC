import { Container, Grid, GridItem, Heading } from "@chakra-ui/react";
import PanelSolicitud from "../componentes/Solicitud/PanelSolicitud";
import { InformacionPerfil } from "../componentes/Perfil/InformacionPerfil";
import { AccionesPerfil } from "../componentes/Perfil/AccionesPerfil";

export const Perfil = () => {
    return (
        <>
            <Heading pt={10} textAlign={"center"}>
                Perfil
            </Heading>
            <Container>
                <Grid gridTemplateRows={"repeat(2, 1fr)"}>
                    <GridItem>
                        <InformacionPerfil />
                    </GridItem>
                    <GridItem>
                        <AccionesPerfil />
                    </GridItem>
                </Grid>
            </Container>
        </>
    );
};
