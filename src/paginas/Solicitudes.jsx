import { useEffect, useState } from "react";
import MostrarEventos from "../componentes/Solicitud/MostrarEventos";
import { Solicitud } from "../modelos/Solicitud";

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
            <MostrarEventos />
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
