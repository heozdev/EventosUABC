import { GridItem, Link, Box } from "@chakra-ui/react"; 
import { ImExit } from "react-icons/im";
import { LuFolderEdit } from "react-icons/lu"; 
import { AiFillHome } from "react-icons/ai"; 
import { BsCalendar } from "react-icons/bs"; 
import { FaUserCircle } from "react-icons/fa"; 


export const SidebarDocente = ({ gridArea }) => {
    return (
        <GridItem pl="2" bg="#00723F" area={gridArea}> {/* GridItem con padding left de 2 y fondo verde */}
            <Box gap={20}> 
                <img src="src\recursos\imagenes\logoUabc.png" alt=""/> {/* Logo de la universidad */}

                {/* Primer conjunto de elementos de la lista */}
                <ul style={{ marginBottom: "250px" }}>
                    {/* Elemento de lista para la página de inicio */}
                    <li
                        style={{
                            display: "flex",
                            alignItems: "center",
                            alignContent: "center",
                            marginBottom: "10px",
                        }}
                    >
                        <AiFillHome size={35} style={{ color: "white" }} /> {/* Ícono de inicio */}
                        <Link paddingLeft="10px" color="white" href="/iniciodocente">
                            Inicio
                        </Link>
                    </li>
                    {/* Elemento de lista para la página de eventos */}
                    <li
                        style={{
                            display: "flex",
                            alignItems: "center",
                            alignContent: "center",
                            marginBottom: "10px",
                        }}
                    >
                        <BsCalendar size={35} style={{ color: "white" }} /> {/* Ícono de calendario */}
                        <Link paddingLeft="10px" color="white" href="/eventos">
                            Eventos
                        </Link>
                    </li>
                    {/* Elemento de lista para la página de solicitudes */}
                    <li
                        style={{
                            display: "flex",
                            alignItems: "center",
                            alignContent: "center",
                            marginBottom: "10px",
                        }}
                    >
                        <LuFolderEdit size={37} style={{ color: "white" }} /> {/* Ícono de carpeta con edición */}
                        <Link paddingLeft="10px" color="white" href="/solicitudesdocente">
                            Solicitudes
                        </Link>
                    </li>
                </ul>

                {/* Segundo conjunto de elementos de la lista */}
                <ul>
                    {/* Elemento de lista para la página de perfil */}
                    <li
                        style={{
                            display: "flex",
                            alignItems: "center",
                            alignContent: "center",
                            marginBottom: "10px",
                        }}
                    >
                        <FaUserCircle size={35} style={{ color: "white" }} /> {/* Ícono de perfil */}
                        <Link paddingLeft="10px" color="white" href="/perfil">
                            Perfil
                        </Link>
                    </li>
                    {/* Elemento de lista para salir de la sesión */}
                    <li
                        style={{
                            display: "flex",
                            alignItems: "center",
                            alignContent: "center",
                        }}
                    >
                        <ImExit size={35} style={{ color: "white" }} /> {/* Ícono de salida */}
                        <Link paddingLeft="10px" color="white" href="/login">
                            Salir
                        </Link>
                    </li>
                </ul>
            </Box>
        </GridItem>
    );
};
