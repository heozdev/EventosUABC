import React, { useState } from "react";
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
    Text,
} from "@chakra-ui/react";
import SolicitudGeneral from "./FormatosSolicitudGeneral";

function PanelSolicitud({ enviarSolicitud }) {
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
    const [mensajeError, setMensajeError] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");
    const [mostrarAlerta, setMostrarAlerta] = useState(false);

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
        if (!solicitud.nombre) {
            setMensajeError("Error, llena los campos obligatorios");
            setMostrarAlerta(true);
            return;
        }

        enviarSolicitud(solicitud);
        setMensajeExito("Solicitud enviada exitosamente");
        setMostrarAlerta(true);

        onClose();
    };

    // const mostrarAlertaR =

    const [modalSize, setModalSize] = useState("x1"); // Estado para el tamaño del modal

    const handleTabChange = (index) => {
        if (index === 2) {
            setModalSize("5xl");
        } else {
            setModalSize("xl");
        }
    };

    const limpiarMensajes = () => {
        setMensajeError("");
        setMensajeExito("");
        setMostrarAlerta(false); // Ocultar la alerta al limpiar mensajes
    };

    return (
        <>
            <Button onClick={onOpen} bgColor="#00723F" color="white">
                Crear Evento
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size={modalSize} onOpen={limpiarMensajes}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Evento</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Tabs onChange={handleTabChange}>
                            <TabList>
                                <Tab>Confirmación</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <SolicitudGeneral setSolicitud={setSolicitud} />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            bgColor="#00723F"
                            id="EnvPet"
                            color="white"
                            mr={3}
                            onClick={agregarSolicitud}
                        >
                            Enviar petición
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {mostrarAlerta && (
                <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: mensajeError ? "red" : "green", padding: "10px", borderRadius: "5px", zIndex: "9999" }}>
                    <Text color="white">{mensajeError || mensajeExito}</Text>
                    <Button onClick={() => setMostrarAlerta(false)}>OK</Button>
                </div>
            )}


        </>
    );
}

export default PanelSolicitud;
