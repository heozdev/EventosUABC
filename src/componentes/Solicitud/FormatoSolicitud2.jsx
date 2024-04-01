import {
    Grid,
    GridItem,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    FormLabel,
    Input,
    FormControl,
    Select,
} from "@chakra-ui/react";

const FormatoSolicitud2 = () => {
  return (
    <Grid templateColumns={"1fr 1fr"} gap={4}>
        <GridItem> 
            <FormControl height="93px">
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
            <FormControl height="93px">
                <FormLabel>Tipo de evento</FormLabel>
                <Select placeholder="Categoria">
                    <option>General</option>
                    <option>Para estudiantes</option>
                    <option>Propedeutico</option>
                    <option>Conferencia</option>
                </Select>
            </FormControl>
        </GridItem>

        <GridItem>
            <FormControl height="93px">
                <FormLabel>Co-Responsable</FormLabel>
                <Input placeholder="Co-responsable" />
            </FormControl>

            <FormControl height="93px">
                <FormLabel>Hora inicio</FormLabel>
                    <NumberInput defaultValue={12} min={0} max={23}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
            </FormControl>

                
            <FormControl height="93px">
                <FormLabel>Hora fin</FormLabel>
                <NumberInput defaultValue={12} min={0} max={23}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>
        </GridItem>
    </Grid>
);};
export default FormatoSolicitud2;
