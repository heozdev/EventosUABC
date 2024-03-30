import { Grid,
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
        Button } from "@chakra-ui/react"

const Solicitud2 = () => {
  return (
    <Grid templateColumns={"1fr 1fr"} gap={4}>
        <GridItem> --Divide el formulario en 2, izquierda y derecha
            <Grid templateRows={"1fr 1fr"} gap={4}>
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

                <GridItem>
                    <FormLabel>Estado</FormLabel>
                    <Input value="Pendiente" isReadOnly/>
                </GridItem>
            </Grid>

            <FormLabel>Tipo de evento</FormLabel>
            <FormControl>
                <Select placeholder="Categoria">
                    <option>General</option>
                    <option>Para estudiantes</option>
                    <option>Propedeutico</option>
                    <option>Conferencia</option>
                </Select>
            </FormControl>
        </GridItem>

        <GridItem>
            <FormLabel>Co-Responsable</FormLabel>
            <Input placeholder="Co-responsable" />

            <Grid templateRows={"1fr 1fr"} gap={4}>
                <GridItem> 
                    <FormLabel>Hora inicio</FormLabel>
                    <NumberInput defaultValue={12} min={0} max={23}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </GridItem>

                <GridItem> 
                    <FormLabel>Hora fin</FormLabel>
                    <NumberInput defaultValue={12} min={0} max={23}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </GridItem>
            </Grid>
        </GridItem>

        <Button colorScheme='Green' >Button</Button>
    </Grid>

  )
}

export default Solicitud2