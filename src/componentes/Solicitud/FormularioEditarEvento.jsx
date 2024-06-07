import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    const [evento, setEvento] = useState(null);
    const [eventoActualizado, setEventoActualizado] = useState(null);
    const toast = useToast();
    const [tabIndex, setTabIndex] = useState(0);
    const [errors, setErrors] = useState({});
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    );

    useEffect(() => {
        fetch(`http://localhost:3000/eventos/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setEvento(data);
                setEventoActualizado(data);
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

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === "checkbox" ? checked : value;
    
        setEventoActualizado((prevState) => {
            if (name.includes("ubicacion.")) {
                const [_, subField] = name.split("ubicacion.");
                return {
                    ...prevState,
                    solicitud: {
                        ...prevState.solicitud,
                        ubicacion: {
                            ...prevState.solicitud.ubicacion,
                            [subField]: fieldValue,
                        },
                    },
                };
            } else {
                return {
                    ...prevState,
                    solicitud: {
                        ...prevState.solicitud,
                        [name]: fieldValue,
                    },
                };
            }
        });
    };
    
    const actualizarEvento = () => {
        const solicitudActualizada = eventoActualizado.solicitud;
        const solicitudOriginal = evento.solicitud;
    
        const camposModificados = Object.keys(solicitudActualizada).some(
            (key) => solicitudActualizada[key] !== solicitudOriginal[key]
        );
    
        if (camposModificados) {
            fetch(`http://localhost:3000/eventos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    estado: "Pendiente",
                    solicitud: {
                        nombre: solicitudActualizada.nombre,
                        descripcion: solicitudActualizada.descripcion,
                        fecha: solicitudActualizada.fecha,
                        valorEnCreditos: solicitudActualizada.valorEnCreditos,
                        horaInicio: solicitudActualizada.horaInicio,
                        horaFin: solicitudActualizada.horaFin,
                        totalSellos: solicitudActualizada.totalSellos,
                        modalidad: solicitudActualizada.modalidad,
                        estado: "Pendiente",
                        capacidad: solicitudActualizada.capacidad,
                        ubicacion: solicitudActualizada.ubicacion,
                    },
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setEvento(data);
                    toast({
                        title: "Evento actualizado",
                        description: "Los datos del evento se han actualizado correctamente.",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right",
                    });
                    navigate("/perfil");
                })
                .catch((error) => {
                    console.error("Error al actualizar el evento:", error);
                    toast({
                        title: "Error",
                        description: "Hubo un problema al actualizar los datos del evento.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right",
                    });
                });
        } else {
            toast({
                title: "Sin cambios",
                description: "No se realizaron modificaciones en los datos del evento.",
                status: "info",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
            navigate("/perfil");
        }
    };

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
                                    value={eventoActualizado.solicitud.nombre}
                                    name="nombre"
                                    onChange={handleInputChange}
                                />
                                <FormErrorMessage>{errors.nombre}</FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isRequired
                                isInvalid={errors.modalidad}
                            >
                                <FormLabel>Modalidad</FormLabel>
                                <Select
                                    placeholder="Seleccionar"
                                    name="modalidad"
                                    value={eventoActualizado.solicitud.modalidad}
                                    isDisabled={true}
                                >
                                    <option>Presencial</option>
                                    <option>Online</option>
                                </Select>
                                <FormErrorMessage>
                                    {errors.modalidad}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Responsable</FormLabel>
                                <Input
                                    placeholder="Responsable"
                                    value={usuario.nombres}
                                    name="responsable"
                                    isDisabled={true}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Valor en créditos</FormLabel>
                                <HStack paddingLeft={"5px"}>
                                    <span>Si</span>
                                    <Checkbox
                                        size="lg"
                                        colorScheme="green"
                                        borderColor="green"
                                        isChecked={eventoActualizado.solicitud.valorEnCreditos}
                                        name="valorEnCreditos"
                                        onChange={handleInputChange}
                                    />
                                </HStack>
                            </FormControl>
                            <FormControl>
                                <GridItem>
                                    <FormLabel>Total de sellos</FormLabel>
                                    <NumberInput
                                        defaultValue={eventoActualizado.solicitud.totalSellos}
                                        min={0}
                                        max={3}
                                        onChange={handleInputChange}
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
                                        defaultValue={eventoActualizado.solicitud.capacidad}
                                        onChange={handleInputChange}
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
                                    value={eventoActualizado.solicitud.descripcion}
                                    name="descripcion"
                                    onChange={handleInputChange}
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
                                        eventoActualizado.solicitud.modalidad === "Online"
                                    }
                                    placeholder="Seleccionar"
                                    name="ubicacion.facultad"
                                    value={eventoActualizado.solicitud.ubicacion.facultad}
                                    onChange={handleInputChange}
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
                                        eventoActualizado.solicitud.modalidad === "Online"
                                    }
                                    placeholder="Seleccionar"
                                    name="ubicacion.estado"
                                    value={eventoActualizado.solicitud.ubicacion.estado}
                                    onChange={handleInputChange}
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
                                        eventoActualizado.solicitud.modalidad === "Online"
                                    }
                                    placeholder="Seleccionar"
                                    name="ubicacion.campus"
                                    value={eventoActualizado.solicitud.ubicacion.campus}
                                    onChange={handleInputChange}
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
                                        eventoActualizado.solicitud.modalidad === "Online"
                                    }
                                    placeholder="Seleccionar"
                                    name="ubicacion.ciudad"
                                    value={eventoActualizado.solicitud.ubicacion.ciudad}
                                    onChange={handleInputChange}
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
                                        eventoActualizado.solicitud.modalidad === "Online"
                                    }
                                    placeholder="Dirección"
                                    value={eventoActualizado.solicitud.ubicacion.direccion}
                                    name="ubicacion.direccion"
                                    onChange={handleInputChange}
                                />
                                <FormErrorMessage>
                                    {errors.direccion}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired isInvalid={errors.aula}>
                                <FormLabel>
                                    {eventoActualizado.solicitud.modalidad === "Online"
                                        ? "Link de la reunion"
                                        : "Aula"}
                                </FormLabel>
                                <Input
                                    placeholder={
                                        eventoActualizado.solicitud.modalidad === "Online"
                                            ? "Link de la reunion"
                                            : "Aula"
                                    }
                                    value={eventoActualizado.solicitud.ubicacion.aula}
                                    name="ubicacion.aula"
                                    onChange={handleInputChange}
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
                                    value={eventoActualizado.solicitud.fecha}
                                    name="fecha"
                                    onChange={handleInputChange}
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
                                    value={eventoActualizado.solicitud.horaInicio}
                                    onChange={handleInputChange}
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
                                    value={eventoActualizado.solicitud.horaFin}
                                    onChange={handleInputChange}
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
                                    <br /> {eventoActualizado.solicitud.nombre}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Responsable</b>
                                    <br /> {usuario.nombres}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Modalidad</b>
                                    <br /> {eventoActualizado.solicitud.modalidad}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Capacidad</b>
                                    <br /> {eventoActualizado.solicitud.capacidad}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Valor en Créditos</b>
                                    <br /> {eventoActualizado.solicitud.valorEnCreditos ? "Sí" : "No"}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Total de Sellos</b>
                                    <br /> {eventoActualizado.solicitud.totalSellos}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Hora Inicio</b>
                                    <br /> {eventoActualizado.solicitud.horaInicio}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Hora Fin</b>
                                    <br /> {eventoActualizado.solicitud.horaFin}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Estado del Evento</b>
                                    <br /> {eventoActualizado.solicitud.estado}
                                </FormLabel>
                            </FormControl>
                            <FormControl>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Descripción</b>
                                    <br /> {eventoActualizado.solicitud.descripcion}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Facultad</b>
                                    <br /> {eventoActualizado.solicitud.ubicacion.facultad}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Estado</b>
                                    <br /> {eventoActualizado.solicitud.ubicacion.estado}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Campus</b>
                                    <br /> {eventoActualizado.solicitud.ubicacion.campus}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Ciudad</b>
                                    <br /> {eventoActualizado.solicitud.ubicacion.ciudad}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Dirección</b>
                                    <br /> {eventoActualizado.solicitud.ubicacion.direccion}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>
                                        {eventoActualizado.solicitud.modalidad === "Online"
                                            ? "Link de la reunion"
                                            : "Aula"}
                                    </b>
                                    <br /> {eventoActualizado.solicitud.ubicacion.aula}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Fecha</b>
                                    <br /> {eventoActualizado.solicitud.fecha}
                                </FormLabel>
                            </FormControl>
                        </div>
                        <Button
                            w={"100%"}
                            bgColor="#00723F"
                            color="white"
                            mt={5}
                            onClick={actualizarEvento}
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