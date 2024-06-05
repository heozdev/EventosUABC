import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormularioEditarSolicitud } from "../componentes/Solicitud/FormularioEditarSolicitud";

export const EditarEvento = () => {
    const { id } = useParams();
    const [solicitud, setSolicitud] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/solicitudes/${id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
            })
            .then((data) => {
                console.log("Data:", data);
                setSolicitud(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener la solicitud:", error);
                setError(`Error al obtener la solicitud: ${error.message}`);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <FormularioEditarSolicitud solicitud={solicitud} />;
};