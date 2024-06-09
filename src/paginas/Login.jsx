import {
    Box,
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Text,
    useToast,
} from "@chakra-ui/react"; 
import { useEffect } from "react"; 
import { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 

export const Login = () => {
    // Define estados para correo, contraseña e intentos de inicio de sesión
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [intentos, setIntentos] = useState(0);

    // Hook para navegación
    const navigate = useNavigate();
    // Hook para mostrar notificaciones
    const toast = useToast();

    // Efecto que se ejecuta cuando cambia el estado de intentos
    useEffect(() => {
        // Si se alcanza el límite de intentos
        if (intentos == 5) {
            // Reinicia el contador de intentos después de 10 segundos
            setTimeout(() => {
                setIntentos(0);
            }, 10000);

            // Muestra una notificación de error
            toast({
                title: "Error",
                description:
                    "Ha llegado al límite de intentos, inténtelo de nuevo dentro de 1 minuto.",
                status: "error",
                position: "top",
                duration: 2000,
                isClosable: true,
            });
        }
    }, [intentos]); // Se ejecuta cuando el estado de intentos cambia

    // Función para validar el formulario de inicio de sesión
    const validarFormulario = () => {
        // Patrón para validar el correo electrónico
        const patronCorreo =
            /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;

        // Verifica si el correo tiene un formato válido
        if (!patronCorreo.test(correo)) {
            // Muestra una notificación de error si el correo es inválido
            toast({
                title: "Error",
                description: "Formato de correo no válido.",
                status: "error",
                position: "top-right",
                duration: 2000,
                isClosable: true,
            });

            return false;
        }

        // Verifica si algún campo está vacío
        if (!correo.length || !contrasena.length) {
            // Muestra una notificación de error si hay campos vacíos
            toast({
                title: "Error",
                description: "No se permiten campos vacíos.",
                status: "error",
                position: "top-right",
                duration: 2000,
                isClosable: true,
            });

            return false;
        }

        return true;
    };

    // Función para manejar el inicio de sesión
    const handleLogin = () => {
        // Si el formulario es válido
        if (validarFormulario()) {
            // Realiza una solicitud POST al servidor para iniciar sesión
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
                    // Si el inicio de sesión es exitoso
                    if (data.status === "200") {
                        // Almacena la información del usuario en el almacenamiento local
                        localStorage.setItem(
                            "usuario",
                            JSON.stringify(data.usuario)
                        );

                        // Muestra una notificación de éxito
                        toast({
                            title: "Login exitoso!",
                            status: "success",
                            position: "top",
                            duration: 2000,
                            isClosable: true,
                        });

                        // Redirige al usuario a la página de inicio
                        navigate("/");
                    } else {
                        // Si el inicio de sesión falla, muestra una notificación de error
                        toast({
                            title: "Error",
                            description: data.mensaje,
                            status: "error",
                            position: "top",
                            duration: 2000,
                            isClosable: true,
                        });

                        // Incrementa el contador de intentos
                        setIntentos(intentos + 1);
                    }
                });
        }
    };

    return (
        // Contenedor principal del formulario de inicio de sesión
        <Container borderRadius={10} p={10} mt={20} boxShadow={"xl"}>
            {/* Título del formulario */}
            <Heading mb={20}>Eventos UABC</Heading>

            {/* Formulario de inicio de sesión */}
            <FormControl>
                <Stack spacing={10}>
                    {/* Campo de correo electrónico */}
                    <Box>
                        <FormLabel>Correo</FormLabel>
                        <Input
                            onChange={(e) => setCorreo(e.target.value)}
                            type="email"
                            placeholder="Ingrese su correo"
                        />
                    </Box>

                    {/* Campo de contraseña */}
                    <Box>
                        <FormLabel>Contraseña</FormLabel>
                        <Input
                            onChange={(e) => setContrasena(e.target.value)}
                            type="password"
                            placeholder="Ingrese su contraseña"
                        />
                        {/* Enlace para restablecer la contraseña */}
                        <Flex mt={10} gap="5px">
                            <Text>¿Olvidó su contraseña? </Text>
                            <Link
                                href="/login/restablecer-contrasena"
                                cursor="pointer"
                                textDecoration="underline"
                                color="green"
                            >
                                Restablézcala aquí
                            </Link>
                        </Flex>
                    </Box>

                    {/* Botón de inicio de sesión */}
                    <Box>
                        <Button
                            onClick={handleLogin}
                            isDisabled={intentos == 5} // Deshabilita el botón después de 5 intentos fallidos
                            w={"100%"}
                        >
                            Iniciar sesión
                        </Button>
                    </Box>
                </Stack>
            </FormControl>
        </Container>
    );
};
