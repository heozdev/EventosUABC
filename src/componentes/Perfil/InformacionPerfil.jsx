import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { useState } from "react";

export const InformacionPerfil = () => {
    const [sesion, setSesion] = useState(localStorage.getItem("rol"));

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
                    <Text></Text>
                    <Text>17058</Text>
                    <Text>Facultad de ingenieria</Text>
                    <Text>Lic. Sistemas computacionales</Text>
                </GridItem>
            </Grid>
        </Box>
    );
};
