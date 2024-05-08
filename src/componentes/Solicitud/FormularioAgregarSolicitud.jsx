import { useState } from "react";
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    useToast,
    Icon,
    Box,
    CloseButton,
} from "@chakra-ui/react";
import {
    Grid,
    GridItem,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    HStack,
    Select,
    Checkbox,
    NumberInput,
    NumberDecrementStepper,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    Heading,
    Container,
    FormErrorMessage,
} from "@chakra-ui/react";
import { FaCheckCircle, FaInfoCircle, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const FormularioAgregarSolicitud = () => {
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({
        nombre: "",
        descripcion: "",
        fecha: "",
        modalidad: "",
        horaInicio: "",
        horaFin: "",
        valorEnCreditos: false,
        estado: "pendiente",
        responsable: "",
        totalSellos: 1,
        ubicacionData: {
            facultad: "",
            estado: "",
            campus: "",
            ciudad: "",
            direccion: "",
            aula: "",
        },
        capacidad: 0,
    });
    const [errors, setErrors] = useState({});
    const toast = useToast();
    const [tabIndex, setTabIndex] = useState(0);

    function CloseButtonLink() {
        return (
            <a
                href="/perfil"
                style={{
                    position: "absolute",
                    top: "5px",
                    right: "50px",
                    textDecoration: "none",
                }}
            >
                <CloseButton size="lg" />
            </a>
        );
    }
    const validateFields = () => {
        let newErrors = {};

        if (!inputValues.nombre.trim()) {
            newErrors.nombre = "El nombre del evento es obligatorio";
        } else if (!/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑüÜ]*$/.test(inputValues.nombre)) {
            newErrors.nombre =
                "El nombre no puede contener caracteres especiales";
        }

        if (!inputValues.responsable.trim()) {
            newErrors.responsable = "El responsable es obligatorio";
        } else if (
            !/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑüÜ]*$/.test(inputValues.responsable)
        ) {
            newErrors.responsable =
                "El responsable no puede contener caracteres especiales";
        }

        if (!inputValues.descripcion.trim()) {
            newErrors.descripcion = "La descripción es obligatoria";
        }

        if (!inputValues.fecha.trim()) {
            newErrors.fecha = "La fecha es obligatoria";
        }

        if (!inputValues.ubicacionData.facultad.trim()) {
            newErrors.facultad = "La facultad es obligatoria";
        }

        if (!inputValues.ubicacionData.estado.trim()) {
            newErrors.estado = "El estado es obligatoria";
        }

        if (!inputValues.ubicacionData.campus.trim()) {
            newErrors.campus = "El campus es obligatoria";
        }

        if (!inputValues.ubicacionData.ciudad.trim()) {
            newErrors.ciudad = "La ciudad es obligatoria";
        }

        if (!inputValues.ubicacionData.direccion.trim()) {
            newErrors.direccion = "La dirección es obligatoria";
        }

        if (!inputValues.ubicacionData.aula.trim()) {
            newErrors.aula = "El nombre del evento es obligatorio";
        } else if (
            !/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑüÜ]*$/.test(
                inputValues.ubicacionData.aula
            )
        ) {
            newErrors.aula = "El aula no puede contener caracteres especiales";
        }

        if (!inputValues.horaInicio.trim()) {
            newErrors.horaInicio = "La hora de inicio es obligatoria";
        }

        if (!inputValues.horaFin.trim()) {
            newErrors.horaFin = "La hora de fin es obligatoria";
        }

        if (!inputValues.modalidad) {
            newErrors.modalidad = "La modalidad es obligatoria";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const agregarSolicitud = () => {
        if (validateFields()) {
            fetch(`http://localhost:3000/solicitudes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputValues),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    toast({
                        title: "Solicitud enviada",
                        description:
                            "La solicitud se ha enviado correctamente.",
                        status: "success",
                        position: "top-right",
                        duration: 3000,
                        isClosable: true,
                    });
                    setInputValues({
                        nombre: "",
                        descripcion: "",
                        fecha: "",
                        modalidad: "",
                        horaInicio: "",
                        horaFin: "",
                        valorEnCreditos: false,
                        estado: "pendiente",
                        responsable: "",
                        totalSellos: 1,
                        ubicacionData: {
                            facultad: "",
                            estado: "",
                            campus: "",
                            ciudad: "",
                            direccion: "",
                            aula: "",
                        },
                        capacidad: 0,
                    });
                    setErrors({});
                    navigate("/perfil");
                });
        } else {
            toast({
                title: "Error",
                description: "Por favor, corrija los errores en el formulario.",
                status: "error",
                duration: 3000,
                position: "top-right",
                isClosable: true,
            });
        }
    };

    const handleInputsChange = (e) => {
        setInputValues((prevState) => {
            if (e.target.name.includes(".")) {
                const [padre, hijo] = e.target.name.split(".");
                return {
                    ...prevState,
                    [padre]: {
                        ...prevState[padre],
                        [hijo]: e.target.value,
                    },
                };
            } else if (e.target.name === "valorEnCreditos") {
                return {
                    ...prevState,
                    ["valorEnCreditos"]: e.target.checked,
                };
            } else if (
                e.target.name == "capacidad" ||
                e.target.name == "totalSellos"
            ) {
                return {
                    ...prevState,
                    [e.target.name]: parseInt(e.target.value),
                };
            } else {
                return {
                    ...prevState,
                    [e.target.name]: e.target.value,
                };
            }
        });
    };

    return (
        <Container w={"100%"}>
            <Heading textAlign={"center"} size="xl" color={"black"} p={10}>
                Crear solicitud
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
                                    value={inputValues.nombre}
                                    name="nombre"
                                    onChange={handleInputsChange}
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
                                    value={inputValues.modalidad}
                                    onChange={handleInputsChange}
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
                                    value={inputValues.responsable}
                                    name="responsable"
                                    onChange={handleInputsChange}
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
                                        value={inputValues.categoria}
                                        name="valorEnCreditos"
                                        onChange={handleInputsChange}
                                    />
                                </HStack>
                            </FormControl>
                            <FormControl>
                                <GridItem>
                                    <FormLabel>Total de sellos</FormLabel>
                                    <NumberInput
                                        defaultValue={inputValues.totalSellos}
                                        min={0}
                                        max={3}
                                    >
                                        <NumberInputField
                                            name="totalSellos"
                                            onChange={handleInputsChange}
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
                                        defaultValue={inputValues.capacidad}
                                    >
                                        <NumberInputField
                                            name="capacidad"
                                            onChange={handleInputsChange}
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
                                    value={inputValues.descripcion}
                                    name="descripcion"
                                    onChange={handleInputsChange}
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
                                    placeholder="Seleccionar"
                                    name="ubicacionData.facultad"
                                    value={inputValues.ubicacionData.facultad}
                                    onChange={handleInputsChange}
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
                                    placeholder="Seleccionar"
                                    name="ubicacionData.estado"
                                    value={inputValues.ubicacionData.estado}
                                    onChange={handleInputsChange}
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
                                    placeholder="Seleccionar"
                                    name="ubicacionData.campus"
                                    value={inputValues.ubicacionData.campus}
                                    onChange={handleInputsChange}
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
                                    placeholder="Seleccionar"
                                    name="ubicacionData.ciudad"
                                    value={inputValues.ubicacionData.ciudad}
                                    onChange={handleInputsChange}
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
                                    placeholder="Dirección"
                                    value={inputValues.ubicacionData.direccion}
                                    name="ubicacionData.direccion"
                                    onChange={handleInputsChange}
                                />
                                <FormErrorMessage>
                                    {errors.direccion}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired isInvalid={errors.aula}>
                                <FormLabel>Aula</FormLabel>
                                <Input
                                    placeholder="Aula"
                                    value={inputValues.ubicacionData.aula}
                                    name="ubicacionData.aula"
                                    onChange={handleInputsChange}
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
                                    value={inputValues.fecha}
                                    name="fecha"
                                    onChange={handleInputsChange}
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
                                    onChange={handleInputsChange}
                                    value={inputValues.horaInicio}
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
                                    onChange={handleInputsChange}
                                    value={inputValues.horaFin}
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
                                    <br /> {inputValues.nombre}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Responsable</b>
                                    <br /> {inputValues.responsable}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Modalidad</b>
                                    <br /> {inputValues.modalidad}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Capacidad</b>
                                    <br /> {inputValues.capacidad}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Valor en Créditos</b>
                                    <br /> {inputValues.valorEnCreditos}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Total de Sellos</b>
                                    <br /> {inputValues.totalSellos}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Hora Inicio</b>
                                    <br /> {inputValues.horaInicio}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Hora Fin</b>
                                    <br /> {inputValues.horaFin}
                                </FormLabel>
                            </FormControl>
                            <FormControl>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Descripción</b>
                                    <br /> {inputValues.descripcion}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Facultad</b>
                                    <br /> {inputValues.ubicacionData.facultad}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Estado</b>
                                    <br /> {inputValues.ubicacionData.estado}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Campus</b>
                                    <br /> {inputValues.ubicacionData.campus}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Ciudad</b>
                                    <br /> {inputValues.ubicacionData.ciudad}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Dirección</b>
                                    <br /> {inputValues.ubicacionData.direccion}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Aula</b>
                                    <br /> {inputValues.ubicacionData.aula}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Fecha</b>
                                    <br /> {inputValues.fecha}
                                </FormLabel>
                            </FormControl>
                        </div>
                        <Button
                            w={"100%"}
                            bgColor="#00723F"
                            color="white"
                            mt={5}
                            onClick={agregarSolicitud}
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
