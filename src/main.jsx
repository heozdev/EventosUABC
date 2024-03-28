import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Inicio } from "./paginas/Inicio";
import { Eventos } from "./paginas/Eventos";
import { Solicitudes } from "./paginas/Solicitudes";
import { Login } from "./paginas/Login";
import { Perfil } from "./paginas/Perfil";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/inicio",
        element: <Inicio />,
    },
    {
        path: "/eventos",
        element: <Eventos />,
    },
    {
        path: "/solicitudes",
        element: <Solicitudes />,
    },
    {
        path: "/perfil",
        element: <Perfil />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
