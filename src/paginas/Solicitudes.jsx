import { useEffect, useState } from "react";
import { Solicitud } from "../modelos/Solicitud";
import MostrarSolicitudes from "../componentes/Solicitud/MostrarSolicitudes";

export const Solicitudes = () => {
    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/solicitudes")
            .then((response) => response.json())
            .then((data) => {
                setSolicitudes(data);
            });
    }, [solicitudes]);

    return (
        <>
            <MostrarSolicitudes />
            {solicitudes.map((solicitud) => (
                <Solicitud
                    setSolicitudes={setSolicitudes}
                    key={solicitud.id}
                    solicitud={solicitud}
                />
            ))}
        </>
    );
};
