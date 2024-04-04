
import { Grid, 
        GridItem,
        Input,
        Select,
        FormControl,
        FormLabel,
        Textarea,
        Button,
        HStack,
        Checkbox} from "@chakra-ui/react";
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
                        <FormControl height="80px">
                            <FormLabel >Nombre del evento</FormLabel>
                            <Input placeholder="Evento" />
                        </FormControl>


                            <FormControl height="120px">
                                <FormLabel >Descripcion</FormLabel>
                                <Textarea placeholder="Descripcion"/>
                            </FormControl>


                        <FormControl height="80px">
                            <FormLabel>Categoria</FormLabel>
                            <Select placeholder="Categoria" >
                                <option>Ingenieria</option>
                                <option>Arquitectura</option>
                                <option>Ciencias de la salud</option>
                                <option>Derecho</option>
                            </Select>
                        </FormControl>
                    </GridItem>

                    <GridItem>
                        <FormControl height="80px">
                            <FormLabel >Fecha</FormLabel>
                            <Input type="date" name="date"/>
                        </FormControl>

                        <FormControl height="120px">
                            <FormLabel >Ubicacion</FormLabel>
                            <Input placeholder="Ubicacion"/>
                        </FormControl>

                        <FormControl height="80px">
                            <FormLabel>Imagen</FormLabel>
                            <input
                            type="file"
                            id="docpicker"
                            accept="image/png,image/jpg"
                            ref={fileInputRef}
                            style={{display: "none"}}    
                            />
                            <Button onClick={handleFileSelect} colorScheme="green">Seleccionar imagen (PNG o JPG)</Button>
                        </FormControl>

                    </GridItem>
                </Grid>

            </GridItem>

            <GridItem >
                <FormControl>
                    <FormLabel textAlign="center">Valor en créditos</FormLabel>
                    <HStack justifyContent="center" paddingLeft={'5px'}> 
                        <span>Si</span>
                        <Checkbox size='lg' colorScheme='green'  borderColor="green" />
                    </HStack>
                </FormControl>
            </GridItem>
        </Grid>
    );
};
export default FormatoSolicitud1;
