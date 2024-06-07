import { useState, useEffect } from "react";
import {
    Heading,Center
} from "@chakra-ui/react";
import { Evento } from "../modelos/Evento";
import FiltroBarraBusquedaEventos from "../componentes/Filtros/FiltroBarraBusquedaEventos";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

export const Eventos = () => {
    const [eventos, setEventos] = useState([]);
    const { isOpen: isOpenModalSearch, onOpen: onOpenModalSearch, onClose: onCloseModalSearch } = useDisclosure();

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
                console.log(data);
            })
            .catch((error) => {
                console.error("Error recuperando los eventos:", error);
            });
    };

    const handleDeleteEvento = (id) => {
        setEventos((prevEventos) => prevEventos.filter((evento) => evento.id !== id));
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
            <Flex justifyContent="center" alignItems="center" mt={10} ml={600}>
                    <SearchIcon
                        onClick={onOpenModalSearch}
                        style={{
                            color: "#004928",
                            fontSize: "45px",
                            cursor: "pointer",
                            marginRight: '20px' // Ajusta el margen derecho si es necesario
                        }}
                    />
                    <FiltroBarraBusquedaEventos 
                        isOpenModalSearch={isOpenModalSearch} 
                        onCloseModalSearch={onCloseModalSearch} 
                        eventos={eventos} 
                        setEventos={setEventos} 
                    />
            </Flex>
            {eventos.map((evento) => (
                <Evento key={evento.id} evento={evento} />
            ))}
        </>
    );
};
