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
    FormControl
  } from '@chakra-ui/react';
import { useState,useEffect } from 'react';

const FiltroBarraBusqueda = ({ isOpenModalSearch, onCloseModalSearch, solicitudes, setSolicitudes }) => {
  const [search, setSearch] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setSearch(""); // Restablecer el estado search cuando isOpenModalSearch cambia
    setShowAlert(false);
  }, [isOpenModalSearch]);

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    const filtered = solicitudes.filter(evento => {
      const nombreIncluido = evento.nombre.toLowerCase().includes(search.toLowerCase());
      const facultadIncluida = evento.ubicacion.facultad.toLowerCase().includes(search.toLowerCase());
      const ciudadIncluida = evento.ubicacion.ciudad.toLowerCase().includes(search.toLowerCase());

      return nombreIncluido || ciudadIncluida || facultadIncluida;
    });

    if (filtered.length === 0) {
      setShowAlert(true);
    } else {
      onCloseModalSearch();
      setSolicitudes(filtered);
    }
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
          <ModalHeader>Barra de búsqueda </ModalHeader>
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
              <Alert status="warning" mt={4} onClose={() => setShowAlert(false)}>
                <AlertIcon />
                No se encontraron resultados.
              </Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='green' mr={3} onClick={handleSearch}>
              Buscar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FiltroBarraBusqueda;
