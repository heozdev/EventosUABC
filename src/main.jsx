import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Inicio } from "./paginas/Inicio";
import { Eventos } from "./paginas/Eventos";
import { Solicitudes } from "./paginas/Solicitudes";
import { Perfil } from "./paginas/Perfil";
import { ChakraProvider } from "@chakra-ui/react";
import { InicioDocente } from "./paginas/InicioDocente";
import { App } from "./App";
import { SolicitudesDocente } from "./paginas/SolicitudesDocente";
import { Login } from "./paginas/Login";
import { CrearSolicitud } from "./paginas/CrearSolicitud";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/eventos",
                element: <Eventos />,
            },
            {
                path: "/inicio",
                element: <Inicio />,
            },
            {
                path: "/solicitudes",
                element: <Solicitudes />,
            },
            {
                path: "/perfil",
                element: <Perfil />,
            },
            {
                path: "/iniciodocente",
                element: <InicioDocente />,
            },
            {
                path: "/solicitudesdocente",
                element: <SolicitudesDocente />,
            },
            {
                path: "/perfil/crear-solicitud",
                element: <CrearSolicitud />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ChakraProvider>
            <RouterProvider router={router} />
        </ChakraProvider>
    </React.StrictMode>
);
