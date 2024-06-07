import { Button, Center } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

export const AgregarSolicitud = () => {
    const navigate = useNavigate();

    const handleCrearSolicitud = () => {
        navigate("/perfil/crear-solicitud");
    };

    return (
        <Button
            mt={"15px"}
            w={"100%"}
            bgColor="#00723F"
            color="white"
            transition="transform 0.3s"
            _hover={{
                transform: "scale(1.02)",
                boxShadow: "lg",
            }}
            onClick={handleCrearSolicitud}
        >
            Crear solicitud
        </Button>
    );
};
