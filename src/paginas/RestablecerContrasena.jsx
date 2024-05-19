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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RestablecerContrasena = () => {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");

    const toast = useToast();
    const navigate = useNavigate();

    const validarFormulario = () => {
        const patronCorreo =
            /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;

        if (!patronCorreo.test(correo)) {
            toast({
                title: "Error",
                description: "Formato de correo no valido.",
                status: "error",
                position: "top-right",
                duration: 2000,
                isClosable: true,
            });

            return;
        }

        if (!correo.length) {
            toast({
                title: "Error",
                description:
                    "Ingrese el correo electronico del cual quiere restablecer su contraseña.",
                status: "error",
                position: "top-right",
                duration: 2000,
                isClosable: true,
            });

            return;
        }

        if (!contrasena.length || !confirmarContrasena.length) {
            toast({
                title: "Error",
                description: "Llene los campos de contraseña",
                status: "error",
                position: "top-right",
                duration: 2000,
                isClosable: true,
            });
            return;
        }

        if (contrasena != confirmarContrasena) {
            toast({
                title: "Error",
                description: "Las contraseñas no coinciden",
                status: "error",
                position: "top-right",
                duration: 2000,
                isClosable: true,
            });

            return;
        }

        return true;
    };

    const handleRestablecerContrasena = () => {
        if (validarFormulario()) {
            fetch(`http://localhost:3000/usuario/${correo}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ contrasena: confirmarContrasena }),
            })
                .then((resp) => resp.json())
                .then(({ status, mensaje }) => {
                    if (status == 200) {
                        toast({
                            title: "Operacion exitosa!",
                            description: mensaje,
                            status: "success",
                            position: "top-right",
                            duration: 2000,
                            isClosable: true,
                        });

                        navigate("/login");
                    }
                });
        }
    };

    return (
        <Container borderRadius={10} p={10} mt={20} boxShadow={"xl"}>
            <Heading mb={20}>Restablecer contraseña</Heading>
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
                            placeholder="Nueva contraseña"
                        />
                    </Box>
                    <Box>
                        <FormLabel>Confirmar contraseña</FormLabel>
                        <Input
                            onChange={(e) =>
                                setConfirmarContrasena(e.target.value)
                            }
                            type="password"
                            placeholder="Confirmar nueva contraseña"
                        />
                    </Box>
                    <Box>
                        <Button
                            onClick={handleRestablecerContrasena}
                            w={"100%"}
                        >
                            Restablecer contraseña
                        </Button>
                    </Box>
                </Stack>
            </FormControl>
        </Container>
    );
};
