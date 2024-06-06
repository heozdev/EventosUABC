import { useEffect, useState } from "react";
import MostrarSolicitudes from "../componentes/Solicitud/MostrarSolicitudes";

export const Solicitudes = () => {
    const [solicitudes, setSolicitudes] = useState([]); // Solicitudes sin filtrar
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    );

    const getSolicitudes = () => {
        if (usuario) {
            fetch(`http://localhost:3000/usuarios/${usuario.id}/solicitudes`)
                .then((response) => response.json())
                .then((data) => {
                    const pendientes = data.filter(
                        (solicitud) =>
                            solicitud.estado === "Pendiente" ||
                            solicitud.estado === "Rechazado"
                    );
                    setSolicitudes(pendientes);
                })
                .catch((error) => {
                    console.error("Error al obtener las solicitudes:", error);
                });
        }
    };

    useEffect(() => {
        getSolicitudes();
    }, []);

    useEffect(() => {
        getSolicitudes();
    }, [solicitudes]);

    return (
        <>
            <MostrarSolicitudes
                solicitudes={solicitudes}
                setSolicitudes={setSolicitudes}
                getSolicitudes={getSolicitudes}
            />
        </>
    );
};
