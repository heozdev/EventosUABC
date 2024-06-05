import { Box, Grid, GridItem, Image, Text, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export const InformacionPerfil = () => {
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    );

    return (
        <Box mt={10} bg={"#F5F5F5"} p={10}>
            <Grid gridTemplateColumns="20% 1fr" gap={10}>
                <GridItem>
                    <Image
                        h={"100%"}
                        src="src\recursos\imagenes\user-icon.png"
                    />
                </GridItem>
                <GridItem>
                    <Text>{usuario.nombres}</Text>
                    <Text>{usuario.matricula}</Text>
                    <Text>{usuario.carrera}</Text>
                    <Text>{usuario.facultad}</Text>
                </GridItem>
            </Grid>
        </Box>
    );
};
