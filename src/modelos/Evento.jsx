import {  useState } from "react";
import {
    Center,
    Card,
    CardBody,
    Image,
    Stack,
    FormControl,
    FormLabel,
    Badge,
    CardFooter,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    useToast
} from "@chakra-ui/react";

export const Evento = ({ evento,onDelete }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalSize, setModalSize] = useState("xl");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const toast = useToast();

    const handleOpen = () => {
        setModalSize("xl");
        onOpen();
    };

    const handleClose = () => {
        onClose();
    };

    const eliminarEvento = () => {
        setShowConfirmModal(true);
    };

    
    
    const handleConfirmEliminar =  async() => {
        setShowConfirmModal(false);
        onClose();

        try {
            const response = await fetch(`http://localhost:3000/eventos/${evento.id}`, {
                method: 'DELETE',
            });

            toast({
                title: "Solicitud eliminada.",
                description: "La solicitud ha sido eliminada correctamente.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el evento');
                
            }

            const data = await response.json();
            console.log(data.message);

            onDelete(evento.id)

            
        } catch (error) {
            console.error( error);
            toast({
                title: "Error",
                description: "Hubo un problema al eliminar la solicitud.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
        }
    };


    
    const handleCancelEliminar = () => {
        setShowConfirmModal(false);
    };

    
    return (
        <Center>
            <Card
                mt={10}
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                borderRadius={10}
                bgColor={"#F5F5F5"}
                width={{ base: "90%", sm: "80%", md: "70%", lg: "60%" }}
                mx="auto"
                height={{ base: "auto", sm: "200px", md: "250px" }}
                onClick={handleOpen}
                cursor="pointer"
            >
                <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "200px", md: "40%" }}
                    maxH={{ base: "200px", sm: "300px", md: "100%" }}
                    src="src/recursos/imagenes/ejemploEvento.jpg"
                    alt="Evento"
                />
                <Stack>
                    <CardBody>
                        <FormControl>
                            <FormLabel mt={2} fontSize="xl">
                                {evento.solicitud.nombre}
                            </FormLabel>
                            <FormLabel mt={2} fontSize="xl">
                                {evento.solicitud.ubicacion?.direccion}
                            </FormLabel>
                            <FormLabel mt={2} fontSize="xl">
                                {evento.solicitud.fecha}
                            </FormLabel>
                            <FormLabel mt={2} fontSize="xl">
                                {evento.solicitud.horaInicio}
                            </FormLabel>
                        </FormControl>
                    </CardBody>
                    <CardFooter>
                        {evento.estado === "Vigente" && (
                            <Badge
                                colorScheme="green"
                                variant="solid"
                                fontSize="md"
                                padding={2.5}
                                borderRadius={15}
                                position="absolute"
                                right={3}
                                bottom={3}
                                mr={5}
                                mb={3}
                            >
                                Vigente
                            </Badge>
                        )}
                    </CardFooter>
                </Stack>
            </Card>
            <Modal isOpen={isOpen} onClose={handleClose} size={modalSize}>
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
                                    {evento.id}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Nombre del Evento: </b>
                                    {evento.solicitud.nombre}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Responsable: </b>
                                    {evento.solicitud.responsable}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Modalidad: </b>
                                    {evento.solicitud.modalidad}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Capacidad: </b>
                                    {evento.solicitud.capacidad}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Valor en Créditos: </b>
                                    {evento.solicitud.valorEnCreditos
                                        ? "Sí"
                                        : "No"}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Total de Sellos: </b>
                                    {evento.solicitud.totalSellos}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Hora Inicio: </b>
                                    {evento.solicitud.horaInicio}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Hora Fin: </b>
                                    {evento.solicitud.horaFin}
                                </FormLabel>
                            </FormControl>
                            <FormControl>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Descripción: </b>
                                    {evento.solicitud.descripcion}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Facultad: </b>
                                    {evento.solicitud.ubicacion?.facultad}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Estado: </b>
                                    {evento.solicitud.ubicacion?.estado}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Campus: </b>
                                    {evento.solicitud.ubicacion?.campus}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Ciudad: </b>
                                    {evento.solicitud.ubicacion?.ciudad}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Dirección: </b>
                                    {evento.solicitud.ubicacion?.direccion}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Aula: </b>
                                    {evento.solicitud.ubicacion?.aula}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Fecha: </b>
                                    {evento.solicitud.fecha}
                                </FormLabel>
                                <FormLabel mt={3} fontSize="m">
                                    <b>Fecha de creación: </b>
                                    {evento.solicitud.fechaCreacion}
                                </FormLabel>
                            </FormControl>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            name="Eliminar"
                            colorScheme="red"
                            mr={10}
                            onClick={eliminarEvento}
                            position="absolute"
                            left={10}
                            bottom={5}
                        >
                            Eliminar
                        </Button>
                        <Modal
                            isOpen={showConfirmModal}
                            onClose={handleCancelEliminar}
                        >
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Confirmar eliminación</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    ¿Seguro que quieres eliminar este evento?
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        colorScheme="green"
                                        mr={3}
                                        onClick={handleCancelEliminar}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        colorScheme="red"
                                        onClick={handleConfirmEliminar}
                                    >
                                        Eliminar
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Center>
    );
};
