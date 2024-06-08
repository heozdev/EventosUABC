import { Container, Grid, GridItem, Heading } from "@chakra-ui/react";
import { InformacionPerfil } from "../componentes/Perfil/InformacionPerfil";
import { AccionesPerfil } from "../componentes/Perfil/AccionesPerfil";
import { useEffect, useState } from "react";

export const Perfil = () => {
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    );

    useEffect(() => {
        setUsuario(JSON.parse(localStorage.getItem("usuario")));
    }, []);

    return (
        <>
            <Heading pt={10} size="xl" color={"black"} textAlign={"center"}>
                Perfil | {usuario.tipoUsuario.rol}
            </Heading>
            <Container>
                <Grid>
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
