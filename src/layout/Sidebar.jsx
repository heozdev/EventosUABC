import { GridItem, Link, Flex, Image, Grid } from "@chakra-ui/react";
import { ImExit } from "react-icons/im";
import { LuFolderEdit } from "react-icons/lu";
import { AiFillHome } from "react-icons/ai";
import { BsCalendar } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

export const Sidebar = ({ gridArea }) => {
    return (
        <GridItem bg="#00723F" area={gridArea}>
            <Grid
                height={"100%"}
                gridTemplateAreas={`"logo"
                                        "navCentro"
                                        "navAbajo"`}
                gridTemplateRows={"10% 1fr 20%"}
            >
                <GridItem gridArea={"logo"}>
                    <Image src="src\recursos\imagenes\logoUabc.png" alt="" />
                </GridItem>
                <GridItem mt={"50px"} ml={"20px"} gridArea={"navCentro"}>
                    <Flex flexDirection={"column"} gap={5}>
                        <Flex>
                            <AiFillHome size={35} style={{ color: "white" }} />
                            <Link
                                paddingLeft="10px"
                                color="white"
                                href="/inicio"
                            >
                                Inicio
                            </Link>
                        </Flex>
                        <Flex>
                            <BsCalendar size={35} style={{ color: "white" }} />
                            <Link
                                paddingLeft="10px"
                                color="white"
                                href="/eventos"
                            >
                                Eventos
                            </Link>
                        </Flex>
                        <Flex>
                            <LuFolderEdit
                                size={37}
                                style={{ color: "white" }}
                            />
                            <Link
                                paddingLeft="10px"
                                color="white"
                                href="/solicitudes"
                            >
                                Solicitudes
                            </Link>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem gridArea={"navAbajo"} ml={"20px"}>
                    <Flex flexDirection={"column"} gap={5}>
                        <Flex>
                            <FaUserCircle
                                size={35}
                                style={{ color: "white" }}
                            />
                            <Link
                                paddingLeft="10px"
                                color="white"
                                href="/perfil"
                            >
                                Perfil
                            </Link>
                        </Flex>
                        <Flex>
                            <ImExit size={35} style={{ color: "white" }} />
                            <Link
                                paddingLeft="10px"
                                color="white"
                                href="/login"
                            >
                                Salir
                            </Link>
                        </Flex>
                    </Flex>
                </GridItem>
            </Grid>
        </GridItem>
    );
};
