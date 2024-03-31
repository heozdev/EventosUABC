import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Inicio } from "./paginas/Inicio";
import { Eventos } from "./paginas/Eventos";
import { Solicitudes } from "./paginas/Solicitudes";
import { Perfil } from "./paginas/Perfil";
import { ChakraProvider } from "@chakra-ui/react";
import { App } from "./App";

const router = createBrowserRouter([
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
