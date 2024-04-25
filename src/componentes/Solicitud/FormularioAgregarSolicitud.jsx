import { useState } from "react";
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
} from "@chakra-ui/react";

export const FormularioAgregarSolicitud = () => {
    const [inputValues, setInputValues] = useState({
        nombre: "",
        descripcion: "",
        fecha: "",
        valorEnCreditos: false,
        horaInicio: "",
        horaFin: "",
        totalSellos: 1,
        capacidad: 0,
        modalidad: "",
        estado: "pendiente",
        responsable: "",
        ubicacionData: {
            facultad: "",
            estado: "",
            campus: "",
            ciudad: "",
            direccion: "",
            aula: "",
        },
    });

    const agregarSolicitud = () => {
        fetch(`http://localhost:3000/solicitudes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputValues),
        })
            .then((response) => response.json())
            .then((data) => console.log(data));

        console.log(inputValues);
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
                <FormControl isRequired>
                    <FormLabel>Nombre del evento</FormLabel>
                    <Input
                        variant="filled"
                        placeholder="Evento"
                        value={inputValues.nombre}
                        name="nombre"
                        onChange={handleInputsChange}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Responsable</FormLabel>
                    <Input
                        variant="filled"
                        placeholder="Evento"
                        value={inputValues.responsable}
                        name="responsable"
                        onChange={handleInputsChange}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Descripción</FormLabel>
                    <Textarea
                        variant={"filled"}
                        placeholder="Descripción"
                        value={inputValues.descripcion}
                        name="descripcion"
                        onChange={handleInputsChange}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Fecha</FormLabel>
                    <Input
                        variant="filled"
                        type="date"
                        value={inputValues.fecha}
                        name="fecha"
                        onChange={handleInputsChange}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Ubicación</FormLabel>
                    <Input
                        variant="filled"
                        placeholder="Ubicación"
                        value={inputValues.ubicacionData.direccion}
                        name="ubicacionData.direccion"
                        onChange={handleInputsChange}
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
                            variant="filled"
                            defaultValue={inputValues.totalSellos}
                            min={1}
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
                            variant="filled"
                            defaultValue={inputValues.capacidad}
                        >
                            <NumberInputField
                                name="capacidad"
                                onChange={handleInputsChange}
                            />
                        </NumberInput>
                    </GridItem>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Hora inicio</FormLabel>

                    <Input
                        variant="filled"
                        type="time"
                        format={"HH:mm"}
                        name="horaInicio"
                        onChange={handleInputsChange}
                        value={inputValues.horaInicio}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Hora fin</FormLabel>
                    <Input
                        variant="filled"
                        type="time"
                        format={"HH:mm"}
                        name="horaFin"
                        onChange={handleInputsChange}
                        value={inputValues.horaFin}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Modalidad</FormLabel>
                    <Select
                        variant={"filled"}
                        name="modalidad"
                        value={inputValues.modalidad}
                        onChange={handleInputsChange}
                    >
                        <option>Presencial</option>
                        <option>Online</option>
                    </Select>
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
