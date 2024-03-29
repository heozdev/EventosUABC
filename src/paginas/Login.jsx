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

export const Login = () => {
    return (
        <Container borderRadius={10} p={10} mt={20} boxShadow={"xl"}>
            <Heading mb={20}>Login</Heading>
            <FormControl>
                <Stack spacing={10}>
                    <Box>
                        <FormLabel>Correo</FormLabel>
                        <Input type="email" />
                    </Box>
                    <Box>
                        <FormLabel>Contraseña</FormLabel>
                        <Input type="password" />
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
