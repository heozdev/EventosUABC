import {
    Button,Center
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const AgregarSolicitud = () =>  {
    return(
        <Center mt={10} width="100%">
            <Link to={"/perfil/crear-solicitud"}>
                <Button 
                    bgColor="#00723F" 
                    color="white"
                    transition="transform 0.3s"
                    _hover={{
                        transform: "scale(1.02)",
                        boxShadow: "lg",
                    }}
                >
                    Crear solicitud
                </Button>
            </Link>
        </Center>
    );
};