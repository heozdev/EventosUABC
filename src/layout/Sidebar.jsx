import { GridItem, Link, Box } from "@chakra-ui/react";
import { ImExit } from "react-icons/im";
import { LuFolderEdit } from "react-icons/lu";
import { AiFillHome } from "react-icons/ai";
import { BsCalendar } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

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
                        <Link paddingLeft="10px" color="white" href="/inicio">
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
                        <Link paddingLeft="10px" color="white" href="/eventos">
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
                        <NavLink
                            style={({ isActive, isPending }) => {
                                return {
                                    color: isActive ? "red" : "white",
                                };
                            }}
                            paddingLeft="10px"
                            to="/solicitudes"
                        >
                            Solicitudes
                        </NavLink>
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
                        <Link paddingLeft="10px" color="white" href="/perfil">
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
                        <Link paddingLeft="10px" color="white" href="/login">
                            Salir
                        </Link>
                    </li>
                </ul>
            </Box>
        </GridItem>
    );
};
