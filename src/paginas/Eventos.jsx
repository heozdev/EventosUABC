import { useState, useEffect } from "react";
import { Heading, Center } from "@chakra-ui/react";
import { Evento } from "../modelos/Evento";
import FiltroBarraBusquedaEventos from "../componentes/Filtros/FiltroBarraBusquedaEventos";
import FiltroEventosAceptados from "../componentes/Filtros/FiltroEventosAceptados";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { BiSolidFilterAlt } from "react-icons/bi";

export const Eventos = () => {
    const [eventos, setEventos] = useState([]);
    const {
        isOpen: isOpenModalSearch,
        onOpen: onOpenModalSearch,
        onClose: onCloseModalSearch,
    } = useDisclosure();
    const {
        isOpen: isOpenModalFilter,
        onOpen: onOpenModalFilter,
        onClose: onCloseModalFilter,
    } = useDisclosure();

    const getEventos = () => {
        fetch("http://localhost:3000/eventos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setEventos(data);
        })
        .catch((error) => {
            console.error("Error recuperando los eventos:", error);
        });
    };

    useEffect(() => {
        getEventos();
    }, []);

    return (
        <>
            <Center>
                <Heading size="xl" color="black" mt={5}>
                    Eventos
                </Heading>
            </Center>
            <Flex justifyContent="center" alignItems="center" mt={10}>
                <SearchIcon
                    onClick={onOpenModalSearch}
                    style={{
                        color: "#004928",
                        fontSize: "45px",
                        cursor: "pointer",
                        marginRight: "20px",
                    }}
                />
                <BiSolidFilterAlt
                    onClick={onOpenModalFilter}
                    style={{
                        color: "#004928",
                        fontSize: "45px",
                        cursor: "pointer",
                    }}
                />
                <FiltroBarraBusquedaEventos
                    isOpenModalSearch={isOpenModalSearch}
                    onCloseModalSearch={onCloseModalSearch}
                    eventos={eventos}
                    setEventos={setEventos}
                />
            </Flex>
            <FiltroEventosAceptados
                isOpenModalFilter={isOpenModalFilter}
                onCloseModalFilter={onCloseModalFilter}
                eventos={eventos}
                setEventos={setEventos}
            />
            {eventos.map((evento) => (
                <Box key={evento.id}>
                    <Evento evento={evento} />
                </Box>
            ))}
        </>
    );
};