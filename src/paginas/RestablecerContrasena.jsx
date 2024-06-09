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
    // Define estados para el correo, contraseña y confirmación de contraseña
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");

    // Obtiene la función 'toast' para mostrar mensajes de notificación
    const toast = useToast();
    // Obtiene la función 'navigate' para redirigir a otras páginas
    const navigate = useNavigate();

    // Función para validar el formulario antes de enviarlo
    const validarFormulario = () => {
        const patronCorreo =
            /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;

        // Verifica el formato del correo
        if (!patronCorreo.test(correo)) {
            toast({
                title: "Error",
                description: "Formato de correo no válido.",
                status: "error",
                position: "top-right",
                duration: 2000,
                isClosable: true,
            });
            return;
        }

        // Verifica que los campos no estén vacíos
        if (!correo.length || !contrasena.length || !confirmarContrasena.length) {
            toast({
                title: "Error",
                description: "Llene todos los campos.",
                status: "error",
                position: "top-right",
                duration: 2000,
                isClosable: true,
            });
            return;
        }

        // Verifica que las contraseñas coincidan
        if (contrasena !== confirmarContrasena) {
            toast({
                title: "Error",
                description: "Las contraseñas no coinciden.",
                status: "error",
                position: "top-right",
                duration: 2000,
                isClosable: true,
            });
            return;
        }

        return true; // Retorna verdadero si el formulario es válido
    };

    // Función para restablecer la contraseña
    const handleRestablecerContrasena = () => {
        if (validarFormulario()) {
            // Realiza una solicitud PUT al servidor para restablecer la contraseña
            fetch(`http://localhost:3000/usuario/${correo}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ contrasena: confirmarContrasena }),
            })
                .then((resp) => resp.json())
                .then(({ status, mensaje }) => {
                    if (status === 200) {
                        // Si la operación es exitosa, muestra un mensaje de éxito y redirige al usuario a la página de inicio de sesión
                        toast({
                            title: "Operación exitosa!",
                            description: mensaje,
                            status: "success",
                            position: "top-right",
                            duration: 2000,
                            isClosable: true,
                        });
                        navigate("/login");
                    } else {
                        // Si hay un error, muestra un mensaje de error
                        toast({
                            title: "Error",
                            description: mensaje,
                            status: "error",
                            position: "top-right",
                            duration: 2000,
                            isClosable: true,
                        });
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
