import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
} from "@chakra-ui/react";
import { useState } from "react";

export const Login = () => {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [first, setFirst] = useState("");

    return (
        <Container borderRadius={10} p={10} mt={20} boxShadow={"xl"}>
            <Heading mb={20}>Login</Heading>
            <FormControl>
                <Stack spacing={10}>
                    <Box>
                        <FormLabel>Correo</FormLabel>
                        <Input type="email" placeholder="Ingrese su correo" />
                    </Box>
                    <Box>
                        <FormLabel>Contraseña</FormLabel>
                        <Input
                            type="password"
                            placeholder="Ingrese su contraseña"
                        />
                    </Box>
                    <Box>
                        <Button w={"100%"}>Iniciar sesion</Button>
                    </Box>
                </Stack>
                <Stack></Stack>
            </FormControl>
        </Container>
    );
};
