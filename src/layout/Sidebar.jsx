import { Grid, GridItem, Link, Box } from "@chakra-ui/react";
import { ImExit } from "react-icons/im";
import { LuFolderEdit } from "react-icons/lu";
import { AiFillHome } from "react-icons/ai";
import { BsCalendar } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

export const Sidebar = ({ gridArea }) => {
    return (
        <GridItem pl="2" bg="#00723F" area={gridArea}>
            <Box gap={20}>
                <img src="logo-uabc.png" alt="" />

                <ul style={{ marginBottom: "350px" }}>
                    <li
                        style={{
                            display: "flex",
                            alignItems: "center",
                            alignContent: "center",
                            marginBottom: "10px",
                        }}
                    >
                        <AiFillHome size={35} style={{ color: "white" }} />
                        <Link paddingLeft="10px" color="white" href="/">
                            Inicio
                        </Link>
                    </li>
                    <li
                        style={{
                            display: "flex",
                            alignItems: "center",
                            alignContent: "center",
                            marginBottom: "10px",
                        }}
                    >
                        <BsCalendar size={35} style={{ color: "white" }} />
                        <Link paddingLeft="10px" color="white" href="/">
                            Eventos
                        </Link>
                    </li>
                    <li
                        style={{
                            display: "flex",
                            alignItems: "center",
                            alignContent: "center",
                            marginBottom: "10px",
                        }}
                    >
                        <LuFolderEdit size={37} style={{ color: "white" }} />
                        <Link paddingLeft="10px" color="white" href="/">
                            Solicitudes
                        </Link>
                    </li>
                </ul>

                <ul>
                    <li
                        style={{
                            display: "flex",
                            alignItems: "center",
                            alignContent: "center",
                            marginBottom: "10px",
                        }}
                    >
                        <FaUserCircle size={35} style={{ color: "white" }} />
                        <Link paddingLeft="10px" color="white" href="/">
                            Perfil
                        </Link>
                    </li>
                    <li
                        style={{
                            display: "flex",
                            alignItems: "center",
                            alignContent: "center",
                        }}
                    >
                        <ImExit size={35} style={{ color: "white" }} />
                        <Link paddingLeft="10px" color="white" href="/">
                            Salir
                        </Link>
                    </li>
                </ul>
            </Box>
        </GridItem>
    );
};
