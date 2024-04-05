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
  } from '@chakra-ui/react';

const FiltroBarraBusqueda = ({isOpenModalSearch, onCloseModalSearch}) => {
  return (
    <>
    <Modal isOpen={isOpenModalSearch} onClose={onCloseModalSearch}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Barra de busqueda </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>Ingresa alguna palabra clave</FormLabel>
            <Input placeholder='Facultad, carrera, evento'/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='green' mr={3} onClick={onCloseModalSearch}>
              Buscar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FiltroBarraBusqueda