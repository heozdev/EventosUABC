import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Heading,
    Button,
    useToast,
    Grid,
    FormControl,
    FormLabel,
    CloseButton,
    Container,
    Tabs,
    TabList,
    Tab,
    Icon,
    TabPanels,
    TabPanel,
    Input,
    FormErrorMessage,
    Select,
    HStack,
    Checkbox,
    GridItem,
    NumberInput,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    NumberInputField,
    Textarea,
} from "@chakra-ui/react";
import { FaCheckCircle, FaInfoCircle, FaMapMarkerAlt } from "react-icons/fa";

export const FormularioEditarEvento = () => {
    const { id } = useParams();
    const [evento, setEvento] = useState(null);
    const toast = useToast();
    const [tabIndex, setTabIndex] = useState(0);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3000/eventos/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setEvento(data);
            })
            .catch((error) => {
                console.error("Error al obtener los detalles del evento:", error);
                toast({
                    title: "Error",
                    description: "Hubo un problema al obtener los detalles del evento.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right",
                });
            });
    }, [id, toast]);

    if (!evento) {
        return <div>Cargando...</div>;
    }

    

    function CloseButtonLink() {
        return (
            <a
                href="/perfil"
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "50px",
                    textDecoration: "none",
                }}
            >
                <CloseButton size="lg" />
            </a>
        );
    }

    return (
        <Container w={"100%"}>
            <Heading textAlign={"center"} size="xl" color={"black"} p={10}>
                Editar Evento
            </Heading>

            <CloseButtonLink />

            <Tabs
                variant="soft-rounded"
                colorScheme="green"
                index={tabIndex}
                onChange={setTabIndex}
            >
                <TabList gap={2}>
                    <Tab
                        py={4}
                        px={8}
                        borderRadius="md"
                        bg="green.50"
                        color="green.700"
                        _selected={{ bg: "green.500", color: "white" }}
                    >
                        <Icon as={FaInfoCircle} mr={2} />
                        Datos del Evento
                    </Tab>
                    <Tab
                        py={4}
                        px={8}
                        borderRadius="md"
                        bg="green.50"
                        color="green.700"
                        _selected={{ bg: "green.500", color: "white" }}
                    >
                        <Icon as={FaMapMarkerAlt} mr={2} />
                        Ubicación
                    </Tab>
                    <Tab
                        py={4}
                        px={8}
                        borderRadius="md"
                        bg="green.50"
                        color="green.700"
                        _selected={{ bg: "green.500", color: "white" }}
                    >
                        <Icon as={FaCheckCircle} mr={2} />
                        Verificar Información
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Grid
                            my={10}
                            gap="10px"
                            gridTemplateColumns={"repeat(2, 1fr)"}
                        >
                            <FormControl isRequired isInvalid={errors.nombre}>
                                <FormLabel>Nombre del evento</FormLabel>
                                <Input
                                    placeholder="Evento"
                                    value={evento.solicitud.nombre}
                                    name="nombre"
                                />
                                <FormErrorMessage>
                                    {errors.nombre}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isRequired
                                isInvalid={errors.modalidad}
                            >
                                <FormLabel>Modalidad</FormLabel>
                                <Select
                                    placeholder="Seleccionar"
                                    name="modalidad"
                                    value={evento.solicitud.modalidad}
                                >
                                    <option>Presencial</option>
                                    <option>Online</option>
                                </Select>
                                <FormErrorMessage>
                                    {errors.modalidad}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isRequired
                                isInvalid={errors.responsable}
                            >
                                <FormLabel>Responsable</FormLabel>
                                <Input
                                    placeholder="Responsable"
                                    value={evento.solicitud.responsable}
                                    name="responsable"
                                />
                                <FormErrorMessage>
                                    {errors.responsable}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Valor en créditos</FormLabel>
                                <HStack paddingLeft={"5px"}>
                                    <span>Si</span>
                                    <Checkbox
                                        size="lg"
                                        colorScheme="green"
                                        borderColor="green"
                                        isChecked={evento.solicitud.valorEnCreditos}
                                        name="valorEnCreditos"
                                    />
                                </HStack>
                            </FormControl>
                            <FormControl>
                                <GridItem>
                                    <FormLabel>Total de sellos</FormLabel>
                                    <NumberInput
                                        defaultValue={evento.solicitud.totalSellos}
                                        min={0}
                                        max={3}
                                    >
                                        <NumberInputField
                                            name="totalSellos"
                                        />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </GridItem>
                            </FormControl>
                            <FormControl>
                                <GridItem>
                                    <FormLabel>Capacidad</FormLabel>
                                    <NumberInput
                                        defaultValue={evento.solicitud.capacidad}
                                    >
                                        <NumberInputField
                                            name="capacidad"
                                        />
                                    </NumberInput>
                                </GridItem>
                            </FormControl>
                            <FormControl
                                isRequired
                                isInvalid={errors.descripcion}
                                gridColumn="span 2"
                            >
                                <FormLabel>Descripción</FormLabel>
                                <Textarea
                                    placeholder="Descripción"
                                    value={evento.solicitud.descripcion}
                                    name="descripcion"
                                />
                                <FormErrorMessage>
                                    {errors.descripcion}
                                </FormErrorMessage>
                            </FormControl>
                        </Grid>
                        <TabPanelContent
                            index={tabIndex}
                            setTabIndex={setTabIndex}
                        />
                    </TabPanel>
                    <TabPanel>
                        <Grid
                            my={10}
                            gap="10px"
                            gridTemplateColumns={"repeat(2, 1fr)"}
                        >
                            <FormControl isRequired isInvalid={errors.facultad}>
                                <FormLabel>Facultad</FormLabel>
                                <Select
                                    isDisabled={
                                        evento.solicitud.modalidad === "Online"
                                    }
                                    placeholder="Seleccionar"
                                    name="ubicacion.facultad"
                                    value={evento.solicitud.ubicacion.facultad}
                                >
                                    <option>Ingeniería</option>
                                    <option>Arquitectura y Diseño</option>
                                    <option>Derecho</option>
                                    <option>Deportes</option>
                                    <option>Administración</option>
                                </Select>
                                <FormErrorMessage>
                                    {errors.facultad}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired isInvalid={errors.estado}>
                                <FormLabel>Estado</FormLabel>
                                <Select
                                    isDisabled={
                                        evento.solicitud.modalidad === "Online"
                                    }
                                    placeholder="Seleccionar"
                                    name="ubicacion.estado"
                                    value={evento.solicitud.ubicacion.estado}
                                >
                                    <option>Baja California</option>
                                    <option>Fuera de Baja California</option>
                                </Select>
                                <FormErrorMessage>
                                    {errors.estado}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired isInvalid={errors.campus}>
                                <FormLabel>Campus</FormLabel>
                                <Select
                                    isDisabled={
                                        evento.solicitud.modalidad === "Online"
                                    }
                                    placeholder="Seleccionar"
                                    name="ubicacion.campus"
                                    value={evento.solicitud.ubicacion.campus}
                                >
                                    <option>Mexicali</option>
                                    <option>Ciencias Administrativas</option>
                                    <option>Ciencias Humanas</option>
                                </Select>
                                <FormErrorMessage>
                                    {errors.campus}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired isInvalid={errors.ciudad}>
                                <FormLabel>Ciudad</FormLabel>
                                <Select
                                    isDisabled={
                                        evento.solicitud.modalidad === "Online"
                                    }
                                    placeholder="Seleccionar"
                                    name="ubicacion.ciudad"
                                    value={evento.solicitud.ubicacion.ciudad}
                                >
                                    <option>Mexicali</option>
                                    <option>Tecate</option>
                                    <option>Ensenada</option>
                                    <option>Tijuana</option>
                                    <option>Valle de Guadalupe</option>
                                </Select>
                                <FormErrorMessage>
                                    {errors.ciudad}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isRequired
                                isInvalid={errors.direccion}
                            >
                                <FormLabel>Dirección</FormLabel>
                                <Input
                                    isDisabled={
                                        evento.solicitud.modalidad === "Online"
                                    }
                                    placeholder="Dirección"
                                    value={evento.solicitud.ubicacion.direccion}
                                    name="ubicacion.direccion"
                                />
                                <FormErrorMessage>
                                    {errors.direccion}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired isInvalid={errors.aula}>
                                <FormLabel>
                                    {evento.solicitud.modalidad === "Online"
                                        ? "Link de la reunion"
                                        : "Aula"}
                                </FormLabel>
                                <Input
                                    placeholder={
                                        evento.solicitud.modalidad === "Online"
                                            ? "Link de la reunion"
                                            : "Aula"
                                    }
                                    value={evento.solicitud.ubicacion.aula}
                                    name="ubicacion.aula"
                                />
                                <FormErrorMessage>
                                    {errors.aula}
                                </FormErrorMessage>
                            </FormControl>
                        </Grid>
                        <Heading size="md" mb="5" color="black">
                            Fecha y Hora
                        </Heading>
                        <div style={{ display: "flex", marginBottom: "30px" }}>
                            <FormControl
                                isRequired
                                style={{ marginRight: "10px" }}
                                isInvalid={errors.fecha}
                            >
                                <FormLabel>Fecha</FormLabel>
                                <Input
                                    type="date"
                                    value={evento.solicitud.fecha}
                                    name="fecha"
                                />
                                <FormErrorMessage>
                                    {errors.fecha}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isRequired
                                style={{ marginRight: "10px" }}
                                isInvalid={errors.horaInicio}
                            >
                                <FormLabel>Hora inicio</FormLabel>
                                <Input
                                    type="time"
                                    format={"HH:mm"}
                                    name="horaInicio"
                                    value={evento.solicitud.horaInicio}
                                />
                                <FormErrorMessage>
                                    {errors.horaInicio}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired isInvalid={errors.horaFin}>
                                <FormLabel>Hora fin</FormLabel>
                                <Input
                                    type="time"
                                    format={"HH:mm"}
                                    name="horaFin"
                                    value={evento.solicitud.horaFin}
                                />
                                <FormErrorMessage>
                                    {errors.horaFin}
                                </FormErrorMessage>
                            </FormControl>
                        </div>
                        <TabPanelContent
                            index={tabIndex}
                            setTabIndex={setTabIndex}
                        />
                    </TabPanel>
                    <TabPanel>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                fontSize: "18px",
                            }}
                        >
                            <FormControl>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Nombre del Evento</b>
                                    <br /> {evento.solicitud.nombre}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Responsable</b>
                                    <br /> {evento.solicitud.responsable}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Modalidad</b>
                                    <br /> {evento.solicitud.modalidad}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Capacidad</b>
                                    <br /> {evento.solicitud.capacidad}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Valor en Créditos</b>
                                    <br /> {evento.solicitud.valorEnCreditos ? "Sí" : "No"}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Total de Sellos</b>
                                    <br /> {evento.solicitud.totalSellos}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Hora Inicio</b>
                                    <br /> {evento.solicitud.horaInicio}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Hora Fin</b>
                                    <br /> {evento.solicitud.horaFin}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Estado del Evento</b>
                                    <br /> {evento.solicitud.estado}
                                </FormLabel>
                            </FormControl>
                            <FormControl>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Descripción</b>
                                    <br /> {evento.solicitud.descripcion}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Facultad</b>
                                    <br /> {evento.solicitud.ubicacion.facultad}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Estado</b>
                                    <br /> {evento.solicitud.ubicacion.estado}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Campus</b>
                                    <br /> {evento.solicitud.ubicacion.campus}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Ciudad</b>
                                    <br /> {evento.solicitud.ubicacion.ciudad}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Dirección</b>
                                    <br /> {evento.solicitud.ubicacion.direccion}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>
                                        {evento.solicitud.modalidad === "Online"
                                            ? "Link de la reunion"
                                            : "Aula"}
                                    </b>
                                    <br /> {evento.solicitud.ubicacion.aula}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Fecha</b>
                                    <br /> {evento.solicitud.fecha}
                                </FormLabel>
                            </FormControl>
                        </div>
                        <Button
                            w={"100%"}
                            bgColor="#00723F"
                            color="white"
                            mt={5}
                        >
                            Enviar petición
                        </Button>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
};

const TabPanelContent = ({ index, setTabIndex }) => {
    const handleNextClick = () => {
        setTabIndex(index + 1);
    };

    return (
        <Box>
            {/* Contenido del tab */}
            {index < 2 && (
                <Button
                    w={"100%"}
                    bgColor="#00723F"
                    color="white"
                    mr={3}
                    onClick={handleNextClick}
                >
                    Siguiente
                </Button>
            )}
        </Box>
    );
};