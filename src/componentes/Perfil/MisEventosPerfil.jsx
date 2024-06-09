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
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { FaUserPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FormularioEditarEvento } from "../Solicitud/FormularioEditarEvento";

export const MisEventosPerfil = ({ evento }) => {
    const [eventos, setEventos] = useState([]);
    const [selectedEvento, setSelectedEvento] = useState(null);
    const [isRegistroModalOpen, setIsRegistroModalOpen] = useState(false);
    const [showEditarFormulario, setShowEditarFormulario] = useState(false);
    const [textArea, setTextArea] = useState("");
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuario"))
    );

    const handleCardClick = (eventoId) => {
        navigate(`/perfil/editar-evento/${eventoId}`);
    };

    const {
        isOpen: isOpenNotasCancelacion,
        onOpen: onOpenNotasCancelacion,
        onClose: onCloseNotasCancelacion,
    } = useDisclosure();

    const toast = useToast();

    useEffect(() => {
        if (usuario) {
            fetch(`http://localhost:3000/usuarios/${usuario.id}/eventos`)
                .then((response) => response.json())
                .then((data) => {
                    setEventos(data);
                })
                .catch((error) => {
                    console.error(
                        "Error al obtener los eventos del usuario:",
                        error
                    );
                });
        }
    }, []);

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
                        tipoDeNotificacionId: 5,
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
        setShowEditarFormulario(false);
    };

    const handleOpen = (evento) => setSelectedEvento(evento);
    const handleClose = () => setSelectedEvento(null);

    const handleOpenRegistroModal = () => setIsRegistroModalOpen(true);
    const handleCloseRegistroModal = () => setIsRegistroModalOpen(false);

    const handleRegistroAlumno = () => {
        // Lógica para registrar al alumno en el evento
        // ...

        handleCloseRegistroModal();
    };

    return (
        <Stack spacing={4}>
            {eventos.map((evento) => {
                return (
                    <Flex key={evento.id} alignItems="stretch">
                        <Card
                            mt={3}
                            direction={{ base: "column", sm: "row" }}
                            overflow="hidden"
                            variant="outline"
                            borderRadius={10}
                            bgColor={"#F5F5F5"}
                            onClick={() => handleOpen(evento)}
                            cursor="pointer"
                            position="relative"
                            flex={1}
                            transition="transform 0.3s"
                            _hover={{
                                transform: "scale(1.02)",
                                boxShadow: "lg",
                            }}
                        >
                            {evento.solicitud.valorEnCreditos && (
                                <Text
                                    position="absolute"
                                    right={20}
                                    top={3}
                                    fontWeight="bold"
                                >
                                    8=1
                                </Text>
                            )}
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
                                            {evento.solicitud.nombre}
                                        </FormLabel>
                                    </FormControl>
                                </CardBody>
                            </Stack>
                            <EditIcon
                                position={"absolute"}
                                top={3}
                                right={10}
                                color={"#00723F"}
                                fontSize={"xl"}
                                cursor="pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCardClick(evento.id);
                                }}
                            />
                            <DeleteIcon
                                position={"absolute"}
                                top={3}
                                right={3}
                                color={"#00723F"}
                                fontSize={"xl"}
                                cursor="pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onOpenNotasCancelacion();
                                }}
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

            {selectedEvento && (
                <Modal
                    isOpen={!!selectedEvento}
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
                                        {selectedEvento.id}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Nombre del Evento: </b>
                                        {selectedEvento.solicitud.nombre}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Responsable: </b>
                                        {
                                            selectedEvento.solicitud
                                                .nombreResponsable
                                        }
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Modalidad: </b>
                                        {selectedEvento.solicitud.modalidad}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Capacidad: </b>
                                        {selectedEvento.solicitud.capacidad}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Valor en Créditos: </b>
                                        {selectedEvento.solicitud
                                            .valorEnCreditos
                                            ? "Sí"
                                            : "No"}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Total de Sellos: </b>
                                        {selectedEvento.solicitud.totalSellos}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Hora Inicio: </b>
                                        {selectedEvento.solicitud.horaInicio}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Hora Fin: </b>
                                        {selectedEvento.solicitud.horaFin}
                                    </FormLabel>
                                </FormControl>
                                <FormControl>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Descripción: </b>
                                        {selectedEvento.solicitud.descripcion}
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Facultad: </b>
                                        {
                                            selectedEvento.solicitud.ubicacion
                                                .facultad
                                        }
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Estado: </b>
                                        {
                                            selectedEvento.solicitud.ubicacion
                                                .estado
                                        }
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Campus: </b>
                                        {
                                            selectedEvento.solicitud.ubicacion
                                                .campus
                                        }
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Ciudad: </b>
                                        {
                                            selectedEvento.solicitud.ubicacion
                                                .ciudad
                                        }
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Dirección: </b>
                                        {
                                            selectedEvento.solicitud.ubicacion
                                                .direccion
                                        }
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Aula: </b>
                                        {
                                            selectedEvento.solicitud.ubicacion
                                                .aula
                                        }
                                    </FormLabel>
                                    <FormLabel mt={3} fontSize="m">
                                        <b>Fecha: </b>
                                        {selectedEvento.solicitud.fecha}
                                    </FormLabel>
                                </FormControl>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme="blue"
                                onClick={() =>
                                    handleCardClick(selectedEvento.id)
                                }
                                mr={5}
                            >
                                Editar Eventos
                            </Button>
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
                <FormularioEditarEvento
                    solicitud={selectedSolicitud}
                    onClose={handleCloseEditarFormulario}
                />
            )}
        </Stack>
    );
};
