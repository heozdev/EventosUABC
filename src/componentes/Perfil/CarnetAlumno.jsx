import { Box, Center, Checkbox, SimpleGrid, GridItem, HStack, Image, Input, Text, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export const CarnetAlumno = () => {
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    );

    return (
        <Center>
            <SimpleGrid columns={[1, 2]} spacing={6} width={"200%"} position={"relative"} left={"-50%"}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <Box key={index} p={4} border="1px" borderColor="gray.200" borderRadius="md" width={"200%"} ml={index === 1 || index === 3 ? "100%" : "0"}>
                        <VStack spacing={4} align="stretch">
                            <HStack align="center">
                                <Image src="src/recursos/imagenes/logoInstitucional.png" alt="Imagen UABC" width="50px" height="70px" mr="4" />
                                <Box>
                                    <Text fontSize="sm" textAlign={"center"}>UNIVERSIDAD AUTÓNOMA DE BAJA CALIFORNIA</Text>
                                    <Text fontSize="sm" textAlign={"center"}>CARNET INSTITUCIONAL DE ACTIVIDADES COMPLEMENTARIAS DE FORMACIÓN INTEGRAL</Text>
                                </Box>
                            </HStack>

                            <HStack spacing={4}>
                                <Text fontWeight="bold" fontSize={"13px"} textAlign={"center"}>NOMBRE DEL ALUMNO:</Text>
                                <Input variant="flushed" value={`${usuario.nombres} ${usuario.apellidos}`} isDisabled={true} color={"black"}/>
                            </HStack>

                            <HStack spacing={4}>
                                <Text fontWeight="bold" fontSize={"13px"} textAlign={"center"}>MATRICULA:</Text>
                                <Input variant="flushed" value={usuario.matricula} isDisabled={true} color={"black"}/>
                            </HStack>

                            <HStack spacing={4}>
                                <Text fontWeight="bold" fontSize={"13px"} textAlign={"center"}>CARRERA:</Text>
                                <Input variant="flushed" value={usuario.carrera} isDisabled={true} color={"black"}/>
                            </HStack>

                            <SimpleGrid columns={2} gap="4" w="100%">
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <GridItem key={index} border="1px" borderColor="gray.300" p="2">
                                        <Text fontWeight="bold" fontSize={"13px"}>Fecha:</Text>
                                        <SimpleGrid columns={2} gap="2">
                                            <GridItem>
                                                <Box borderRight="1px" borderColor="gray.300" pr="2">
                                                    <Box h="60px" />
                                                    <Text fontSize={"10px"} textAlign={"center"}>Sello Unidad Académica</Text>
                                                </Box>
                                            </GridItem>
                                            <GridItem>
                                                <Box h="60px" />
                                                <Text fontSize={"10px"} textAlign={"center"}>Firma Responsable del Evento</Text>
                                            </GridItem>
                                        </SimpleGrid>
                                    </GridItem>
                                ))}
                            </SimpleGrid>
                            <Center>
                                <Checkbox mt="4">UN CRÉDITO</Checkbox>
                            </Center>
                        </VStack>
                    </Box>
                ))}
            </SimpleGrid>
        </Center>
    );
};