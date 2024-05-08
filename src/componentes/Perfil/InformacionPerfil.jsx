import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";

export const InformacionPerfil = () => {
    return (
        <Box mt={10} bg={"#F5F5F5"} p={10}>
            <Grid gridTemplateColumns="20% 1fr" gap={10}>
                <GridItem>
                    <Image
                        h={"100%"}
                        src="src\recursos\imagenes\fotoPerfil.png"
                    />
                </GridItem>
                <GridItem>
                    <Text>Mónica Cristina Lam Mora</Text>
                    <Text>17058</Text>
                    <Text>Facultad de ingenieria</Text>
                    <Text>Lic. Sistemas computacionales</Text>
                </GridItem>
            </Grid>
        </Box>
    );
};
