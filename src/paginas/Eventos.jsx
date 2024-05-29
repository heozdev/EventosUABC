import {
    Heading
  } from '@chakra-ui/react';

import { useState, useEffect } from 'react';
import { Solicitud } from "../modelos/Solicitud";
import MostrarSolicitudes from "../componentes/Solicitud/MostrarSolicitudes";



export const Eventos = () => {
    <Heading size='xl' color={'black'} mt={5} justifyContent={"center"}>Eventos</Heading>;

    const [solicitudes, setSolicitudes] = useState([]); // Solicitudes sin filtrar
    const [solicitud, setSolicitud] = useState();

    const getSolicitudes = () => {
        fetch("http://localhost:3000/solicitudes")
            .then((response) => response.json())
            .then((data) => {
                setSolicitudes(data);
            });
    };

    useEffect(() => {
        getSolicitudes();
    }, []);

    useEffect(() => {
        getSolicitudes();
    }, [solicitud]);

    const solicitudesPendientes = solicitudes.filter(
        (solicitud) => solicitud.estado === 'Aceptado'
      );

    return (
        <>
            <MostrarSolicitudes
                solicitudes={solicitudes}
                setSolicitudes={setSolicitudes}
            />
            {solicitudesPendientes.map((solicitud) => (
                <Solicitud
                    key={solicitud.id}
                    solicitud={solicitud}
                    setSolicitud={setSolicitud}
                />
            ))}
        </>
    );
};
