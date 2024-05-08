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
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [erro, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log(correo, contrasena);

        fetch("http://localhost:3000/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                correo,
                contrasena,
            }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.status === "200") {
                    localStorage.setItem("rol", data.rol);
                    console.log(localStorage.getItem("rol"));

                    navigate("/inicio");
                } else {
                    setError(data.mensaje);
                    //Aqui se implementa la logica para manejar los errores
                    console.log(data.mensaje);
                }
            });
    };

    return (
        <Container borderRadius={10} p={10} mt={20} boxShadow={"xl"}>
            <Heading mb={20}>Login</Heading>
            <FormControl>
                <Stack spacing={10}>
                    <Box>
                        <FormLabel>Correo</FormLabel>
                        <Input
                            onChange={(e) => setCorreo(e.target.value)}
                            type="email"
                            placeholder="Ingrese su correo"
                        />
                    </Box>
                    <Box>
                        <FormLabel>Contraseña</FormLabel>
                        <Input
                            onChange={(e) => setContrasena(e.target.value)}
                            type="password"
                            placeholder="Ingrese su contraseña"
                        />
                    </Box>
                    <Box>
                        <Button onClick={handleLogin} w={"100%"}>
                            Iniciar sesion
                        </Button>
                    </Box>
                </Stack>
            </FormControl>
        </Container>
    );
};
