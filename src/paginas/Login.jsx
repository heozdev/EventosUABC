import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [intentos, setIntentos] = useState(0);

    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        if (intentos == 5) {
            setTimeout(() => {
                setIntentos(0);
            }, 10000);

            toast({
                title: "Error",
                description:
                    "Ha llegado al limite de intentos, intentelo de nuevo dentro de 1 minuto.",
                status: "error",
                position: "top",
                duration: 2000,
                isClosable: true,
            });
        }
    }, [intentos]);

    const handleLogin = () => {
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

                    toast({
                        title: "Login exitoso!",
                        status: "success",
                        position: "top",
                        duration: 2000,
                        isClosable: true,
                    });

                    navigate("/");
                } else {
                    toast({
                        title: "Error",
                        description: data.mensaje,
                        status: "error",
                        position: "top",
                        duration: 2000,
                        isClosable: true,
                    });

                    setIntentos(intentos + 1);
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
                        <Button
                            onClick={handleLogin}
                            isDisabled={intentos == 5}
                            w={"100%"}
                        >
                            Iniciar sesion
                        </Button>
                    </Box>
                </Stack>
            </FormControl>
        </Container>
    );
};
