
import { Grid, 
        GridItem,
        Input,
        Select,
        FormControl,
        FormLabel,
        Textarea,
        Button} from "@chakra-ui/react";
import{useRef} from "react";
// import {  LoadScript,GoogleMap } from '@react-google-maps/api';

const FormatoSolicitud1 = () => {
        const fileInputRef = useRef(null);
    
        const handleFileSelect = () => {
            fileInputRef.current.click();
        };
    return (
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
                    {/* <LoadScript googleMapsApiKey="AIzaSyAN374Wr-hVKOGOM2mXSkG_Pddko8zDb8o">
                        <GoogleMap
                            mapContainerStyle={{
                                width: "200px",
                                height: "200px",
                            }}
                            center={{ lat: -34.397, lng: 150.644 }}
                            zoom={8}
                        />
                    </LoadScript> */}
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
    );
};
export default FormatoSolicitud1;
