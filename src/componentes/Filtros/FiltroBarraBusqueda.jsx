import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  FormControl,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const FiltroBarraBusqueda = ({ isOpenModalSearch, onCloseModalSearch, solicitudes, setSolicitudes }) => {
  const [search, setSearch] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [originalSolicitudes, setOriginalSolicitudes] = useState([]);

  useEffect(() => {
    setSearch(""); // Restablecer el estado search cuando isOpenModalSearch cambia
    setShowAlert(false);
    if (originalSolicitudes.length === 0) {
      setOriginalSolicitudes(solicitudes); // Guardar las solicitudes originales si aún no se han guardado
    }
  }, [isOpenModalSearch, solicitudes, originalSolicitudes]);

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    console.log("Solicitudes originales:", originalSolicitudes);
    const filtered = originalSolicitudes.filter(evento => {
      const nombreIncluido = evento.nombre.toLowerCase().includes(search.toLowerCase());
      const facultadIncluida = evento.ubicacion.facultad.toLowerCase().includes(search.toLowerCase());
      const ciudadIncluida = evento.ubicacion.ciudad.toLowerCase().includes(search.toLowerCase());

      return nombreIncluido || ciudadIncluida || facultadIncluida;
    });

    console.log("Solicitudes filtradas:", filtered);

    if (filtered.length === 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      setSolicitudes(filtered);
      onCloseModalSearch();
    }
  };

  const handleShowAll = () => {
    setSolicitudes(originalSolicitudes); // Restablecer las solicitudes al estado original
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
          <ModalHeader>Barra de búsqueda</ModalHeader>
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
              Mostrar todas
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FiltroBarraBusqueda;

