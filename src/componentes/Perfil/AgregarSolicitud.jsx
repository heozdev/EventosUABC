import {
    Button,Center
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const AgregarSolicitud = () =>  {
    return(
        <Center mt={10} width="100%">
            <Link to={"/perfil/crear-solicitud"}>
                <Button bgColor="#00723F" color="white">
                    Crear solicitud
                </Button>
            </Link>
        </Center>
    );
};