import {
    Grid,
    GridItem,
    Input,
    Select,
    FormControl,
    FormLabel,
    Textarea,
    Button,
    HStack,
    Checkbox,
    Center,
} from "@chakra-ui/react";
import { useState, useRef } from "react";

const FormatoSolicitud1 = () => {
    const fileInputRef = useRef(null);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [fecha, setFecha] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [valorEnCreditos, setValorEnCreditos] = useState(false);

    const handleFileSelect = () => {
        fileInputRef.current.click();
    };

    const handleNombreEventoChange = (event) => {
        setNombre(event.target.value);
    };

    const handleDescripcionChange = (event) => {
        setDescripcion(event.target.value);
    };

    const handleCategoriaChange = (event) => {
        setCategoria(event.target.value);
    };

    const handleFechaChange = (event) => {
        setFecha(event.target.value);
    };

    const handleUbicacionChange = (event) => {
        setUbicacion(event.target.value);
    };

    const handleValorEnCreditosChange = (event) => {
        setValorEnCreditos(event.target.checked);
    };

    return (
        <Grid templateRows="1fr auto" gap={4}>
            <GridItem>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <GridItem>
                        <FormControl height="80px" isRequired>
                            <FormLabel>Nombre del evento</FormLabel>
                            <Input
                                placeholder="Evento"
                                value={nombre}
                                onChange={handleNombreEventoChange}
                            />
                        </FormControl>
                        <FormControl height="120px" isRequired>
                            <FormLabel>Descripción</FormLabel>
                            <Textarea
                                placeholder="Descripción"
                                value={descripcion}
                                onChange={handleDescripcionChange}
                            />
                        </FormControl>
                        <FormControl height="80px" isRequired>
                            <FormLabel>Categoría</FormLabel>
                            <Select
                                placeholder="Categoría"
                                value={categoria}
                                onChange={handleCategoriaChange}
                            >
                                <option value="">
                                    Selecciona una categoría
                                </option>
                                <option value="Ingeniería">Ingeniería</option>
                                <option value="Arquitectura">
                                    Arquitectura
                                </option>
                                <option value="Ciencias de la salud">
                                    Ciencias de la salud
                                </option>
                                <option value="Derecho">Derecho</option>
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem>
                        <FormControl height="80px" isRequired>
                            <FormLabel>Fecha</FormLabel>
                            <Input
                                type="date"
                                name="date"
                                value={fecha}
                                onChange={handleFechaChange}
                            />
                        </FormControl>
                        <FormControl height="120px" isRequired>
                            <FormLabel>Ubicación</FormLabel>
                            <Input
                                placeholder="Ubicación"
                                value={ubicacion}
                                onChange={handleUbicacionChange}
                            />
                        </FormControl>
                        <FormControl height="80px">
                            <FormLabel>Valor en créditos</FormLabel>
                            <HStack paddingLeft={"5px"}>
                                <span>Si</span>
                                <Checkbox
                                    size="lg"
                                    colorScheme="green"
                                    borderColor="green"
                                    checked={valorEnCreditos}
                                    onChange={handleValorEnCreditosChange}
                                />
                            </HStack>
                        </FormControl>
                    </GridItem>
                </Grid>
            </GridItem>
            <GridItem>
                <FormControl>
                    <FormLabel textAlign="center">Imagen</FormLabel>
                    <Center>
                        <input
                            type="file"
                            id="docpicker"
                            accept="image/png,image/jpg"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                        />
                        <Button
                            onClick={handleFileSelect}
                            colorScheme="green"
                            marginLeft="auto"
                            marginRight="auto"
                        >
                            Seleccionar imagen (PNG o JPG)
                        </Button>
                    </Center>
                </FormControl>
            </GridItem>
        </Grid>
    );
};

export default FormatoSolicitud1;
