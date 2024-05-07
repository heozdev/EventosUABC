import { useState } from "react";
import { Heading, Flex, useDisclosure, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { AddIcon } from "@chakra-ui/icons";
import { BiSolidFilterAlt } from "react-icons/bi";
import FiltroEventos from "../Filtros/FiltroEventos";
import FiltroBarraBusqueda from "../Filtros/FiltroBarraBusqueda";
import { FormularioAgregarSolicitud } from "./FormularioAgregarSolicitud";

function MostrarSolicitudes({ solicitudes, setSolicitudes }) {
    const {
        isOpen: isOpenModalFilter,
        onOpen: onOpenModalFilter,
        onClose: onCloseModalFilter,
    } = useDisclosure();
    const {
        isOpen: isOpenModalSearch,
        onOpen: onOpenModalSearch,
        onClose: onCloseModalSearch,
    } = useDisclosure();

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const AgregarSolicitud = () => {
        setMostrarFormulario(!mostrarFormulario);
    };

    return (
        <center>
            <Heading size="xl" color={"black"} mt={5}>
                Solicitudes
            </Heading>
            <Flex justifyContent="center" alignItems="center" mt={10} ml={600}>
                <Button
                    color="#004928"
                    colorScheme="white"
                    leftIcon={<AddIcon />}
                    onClick={AgregarSolicitud}
                >
                    {mostrarFormulario
                        ? "Cerrar Formulario"
                        : "Agregar Solicitud"}
                </Button>
                <BiSolidFilterAlt
                    style={{
                        color: "#004928",
                        fontSize: "45px",
                        marginRight: "8px",
                        cursor: "pointer",
                    }}
                    onClick={onOpenModalFilter}
                />
                <SearchIcon
                    style={{
                        color: "#004928",
                        fontSize: "45px",
                        cursor: "pointer",
                    }}
                    onClick={onOpenModalSearch}
                />
                <FiltroEventos
                    isOpenModalFilter={isOpenModalFilter}
                    onCloseModalFilter={onCloseModalFilter}
                    solicitudes={solicitudes}
                    setSolicitudes={setSolicitudes}
                />
                <FiltroBarraBusqueda
                    isOpenModalSearch={isOpenModalSearch}
                    onCloseModalSearch={onCloseModalSearch}
                    solicitudes={solicitudes}
                    setSolicitudes={setSolicitudes}
                />
            </Flex>
            {mostrarFormulario && <FormularioAgregarSolicitud />} {}
        </center>
    );
}

export default MostrarSolicitudes;
