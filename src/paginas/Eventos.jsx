import { useState, useEffect } from "react";
import {
    Heading,
    Box,
    Card,
    CardHeader,
    CardBody,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Text,
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

    useEffect(() => {
        getEventos();
    }, []);

    return (
        <>
            <Heading size="xl" color="black" mt={5} justifyContent="center">
                Eventos
            </Heading>
            {eventos.map((evento) => (
                <Evento key={evento.id} evento={evento} />
            ))}
        </>
    );
};
