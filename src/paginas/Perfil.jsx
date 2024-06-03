import { Container, Grid, GridItem, Heading } from "@chakra-ui/react";
import { InformacionPerfil } from "../componentes/Perfil/InformacionPerfil";
import { AccionesPerfil } from "../componentes/Perfil/AccionesPerfil";
import { useEffect, useState } from "react";

export const Perfil = () => {

    const [rol, setRol] = useState("");

    useEffect(() => {
        setRol(localStorage.getItem("rol"));
    }, []);

    return (
        <>
            <Heading pt={10} size="xl" color={"black"} textAlign={"center"}>
                Perfil
            </Heading>
            <Container>
                <Grid >
                    <GridItem>
                        <InformacionPerfil />
                    </GridItem>
                    <GridItem display={rol === "Alumno" ? "none" : "flex"}>
                        <AccionesPerfil />
                    </GridItem>
                </Grid>
            </Container>
        </>
    );
};
