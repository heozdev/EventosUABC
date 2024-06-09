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
    const [eventos, setEventos] = useState([]); // Estado para almacenar la lista de eventos
    const {
        isOpen: isOpenModalSearch, // Estado para controlar si el modal de búsqueda está abierto
        onOpen: onOpenModalSearch, 
        onClose: onCloseModalSearch, 
    } = useDisclosure(); // Hook para controlar el estado de visibilidad de modales
    const {
        isOpen: isOpenModalFilter, // Estado para controlar si el modal de filtro está abierto
        onOpen: onOpenModalFilter, 
        onClose: onCloseModalFilter, 
    } = useDisclosure(); // Hook para controlar el estado de visibilidad de modales

    // Función para obtener la lista de eventos desde el servidor
    const getEventos = () => {
        fetch("http://localhost:3000/eventos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setEventos(data); // Actualiza el estado con la lista de eventos obtenida
        })
        .catch((error) => {
            console.error("Error recuperando los eventos:", error);
        });
    };

    useEffect(() => {
        getEventos(); // Llama a la función para obtener los eventos al cargar el componente
    }, []); // Se ejecuta solo una vez al montar el componente

    return (
        <>
            <Center>
                <Heading size="xl" color="black" mt={5}>
                    Eventos
                </Heading>
            </Center>

            {/* Barra de búsqueda y filtro */}
            <Flex justifyContent="center" alignItems="center" mt={10}>
                {/* Icono de búsqueda */}
                <SearchIcon
                    onClick={onOpenModalSearch}
                    style={{
                        color: "#004928",
                        fontSize: "45px",
                        cursor: "pointer",
                        marginRight: "20px",
                    }}
                />

                {/* Icono de filtro */}
                <BiSolidFilterAlt
                    onClick={onOpenModalFilter}
                    style={{
                        color: "#004928",
                        fontSize: "45px",
                        cursor: "pointer",
                    }}
                />

                {/* Componente de filtro de búsqueda */}
                <FiltroBarraBusquedaEventos
                    isOpenModalSearch={isOpenModalSearch}
                    onCloseModalSearch={onCloseModalSearch}
                    eventos={eventos}
                    setEventos={setEventos}
                />
            </Flex>

            {/* Componente de filtro de eventos aceptados */}
            <FiltroEventosAceptados
                isOpenModalFilter={isOpenModalFilter}
                onCloseModalFilter={onCloseModalFilter}
                eventos={eventos}
                setEventos={setEventos}
            />

            {/* Renderiza cada evento */}
            {eventos.map((evento) => (
                <Box key={evento.id}>
                    <Evento evento={evento} />
                </Box>
            ))}
        </>
    );
};
