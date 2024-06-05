import { useEffect, useState } from "react";
import {
    Card,
    Stack,
    CardBody,
    Image,
    FormControl,
    FormLabel,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Flex,
    Box,
    Input,
    Button,
    useDisclosure,
    useToast,
    Textarea,
    Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { FaUserPlus } from "react-icons/fa6";
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { FormularioEditarSolicitud } from "../Solicitud/FormularioEditarSolicitud";

export const MisEventosPerfil = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [selectedSolicitud, setSelectedSolicitud] = useState(null);
    const [isRegistroModalOpen, setIsRegistroModalOpen] = useState(false);
    const [showEditarFormulario, setShowEditarFormulario] = useState(false);
    const [textArea, setTextArea] = useState("");

    const {
        isOpen: isOpenNotasCancelacion,
        onOpen: onOpenNotasCancelacion,
        onClose: onCloseNotasCancelacion,
    } = useDisclosure();

    const toast = useToast();

    useEffect(() => {
        fetch("http://localhost:3000/solicitudes")
            .then((response) => response.json())
            .then((data) => {
                const pendientes = data.filter(
                    (solicitud) => solicitud.estado === "Aceptado"
                );
                setSolicitudes(pendientes);
            });
    }, []);

    const handleEditarEvento = (solicitud) => {
        setSelectedSolicitud(solicitud);
        setShowEditarFormulario(true);
    };

    const handleCancelarEvento = () => {
        if (!textArea.trim().length) {
            toast({
                title: "Error",
                description:
                    "Por favor ingrese una nota antes de enviar la solicitud",
                status: "error",
                position: "top",
                duration: 2000,
                isClosable: true,
            });

            return;
        }

        // Obtener todos los usuarios con el rol "Encargado"
        fetch("http://localhost:3000/usuarios/encargados")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener los encargados");
                }
                return response.json();
            })
            .then((encargados) => {
                // Crear una notificación para cada encargado
                const promesas = encargados.map((encargado) => {
                    const notificacion = {
                        usuarioId: encargado.id,
                        mensaje: `Un evento ha sido cancelado: ${textArea}`,
                        leida: false,
                    };

                    return fetch("http://localhost:3000/notificaciones", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(notificacion),
                    }).then((response) => {
                        if (!response.ok) {
                            throw new Error("Error al crear la notificación");
                        }
                    });
                });

                return Promise.all(promesas);
            })
            .then(() => {
                toast({
                    title: "Solicitud enviada con éxito",
                    status: "success",
                    position: "top",
                    duration: 2000,
                    isClosable: true,
                });

                onCloseNotasCancelacion();
            })
            .catch((error) => {
                toast({
                    title: "Error",
                    description: error.message,
                    status: "error",
                    position: "top",
                    duration: 2000,
                    isClosable: true,
                });
            });

        setTextArea("");
        handleClose();
    };

    const handleCloseEditarFormulario = () => {
        setSelectedSolicitud(null);
        setShowEditarFormulario(false);
    };

    const handleOpen = (solicitud) => setSelectedSolicitud(solicitud);
    const handleClose = () => setSelectedSolicitud(null);

    const handleOpenRegistroModal = () => setIsRegistroModalOpen(true);
    const handleCloseRegistroModal = () => setIsRegistroModalOpen(false);

    const handleRegistroAlumno = () => {
        // Lógica para registrar al alumno en el evento
        // ...

        handleCloseRegistroModal();
    };

    return (
        <Stack spacing={4}>
            {solicitudes.map((solicitud) => {
                return (
                    <Flex key={solicitud.id} alignItems="stretch">
                        <Card
                            mt={3}
                            direction={{ base: "column", sm: "row" }}
                            overflow="hidden"
                            variant="outline"
                            borderRadius={10}
                            bgColor={"#F5F5F5"}
                            onClick={() => handleOpen(solicitud)}
                            cursor="pointer"
                            position="relative"
                            flex={1}
                            transition="transform 0.3s"
                            _hover={{
                                transform: "scale(1.02)",
                                boxShadow: "lg",
                            }}
                        >
                            {solicitud.valorEnCreditos && <Text 
                                    position="absolute"
                                    right={20}
                                    top={3}
                                    fontWeight="bold"
                                >8=1</Text> 
                            }
                            <Image
                                objectFit="cover"
                                maxW={{ base: "100%", sm: "200px", md: "20%" }}
                                maxH={{
                                    base: "200px",
                                    sm: "300px",
                                    md: "100%",
                                }}
                                src="src/recursos/imagenes/ejemploEvento.jpg"
                                alt="Evento"
                            />
                            <Stack>
                                <CardBody>
                                    <FormControl>
                                        <FormLabel mt={6} fontSize="xl">
                                            {solicitud.nombre}
                                        </FormLabel>
                                    </FormControl>
                                </CardBody>
                            </Stack>
                            <ChakraLink
                                as={RouterLink}
                                to={`editar-evento/${solicitud.id}`}
                                position="absolute"
                                top={3}
                                right={10}
                                color="#00723F"
                                cursor="pointer"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <EditIcon fontSize="26px" />
                            </ChakraLink>
                            <DeleteIcon
                                position={"absolute"}
                                top={3}
                                right={3}
                                color={"#00723F"}
                                fontSize={"xl"}
                            />
                        </Card>
                        <Box
                            bg="#00723F"
                            width="50px"
                            ml={3}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            borderRadius={10}
                            cursor="pointer"
                            onClick={handleOpenRegistroModal}
                            transition="transform 0.3s"
                            _hover={{
                                transform: "scale(1.02)",
                                boxShadow: "lg",
                            }}
                        >
                            <FaUserPlus color="white" fontSize="26px" />
                        </Box>
                    </Flex>
                );
            })}

            {selectedSolicitud && (
                <Modal
                    isOpen={!!selectedSolicitud}
                    onClose={handleClose}
                    size="5xl"
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Información del Evento</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    fontSize: "18px",
                                }}
                            >
                                <FormControl>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>ID del Evento: </b>
                                        {selectedSolicitud.id}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Nombre del Evento: </b>
                                        {selectedSolicitud.nombre}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Responsable: </b>
                                        {selectedSolicitud.responsable}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Modalidad: </b>
                                        {selectedSolicitud.modalidad}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Capacidad: </b>
                                        {selectedSolicitud.capacidad}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Valor en Créditos: </b>
                                        {selectedSolicitud.valorEnCreditos ? "Sí" : "No"}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Total de Sellos: </b>
                                        {selectedSolicitud.totalSellos}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Hora Inicio: </b>
                                        {selectedSolicitud.horaInicio}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Hora Fin: </b>
                                        {selectedSolicitud.horaFin}
                                    </FormLabel>
                                </FormControl>
                                <FormControl>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Descripción: </b>
                                        {selectedSolicitud.descripcion}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Facultad: </b>
                                        {selectedSolicitud.ubicacion.facultad}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Estado: </b>
                                        {selectedSolicitud.ubicacion.estado}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Campus: </b>
                                        {selectedSolicitud.ubicacion.campus}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Ciudad: </b>
                                        {selectedSolicitud.ubicacion.ciudad}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Dirección: </b>
                                        {selectedSolicitud.ubicacion.direccion}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Aula: </b>
                                        {selectedSolicitud.ubicacion.aula}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Fecha: </b>
                                        {selectedSolicitud.fecha}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Fecha de envio: </b>
                                        {format(
                                            new Date(selectedSolicitud.fecha),
                                            "dd/MM/yyyy HH:mm:ss"
                                        )}
                                    </FormLabel>
                                </FormControl>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme="red"
                                onClick={onOpenNotasCancelacion}
                            >
                                Solicitar cancelacion
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}

            <Modal
                isOpen={isOpenNotasCancelacion}
                onClose={onCloseNotasCancelacion}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Solicitar cancelacion del evento.</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Textarea
                            value={textArea}
                            onChange={(e) => {
                                setTextArea(e.target.value);
                            }}
                            placeholder="Ingrese aqui, el motivo por el cual desea cancelar el evento"
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="red"
                            mr={3}
                            variant={"outline"}
                            onClick={handleCancelarEvento}
                        >
                            Enviar solicitud
                        </Button>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={onCloseNotasCancelacion}
                        >
                            Regresar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal
                isOpen={isRegistroModalOpen}
                onClose={handleCloseRegistroModal}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Registro de Alumno</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Nombre del Alumno</FormLabel>
                            <Input placeholder="Ingrese el nombre del alumno" />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Matrícula</FormLabel>
                            <Input placeholder="Ingrese la matrícula del alumno" />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={handleRegistroAlumno}
                        >
                            Registrar
                        </Button>
                        <Button onClick={handleCloseRegistroModal}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {showEditarFormulario && (
                <FormularioEditarSolicitud
                    solicitud={selectedSolicitud}
                    onClose={handleCloseEditarFormulario}
                />
            )}
        </Stack>
    );
};
