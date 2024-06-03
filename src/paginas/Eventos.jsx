import { Heading, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export const Eventos = () => {
    const [eventos, setEventos] = useState([]);

    const getEventos = () => {
        //El backend esta configurado para que corra en el puerto 3000 y tu lo tenias en el puerto del front
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
        console.log(eventos);
    }, []);

    return (
        <>
            <Heading size="xl" color="black" mt={5} justifyContent="center">
                Eventos
            </Heading>
            {eventos.map((evento, index) => (
                <Box key={index} mt={4}>
                    <Heading size="md" color="gray.700">
                        {evento.nombre}
                    </Heading>
                    <p>{evento.descripcion}</p>
                    <p>Fecha: {evento.fecha}</p>
                    <p>
                        Hora: {evento.horaInicio} - {evento.horaFin}
                    </p>
                </Box>
            ))}
        </>
    );
};
