import { useEffect, useState } from "react";
import { Solicitud } from "../modelos/Solicitud";
import MostrarSolicitudes from "../componentes/Solicitud/MostrarSolicitudes";

export const Solicitudes = () => {
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

    return (
        <>
            <MostrarSolicitudes
                solicitudes={solicitudes}
                setSolicitudes={setSolicitudes}
            />
            {solicitudes.map((solicitud) => (
                <Solicitud
                    key={solicitud.id}
                    solicitud={solicitud}
                    setSolicitud={setSolicitud}
                />
            ))}
        </>
    );
};
