import { useState, useEffect } from "react";
import {
    Heading,Center
} from "@chakra-ui/react";
import { Evento } from "../modelos/Evento";

export const Eventos = () => {
    const [eventos, setEventos] = useState([]);

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
                <Heading size="xl" color="black" mt={5} justifyContent="center">
                    Eventos
                </Heading>
            </Center>
            {eventos.map((evento) => (
                <Evento key={evento.id} evento={evento}  onDelete={handleDeleteEvento}/>
            ))}
        </>
    );
};
