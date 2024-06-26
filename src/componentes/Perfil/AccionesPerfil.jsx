import {
    Center,
    Tab,
    TabIndicator,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react"; 
import { MisEventosPerfil } from "./MisEventosPerfil"; 
import { MisSolicitudesPerfil } from "./MisSolicitudesPerfil"; 
import { EventosAsistidos } from "./EventosAsistidos"; 
import { BsQrCode } from "react-icons/bs"; 
import { useEffect, useState } from "react"; 
import QRCode from "qrcode.react"; 
import { CarnetAlumno } from "./CarnetAlumno"; 

// Componente principal de acciones del perfil
export const AccionesPerfil = () => {
    // Hooks de Chakra UI para controlar el estado del modal
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Estado para almacenar la información del usuario
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    );

    // Hook de efecto para actualizar la información del usuario desde el localStorage
    useEffect(() => {
        setUsuario(JSON.parse(localStorage.getItem("usuario")));
    }, []);

    // Función para generar un código QR único basado en la información del usuario
    const generateUniqueQRCode = () => {
        if (!usuario || !usuario.id) {
            // Manejar el caso en que el usuario o la ID del usuario no estén disponibles
            return "https://alumnos.uabc.mx/web/alumnos/bienvenido";
        }
        return `https://alumnos.uabc.mx/web/alumnos/bienvenido`;
    };

    return (
        <Center>
            <Box width="100%">
                <Tabs mt={10} position="relative" variant="unstyled">
                    <TabList justifyContent="center">
                        {usuario.tipoUsuario.rol !== "Alumno" && (
                            <Tab>Mis solicitudes</Tab>
                        )}
                        {usuario.tipoUsuario.rol !== "Alumno" && (
                            <Tab>Mis eventos</Tab>
                        )}
                        <Tab>Eventos asistidos</Tab>
                        {usuario.tipoUsuario.rol === "Alumno" && (
                            <Tab>Mis Carnets</Tab>
                        )}
                    </TabList>
                    <TabIndicator
                        mt="-1.5px"
                        height="2px"
                        bg="#00723F"
                        borderRadius="1px"
                    />
                    <TabPanels>
                        {usuario.tipoUsuario.rol !== "Alumno" && (
                            <TabPanel>
                                <MisSolicitudesPerfil />
                            </TabPanel>
                        )}
                        {usuario.tipoUsuario.rol !== "Alumno" && (
                            <TabPanel>
                                <MisEventosPerfil />
                            </TabPanel>
                        )}
                        <TabPanel>
                            <EventosAsistidos />
                        </TabPanel>
                        {usuario.tipoUsuario.rol === "Alumno" && (
                            <TabPanel>
                                <CarnetAlumno />
                            </TabPanel>
                        )}
                    </TabPanels>
                </Tabs>
            </Box>
            {usuario.tipoUsuario.rol === "Alumno" && (
                <>
                    <Button
                        position={"absolute"}
                        right={20}
                        bottom={20}
                        bg={"transparent"}
                        height={"100px"}
                        onClick={onOpen}
                    >
                        <BsQrCode
                            position={"absolute"}
                            right={20}
                            bottom={20}
                            fontSize={75}
                            color="#00723F"
                        />
                    </Button>

                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Tu Código QR</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Center>
                                    <QRCode value={generateUniqueQRCode()} />
                                </Center>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="green" mr={3} onClick={onClose}>
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>
            )}
        </Center>
    );
};
