import { Box, Center, Checkbox, SimpleGrid, GridItem, HStack, Image, Input, Text, VStack } from "@chakra-ui/react";
import { useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import { FaPrint } from "react-icons/fa";

export const CarnetAlumno = () => {
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    );

    const carnetRefs = useRef([]);

    return (
        <Center>
            <SimpleGrid columns={[1, 2]} spacing={6} width={"200%"} position={"relative"} left={"-50%"}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <Box key={index} p={4} border="1px" borderColor="gray.200" borderRadius="md" width={"200%"} ml={index === 1 || index === 3 ? "100%" : "0"}>
                        <Box ref={(el) => (carnetRefs.current[index] = el)}>
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
                                                        <Center>
                                                            <Image src="src/recursos/imagenes/logoInstitucional.png" alt="Sello" width="50px" height="70px" mt={"10px"} mb={"10px"} visibility={"hidden"}/>
                                                        </Center>
                                                        <Text fontSize={"10px"} textAlign={"center"}>Sello Unidad Académica</Text>
                                                    </Box>
                                                </GridItem>
                                                <GridItem>
                                                        <Center>
                                                            <Image src="src/recursos/imagenes/firma.png" alt="Firma" width="50px" height="40px" mt={"25px"} mb={"25px"} visibility={"hidden"}/>
                                                        </Center>
                                                    <Text fontSize={"10px"} textAlign={"center"}>Firma Responsable del Evento</Text>
                                                </GridItem>
                                            </SimpleGrid>
                                        </GridItem>
                                    ))}
                                </SimpleGrid>
                                <Center>
                                <ReactToPrint
                                    trigger={() => (
                                        <Box as="button" display="flex" alignItems="center" mr={5} mt={4}>
                                            <FaPrint fontSize={"25px"}/>
                                        </Box>
                                    )}
                                    content={() => carnetRefs.current[index].firstChild}
                                />
                                    <Checkbox mt="4">UN CRÉDITO</Checkbox>
                                </Center>
                            </VStack>
                        </Box>
                    </Box>
                ))}
            </SimpleGrid>
        </Center>
    );
};