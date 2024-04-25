import { useState } from "react";
import { useToast } from "@chakra-ui/react";
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

export const FormularioAgregarSolicitud = () => {
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

      const validateFields = () => {
        let newErrors = {};
      
        if (!inputValues.nombre.trim()) {
          newErrors.nombre = "El nombre del evento es obligatorio";
        } else if (!/^[a-zA-Z0-9\s]*$/.test(inputValues.nombre)) {
          newErrors.nombre = "El nombre no puede contener caracteres especiales";
        }
      
        if (!inputValues.responsable.trim()) {
          newErrors.responsable = "El responsable es obligatorio";
        } else if (!/^[a-zA-Z0-9\s]*$/.test(inputValues.responsable)) {
          newErrors.responsable = "El responsable no puede contener caracteres especiales";
        }
      
        if (!inputValues.descripcion.trim()) {
          newErrors.descripcion = "La descripción es obligatoria";
        }
      
        if (!inputValues.fecha.trim()) {
          newErrors.fecha = "La fecha es obligatoria";
        }
      
        if (!inputValues.ubicacionData.direccion.trim()) {
          newErrors.ubicacion = "La ubicación es obligatoria";
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

    // useEffect(() => {
    //     console.log(inputValues);
    // }, [inputValues]);

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
                description: "La solicitud se ha enviado correctamente.",
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

            <Grid my={10} gap="10px" gridTemplateColumns={"repeat(2, 1fr)"}>
                <FormControl isRequired isInvalid={errors.nombre}>
                    <FormLabel>Nombre del evento</FormLabel>
                    <Input
                        placeholder="Evento"
                        value={inputValues.nombre}
                        name="nombre"
                        onChange={handleInputsChange}
                    />
                    <FormErrorMessage>{errors.nombre}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={errors.responsable}>
                    <FormLabel>Responsable</FormLabel>
                    <Input
                        placeholder="Evento"
                        value={inputValues.responsable}
                        name="responsable"
                        onChange={handleInputsChange}
                    />
                    <FormErrorMessage>{errors.responsable}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={errors.descripcion}>
                    <FormLabel>Descripción</FormLabel>
                    <Textarea
                        placeholder="Descripción"
                        value={inputValues.descripcion}
                        name="descripcion"
                        onChange={handleInputsChange}
                    />
                    <FormErrorMessage>{errors.descripcion}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={errors.fecha}>
                    <FormLabel>Fecha</FormLabel>
                    <Input
                        type="date"
                        value={inputValues.fecha}
                        name="fecha"
                        onChange={handleInputsChange}
                    />
                    <FormErrorMessage>{errors.fecha}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={errors.ubicacion}>
                    <FormLabel>Ubicación</FormLabel>
                    <Input
                        placeholder="Ubicación"
                        value={inputValues.ubicacionData.direccion}
                        name="ubicacionData.direccion"
                        onChange={handleInputsChange}
                    />
                    <FormErrorMessage>{errors.ubicacion}</FormErrorMessage>
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
                        <NumberInput defaultValue={inputValues.capacidad}>
                            <NumberInputField
                                name="capacidad"
                                onChange={handleInputsChange}
                            />
                        </NumberInput>
                    </GridItem>
                </FormControl>

                <div style={{ display: "flex" }}>
                    <FormControl isRequired style={{ marginRight: "20px" }} isInvalid={errors.horaInicio}>
                        <FormLabel>Hora inicio</FormLabel>

                        <Input
                            type="time"
                            format={"HH:mm"}
                            name="horaInicio"
                            onChange={handleInputsChange}
                            value={inputValues.horaInicio}
                        />
                        <FormErrorMessage>{errors.horaInicio}</FormErrorMessage>
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
                        <FormErrorMessage>{errors.horaFin}</FormErrorMessage>
                    </FormControl>
                </div>

                <FormControl isRequired isInvalid={errors.modalidad}>
                    <FormLabel>Modalidad</FormLabel>
                    <Select
                        name="modalidad"
                        value={inputValues.modalidad}
                        onChange={handleInputsChange}
                    >
                        <option>Presencial</option>
                        <option>Online</option>
                    </Select>
                    <FormErrorMessage>{errors.modalidad}</FormErrorMessage>
                </FormControl>
            </Grid>
            <Button
            w={"100%"}
            bgColor="#00723F"
            color="white"
            mr={3}
            onClick={agregarSolicitud}
            >
                Enviar petición
            </Button>
            {/* <FormControl  isRequired>
                    <FormLabel>Categoría</FormLabel>
                    <Select
                        placeholder="Categoría"
                        value={inputValues.categoria}
                        name="categoria"
                        onChange={handleInputsChange}
                    >
                        <option value="">Selecciona una categoría</option>
                        <option value="Ingeniería">Ingeniería</option>
                        <option value="Arquitectura">Arquitectura</option>
                        <option value="Ciencias de la salud">
                            Ciencias de la salud
                        </option>
                        <option value="Derecho">Derecho</option>
                    </Select>
                </FormControl> */}
            {/* <FormControl>
                    <FormLabel textAlign="center">Imagen</FormLabel>
                    <Center>
                        <Input
                            type="file"
                            id="docpicker"
                            accept="image/png,image/jpg"
                            style={{ display: "none" }}
                        />
                        <Button
                            colorScheme="green"
                            marginLeft="auto"
                            marginRight="auto"
                        >
                            Seleccionar imagen (PNG o JPG)
                        </Button>
                    </Center>
                </FormControl> */}
            {/* <FormControl>
                    <FormLabel>Estado</FormLabel>
                    <Input value="Pendiente" isReadOnly />
                </FormControl> */}
            {/* <FormControl isRequired>
                    <FormLabel>Tipo de evento</FormLabel>
                    <Select placeholder="Categoría">
                        <option>General</option>
                        <option>Para estudiantes</option>
                        <option>Propedéutico</option>
                        <option>Conferencia</option>
                    </Select>
                </FormControl> */}
            {/* <FormControl>
                    <FormLabel>Co-Responsable</FormLabel>
                    <Input placeholder="Co-responsable" />
                </FormControl> */}
        </Container>
    );
};
