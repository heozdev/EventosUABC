import { useState, useEffect } from 'react';
import { 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalCloseButton, 
    ModalBody, 
    FormControl, 
    FormLabel, 
    Input, 
    Alert, 
    AlertIcon, 
    ModalFooter, 
    Button } 
    from '@chakra-ui/react';

    const FiltroBarraBusquedaEventos = ({ isOpenModalSearch, onCloseModalSearch, eventos, setEventos }) => {
        const [search, setSearch] = useState("");
        const [showAlert, setShowAlert] = useState(false);
        const [originalEventos, setOriginalEventos] = useState([]);
    
        useEffect(() => {
            setSearch(""); // Restablecer el estado search cuando isOpenModalSearch cambia
            setShowAlert(false);
            if (originalEventos.length === 0) {
                setOriginalEventos(eventos); // Guardar los eventos originales si aún no se han guardado
            }
        }, [isOpenModalSearch, eventos, originalEventos]);
    
        const handleChangeSearch = (e) => {
            setSearch(e.target.value);
        };
    
        const handleSearch = () => {
            console.log("Eventos originales:", originalEventos);
            const filtered = originalEventos.filter(evento => {
                const nombreIncluido = evento.solicitud.nombre.toLowerCase().includes(search.toLowerCase());
                const facultadIncluida = evento.solicitud.ubicacion.facultad.toLowerCase().includes(search.toLowerCase());
                const ciudadIncluida = evento.solicitud.ubicacion.ciudad.toLowerCase().includes(search.toLowerCase());
    
                return nombreIncluido || ciudadIncluida || facultadIncluida;
            });
    
            console.log("Eventos filtrados:", filtered);
    
            if (filtered.length === 0) {
                setShowAlert(true);
            } else {
                setShowAlert(false);
                setEventos(filtered);
                onCloseModalSearch();
            }
        };
    
        const handleShowAll = () => {
            setEventos(originalEventos); // Restablecer los eventos al estado original
            onCloseModalSearch();
        };
    
        const handleCloseModal = () => {
            setShowAlert(false);
            onCloseModalSearch();
        };
    
        return (
            <>
                <Modal isOpen={isOpenModalSearch} onClose={handleCloseModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Barra de búsqueda de eventos</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Ingresa alguna palabra clave</FormLabel>
                                <Input
                                    placeholder='Facultad, ciudad, evento'
                                    type='text'
                                    value={search}
                                    onChange={handleChangeSearch}
                                />
                            </FormControl>
                            {showAlert && (
                                <Alert status="warning" mt={4}>
                                    <AlertIcon />
                                    No se encontraron resultados.
                                </Alert>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='green' mr={3} onClick={handleSearch}>
                                Buscar
                            </Button>
                            <Button colorScheme='green' onClick={handleShowAll}>
                                Mostrar todos
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        );
    };
    
    export default FiltroBarraBusquedaEventos;
