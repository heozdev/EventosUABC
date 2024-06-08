import { 
    Box, 
    Center, 
    Checkbox, 
    SimpleGrid, 
    GridItem, 
    HStack, 
    Image, 
    Input, 
    Text, 
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import ReactToPrint from "react-to-print";
import { FaPrint } from "react-icons/fa";

export const CarnetAlumno = () => {
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    );

    const carnetRefs = useRef([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [sellosConseguidos, setSellosConseguidos] = useState(0);
    const [fechasEventos, setFechasEventos] = useState([]);
    const [selectedEvento, setSelectedEvento] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/usuarios/${usuario.id}/eventos-asistidos`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Eventos asistidos", data);

                // Calcular la cantidad total de sellos conseguidos
                const totalSellos = data.reduce((total, evento) => total + evento.solicitud.totalSellos, 0);
                setSellosConseguidos(totalSellos);

                // Obtener las fechas de los eventos asistidos y repetirlas según la cantidad de sellos
                const fechas = data.reduce((fechasAcumuladas, evento) => {
                    const fechasRepetidas = Array(evento.solicitud.totalSellos).fill(evento.solicitud.fecha);
                    return [...fechasAcumuladas, ...fechasRepetidas];
                }, []);
                setFechasEventos(fechas);
            })
            .catch((error) => {
                console.error("Error al obtener los eventos del usuario:", error);
            });
    }, [usuario.id]);

    const isCarnetCompleto = (carnetIndex) => {
        const inicioCarnet = carnetIndex * 8;
        const finCarnet = inicioCarnet + 8;
        return sellosConseguidos >= finCarnet;
    };

    const getFechaEvento = (index) => {
        return fechasEventos[index] || '';
    };

    const handleSelloClick = (index) => {
        if (index >= sellosConseguidos) return; // Prevent modal if sello is not visible
        
        const eventoId = Math.floor(index / 8) + 1; // Suponiendo que el ID del evento se corresponde con el índice + 1
        fetch(`http://localhost:3000/eventos/${eventoId}`)
            .then((response) => response.json())
            .then((data) => {
                setSelectedEvento(data);
                onOpen();
            })
            .catch((error) => {
                console.error("Error al obtener los detalles del evento:", error);
            });
    };

    return (
        <Center>
            <SimpleGrid columns={[1, 2]} spacing={6} width={"200%"} position={"relative"} left={"-50%"}>
                {Array.from({ length: 4 }).map((_, carnetIndex) => (
                    <Box key={carnetIndex} p={4} border="1px" borderColor="gray.200" borderRadius="md" width={"200%"} ml={carnetIndex === 1 || carnetIndex === 3 ? "100%" : "0"}>
                        <Box ref={(el) => (carnetRefs.current[carnetIndex] = el)}>
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
                                    {Array.from({ length: 8 }).map((_, selloIndex) => {
                                        const index = carnetIndex * 8 + selloIndex;
                                        const mostrarSello = index < sellosConseguidos;
                                        const fechaEvento = getFechaEvento(index);
                                        return (
                                            <GridItem 
                                                key={index} 
                                                border="1px" 
                                                borderColor="gray.300" 
                                                p="2"
                                                cursor={mostrarSello ? "pointer" : "default"}
                                                onClick={() => handleSelloClick(index)}
                                            >
                                                <Text fontWeight="bold" fontSize={"13px"}>
                                                    Fecha: {fechaEvento}
                                                </Text>
                                                <SimpleGrid columns={2} gap="2">
                                                    <GridItem>
                                                        <Box borderRight="1px" borderColor="gray.300" pr="2">
                                                            <Center>
                                                                <Image
                                                                    src="src/recursos/imagenes/logoInstitucional.png"
                                                                    alt="Sello"
                                                                    width="50px"
                                                                    height="70px"
                                                                    mt={"10px"}
                                                                    mb={"10px"}
                                                                    visibility={mostrarSello ? "visible" : "hidden"}
                                                                />
                                                            </Center>
                                                            <Text fontSize={"10px"} textAlign={"center"}>Sello Unidad Académica</Text>
                                                        </Box>
                                                    </GridItem>
                                                    <GridItem>
                                                        <Center>
                                                            <Image
                                                                src="src/recursos/imagenes/firma.png"
                                                                alt="Firma"
                                                                width="50px"
                                                                height="40px"
                                                                mt={"25px"}
                                                                mb={"25px"}
                                                                visibility={mostrarSello ? "visible" : "hidden"}
                                                            />
                                                        </Center>
                                                        <Text fontSize={"10px"} textAlign={"center"}>Firma Responsable del Evento</Text>
                                                    </GridItem>
                                                </SimpleGrid>
                                            </GridItem>
                                        );
                                    })}
                                </SimpleGrid>
                                <Center>
                                    <ReactToPrint
                                        trigger={() => (
                                            <Box as="button" display="flex" alignItems="center" mr={5} mt={4}>
                                                <FaPrint fontSize={"25px"}/>
                                            </Box>
                                        )}
                                        content={() => carnetRefs.current[carnetIndex].firstChild}
                                    />
                                    <Checkbox mt="4" isChecked={isCarnetCompleto(carnetIndex)}>UN CRÉDITO</Checkbox>
                                </Center>
                            </VStack>
                        </Box>
                    </Box>
                ))}
            </SimpleGrid>

            <Modal isOpen={isOpen} onClose={onClose} size="5xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Información del Evento</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedEvento && (
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    fontSize: "18px",
                                    marginBottom: 10,
                                }}
                            >
                                <FormControl>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>ID del Evento: </b>
                                        {selectedEvento.id}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Nombre del Evento: </b>
                                        {selectedEvento.solicitud.nombre}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Responsable: </b>
                                        {selectedEvento.solicitud.nombreResponsable}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Modalidad: </b>
                                        {selectedEvento.solicitud.modalidad}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Capacidad: </b>
                                        {selectedEvento.solicitud.capacidad}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Valor en Créditos: </b>
                                        {selectedEvento.solicitud.valorEnCreditos ? "Sí" : "No"}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Total de Sellos: </b>
                                        {selectedEvento.solicitud.totalSellos}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Hora Inicio: </b>
                                        {selectedEvento.solicitud.horaInicio}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Hora Fin: </b>
                                        {selectedEvento.solicitud.horaFin}
                                    </FormLabel>
                                </FormControl>
                                <FormControl>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Descripción: </b>
                                        {selectedEvento.solicitud.descripcion}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Facultad: </b>
                                        {selectedEvento.solicitud.ubicacion.facultad}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Estado: </b>
                                        {selectedEvento.solicitud.ubicacion.estado}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Campus: </b>
                                        {selectedEvento.solicitud.ubicacion.campus}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Ciudad: </b>
                                        {selectedEvento.solicitud.ubicacion.ciudad}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Dirección: </b>
                                        {selectedEvento.solicitud.ubicacion.direccion}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Aula: </b>
                                        {selectedEvento.solicitud.ubicacion.aula}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Fecha: </b>
                                        {selectedEvento.solicitud.fecha}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Asistencia: </b>
                                        Cumplida
                                    </FormLabel>
                                </FormControl>
                            </div>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Center>
    );
};
