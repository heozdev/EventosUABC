import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const EventosAsistidos = () => {
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    );

    const [eventosAsistidos, setEventosAsistidos] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/usuarios/${usuario.id}/eventos-asistidos`)
            .then((response) => response.json())
            .then((data) => {
                setEventosAsistidos(data);
            })
            .catch((error) => {
                console.error(
                    "Error al obtener los eventos del usuario:",
                    error
                );
            });
    }, []);

    return (
        <>
            {eventosAsistidos.map((eventoAsistido) => (
                <Text key={eventoAsistido.id}>eventoAsistido</Text>
            ))}
        </>
    );
};
