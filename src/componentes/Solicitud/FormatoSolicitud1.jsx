
import { Grid, 
        GridItem,
        Input,
        Select,
        FormControl,
        FormLabel,
        Textarea,
        Button,
        HStack,
        Checkbox,
        Center} from "@chakra-ui/react";
import{useRef} from "react";

const FormatoSolicitud1 = () => {
        const fileInputRef = useRef(null);
    
        const handleFileSelect = () => {
            fileInputRef.current.click();
        };
    return (
        <Grid templateRows="1fr auto" gap={4}>
            <GridItem>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <GridItem>
                        <FormControl height="80px" isRequired>
                            <FormLabel >Nombre del evento</FormLabel>
                            <Input placeholder="Evento" />
                        </FormControl>


                            <FormControl height="120px" isRequired>
                                <FormLabel >Descripción</FormLabel>
                                <Textarea placeholder="Descripción"/>
                            </FormControl>


                        <FormControl height="80px" isRequired>
                            <FormLabel>Categoría</FormLabel>
                            <Select placeholder="Categoría" >
                                <option>Ingeniería</option>
                                <option>Arquitectura</option>
                                <option>Ciencias de la salud</option>
                                <option>Derecho</option>
                            </Select>
                        </FormControl>
                    </GridItem>

                    <GridItem>
                        <FormControl height="80px" isRequired>
                            <FormLabel >Fecha</FormLabel>
                            <Input type="date" name="date"/>
                        </FormControl>

                        <FormControl height="120px" isRequired>
                            <FormLabel >Ubicación</FormLabel>
                            <Input placeholder="Ubicación"/>
                        </FormControl>

                        <FormControl height="80px">
                            <FormLabel >Valor en créditos</FormLabel>
                            <HStack paddingLeft={'5px'}> 
                                <span>Si</span>
                                <Checkbox size='lg' colorScheme='green'  borderColor="green" />
                            </HStack>
                        </FormControl>

                    </GridItem>
                </Grid>

            </GridItem>

            <GridItem >
                <FormControl>
                    <FormLabel textAlign="center">Imagen</FormLabel>
                    <Center>
                            <input
                            type="file"
                            id="docpicker"
                            accept="image/png,image/jpg"
                            ref={fileInputRef}
                            style={{display: "none"}}    
                            />
                            <Button onClick={handleFileSelect} colorScheme="green" marginLeft="auto" marginRight="auto">Seleccionar imagen (PNG o JPG)</Button>
                    </Center>
                </FormControl>
            </GridItem>
        </Grid>
    );
};
export default FormatoSolicitud1;
