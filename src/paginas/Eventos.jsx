import { Heading, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export const Eventos = () => {
    const [eventos, setEventos] = useState([]);

    const getEventos = () => {
        fetch("http://localhost:5173/evento", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setEventos(data);
        })
        .catch((error) => {
            console.error("Error recuperando los eventos:", error);
        });
    }
    const eventosVigentes = eventos.filter((evento) => evento.estado === "Vigente");

    useEffect(() => {
        getEventos();
        console.log("Eventos vigentes: " , eventosVigentes)
    }, []);


    return (
        <>
            <Heading size='xl' color='black' mt={5} justifyContent="center">
                Eventos
            </Heading>
            {eventosVigentes.map((evento, index) => (
                <Box key={index} mt={4}>
                    <Heading size='md' color='gray.700'>
                        {evento.nombre}
                    </Heading>
                    <p>{evento.descripcion}</p>
                    <p>Fecha: {evento.fecha}</p>
                    <p>Hora: {evento.horaInicio} - {evento.horaFin}</p>
                </Box>
            ))}
        </>
    );
};

