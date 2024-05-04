import { useState, useRef } from "react";
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
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

const FormatoSolicitud = () => {
    const fileInputRef = useRef(null);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [fecha, setFecha] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [valorEnCreditos, setValorEnCreditos] = useState(false);
    const [value, onChange] = useState(new Date());
    const [value2, onChange2] = useState(new Date());

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
        <Grid templateColumns={"1fr 1fr"} gap={4}>
        <GridItem> 
            <FormControl height="93px" >
                <GridItem> 
                    <FormLabel>Capacidad</FormLabel>
                    <NumberInput defaultValue={50} min={10} max={200}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </GridItem>
            </FormControl>
            <FormControl height="93px">
                <FormLabel>Estado</FormLabel>
                <Input value="Pendiente" isReadOnly/>
            </FormControl>
            <FormControl height="93px" isRequired>
                <FormLabel>Tipo de evento</FormLabel>
                <Select placeholder="Categoría">
                    <option>General</option>
                    <option>Para estudiantes</option>
                    <option>Propedéutico</option>
                    <option>Conferencia</option>
                </Select>
            </FormControl>
        </GridItem>

        <GridItem>
            <FormControl height="93px">
                <FormLabel>Co-Responsable</FormLabel>
                <Input placeholder="Co-responsable" />
            </FormControl>

            <div style={{display:'flex'}}>
                <FormControl height="93px" isRequired style={{ marginRight: '20px' }}>
                    <FormLabel>Hora inicio</FormLabel>
                    <DateTimePicker format={'HH:mm'} onChange={onChange} value={value} disableCalendar disableClock/>
                </FormControl>

                <FormControl height="93px" isRequired>
                    <FormLabel>Hora fin</FormLabel>
                    <DateTimePicker format={'HH:mm'} onChange={onChange2} value={value2} disableCalendar disableClock/>
                </FormControl>
            </div>

            <FormControl height="93px" isRequired>
                <FormLabel>Modalidad</FormLabel>
                <Select placeholder='Modalidad'>
                    <option>Presencial</option>
                    <option>Online</option>
                </Select>
            </FormControl>
        </GridItem>
    </Grid>
    </Grid>
    );
};

export default FormatoSolicitud;
