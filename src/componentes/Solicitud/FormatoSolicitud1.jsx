import { Grid, 
        GridItem,
        Input,
        Select,
        FormControl,
        FormLabel,
        Textarea} from "@chakra-ui/react";
import {  LoadScript,GoogleMap } from '@react-google-maps/api';

    const FormatoSolicitud1 = () => {
        
    return (
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <Grid>
                <GridItem>
                    <FormControl>
                        <FormLabel>Nombre del evento</FormLabel>
                        <Input placeholder="Evento" />
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl>
                        <FormLabel>Descripcion</FormLabel>
                        <Textarea placeholder="Descripcion" />
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl>
                        <FormLabel>Categoria</FormLabel>
                        <Select placeholder="Categoria">
                            <option>Ingenieria</option>
                            <option>Arquitectura</option>
                            <option>Ciencias de la salud</option>
                            <option>Derecho</option>
                        </Select>
                    </FormControl>
                </GridItem>
            </Grid>

            <Grid>
                <GridItem>
                    <FormLabel>Fecha</FormLabel>
                    <Input placeholder="Fecha" />
                </GridItem>

                <GridItem>
                    <FormLabel>Ubicacion</FormLabel>
                    <LoadScript googleMapsApiKey="AIzaSyAN374Wr-hVKOGOM2mXSkG_Pddko8zDb8o">
                        <GoogleMap
                            mapContainerStyle={{
                                width: "200px",
                                height: "200px",
                            }}
                            center={{ lat: -34.397, lng: 150.644 }}
                            zoom={8}
                        />
                    </LoadScript>
                </GridItem>
            </Grid>
        </Grid>
    );
};
export default FormatoSolicitud1;
