import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const MisSolicitudesPerfil = () => {
    return (
        <Link to={"/perfil/crear-solicitud"}>
            <Button bgColor="#00723F" color="white">
                Crear solicitud
            </Button>
        </Link>
    );
};
