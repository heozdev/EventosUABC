import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
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

    return (
        <>
            <Button onClick={onOpen}>Agregar Evento</Button>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Evento</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Tabs>
                            <TabList>
                                <Tab>Paso 1</Tab>
                                <Tab>Paso 2</Tab>
                                <Tab>Confirmacion</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <Solicitud1 />
                                </TabPanel>
                                <TabPanel>
                                    <Solicitud2 />
                                </TabPanel>
                                <TabPanel>
                                    <Box>
                                        <Solicitud1 />
                                        <Solicitud2 />
                                    </Box>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Enviar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default PanelSolicitud;
