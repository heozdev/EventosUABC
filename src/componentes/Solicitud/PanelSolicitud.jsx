import { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
} from "@chakra-ui/react";
import Solicitud1 from "./FormatoSolicitud1";
import Solicitud2 from "./FormatoSolicitud2";

function PanelSolicitud() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [solicitud, setSolicitud] = useState({
        nombre: "",
        descripcion: "",
        fecha: "",
        valorEnCreditos: null,
        horaInicio: "",
        horaFin: "",
        totalSellos: null,
        modalidad: "",
        estado: "",
        responsable: null,
        ubicacionData: {
            facultad: "",
            estado: "",
            campus: "",
            ciudad: "",
            direccion: "",
            aula: "",
        },
    });

    const agregarSolicitud = () => {
        fetch(`http://localhost:3000/solicitudes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(solicitud),
        })
            .then((response) => response.json())
            .then((data) => console.log(data));

        onClose();
    };

    const [modalSize, setModalSize] = useState("xl"); // Estado para el tamaño del modal
    const handleTabChange = (index) => {
        if (index === 2) {
            setModalSize("5xl");
        } else {
            setModalSize("xl");
        }
    };
    return (
        <>
            <Button onClick={onOpen} bgColor="#00723F" color="white">
                Crear Evento
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Evento</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Tabs onChange={handleTabChange}>
                            <TabList>
                                <Tab>Paso 1</Tab>
                                <Tab>Paso 2</Tab>
                                <Tab>Confirmación</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <Solicitud1 />
                                </TabPanel>
                                <TabPanel>
                                    <Solicitud2 />
                                </TabPanel>
                                <TabPanel>
                                    <div
                                        style={{ display: "flex", gap: "10px" }}
                                    >
                                        <Solicitud1
                                            setSolicitud={setSolicitud}
                                        />
                                        <Solicitud2
                                            setSolicitud={setSolicitud}
                                        />
                                    </div>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            bgColor="#00723F"
                            color="white"
                            mr={3}
                            onClick={onClose}
                        >
                            Enviar petición
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default PanelSolicitud;
