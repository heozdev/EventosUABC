import { Box, Grid, GridItem, Image, Text,Spinner } from "@chakra-ui/react";
import { useState,useEffect } from "react";

export const InformacionPerfil = () => {
    const [sesion, setSesion] = useState(localStorage.getItem("rol"));
    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/perfil", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(Error);
                }
                return response.json();
            })
            .then((data) => {
                setPerfil(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Spinner size="xl" />;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

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
                    <Text>{perfil.nombre}</Text>
                    <Text>{perfil.matricula}</Text>
                    <Text>{perfil.carrera}</Text>
                    <Text>{perfil.carrera}</Text>
                </GridItem>
            </Grid>
        </Box>
    );
};
