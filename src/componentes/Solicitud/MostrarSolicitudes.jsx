import React, { useState, useEffect } from "react";
import { Heading, Flex, useDisclosure, Button, Center, Box } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AddIcon } from "@chakra-ui/icons";
import { BiSolidFilterAlt } from "react-icons/bi";
import FiltroEventos from "../Filtros/FiltroEventos";
import FiltroBarraBusqueda from "../Filtros/FiltroBarraBusqueda";
import { FormularioAgregarSolicitud } from "./FormularioAgregarSolicitud";
import { Solicitud } from "../../modelos/Solicitud";

function MostrarSolicitudes({ solicitudes, setSolicitudes, getSolicitudes }) {
    const [pagina, setPagina] = useState(1);
    const [solicitudesP] = useState(6);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
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


    const ultimasolicitud = pagina * solicitudesP;
    const primerasolicitud = ultimasolicitud - solicitudesP;
    const currentSolicitudes = solicitudes.slice(
        primerasolicitud,
        ultimasolicitud
    );

    const paginate = (pag) => setPagina(pag);

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
            {mostrarFormulario ? "Cerrar Formulario" : "Agregar Solicitud"}
            </Button>
            {mostrarFormulario && <FormularioAgregarSolicitud />}
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

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gridGap: "10px",
                    marginTop: "20px",
                }}
            >
                {currentSolicitudes.map((solicitud, index) => (
                    <Solicitud key={index} solicitud={solicitud} />
                ))}
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20px",
                }}
            >
                <Button
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => setPagina(pagina === 1 ? 1 : pagina - 1)}
                    style={{ margin: "0 5px" }}
                >
                    <FaChevronLeft />
                </Button>
                {Array.from({
                    length: Math.ceil(solicitudes.length / solicitudesP),
                }).map((_, index) => (
                    <Button
                        key={index}
                        colorScheme="teal"
                        variant="outline"
                        onClick={() => paginate(index + 1)}
                        style={{ margin: "0 5px" }}
                    >
                        {index + 1}
                    </Button>
                ))}
                <Button
                    colorScheme="teal"
                    variant="outline"
                    onClick={() =>
                        setPagina(
                            pagina ===
                                Math.ceil(solicitudes.length / solicitudesP)
                                ? Math.ceil(solicitudes.length / solicitudesP)
                                : pagina + 1
                        )
                    }
                    style={{ margin: "0 5px" }}
                >
                    <FaChevronRight />
                </Button>
            </div>
        </center>
    );
}

export default MostrarSolicitudes;