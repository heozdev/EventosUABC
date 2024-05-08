import { useEffect, useState } from "react";
import { Solicitud } from "../modelos/Solicitud";
import MostrarSolicitudes from "../componentes/Solicitud/MostrarSolicitudes";

export const Solicitudes = () => {
    const [solicitudes, setSolicitudes] = useState([]); // Solicitudes sin filtrar
    const [filtered, setFilteredSolicitudes] = useState([]); // Solicitudes filtradas

    useEffect(() => {
        fetch("http://localhost:3000/solicitudes")
            .then((response) => response.json())
            .then((data) => {
                setSolicitudes(data);
            });
    }, []);

    // Actualizar solicitudes filtradas
    useEffect(() => {
        setFilteredSolicitudes(solicitudes);
    }, [solicitudes]);

    return (
        <>
            <MostrarSolicitudes solicitudes={solicitudes} setSolicitudes={setSolicitudes} />
            {filtered.map((solicitud) => (
                <Solicitud
                    setSolicitudes={setSolicitudes}
                    key={solicitud.id}
                    solicitud={solicitud}
                />
            ))} 
        </>
    );
};
