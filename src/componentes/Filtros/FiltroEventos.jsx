
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
    FormControl,
    Select,
    Checkbox,
    Input,
    HStack
  } from '@chakra-ui/react';

function FiltroEventos({isOpenModalFilter, onCloseModalFilter}) {
  return (
    <>
        <Modal isOpen={isOpenModalFilter} onClose={onCloseModalFilter}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filtros</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
                <FormLabel>Ciudad</FormLabel>
                <Select placeholder="Ciudad" >
                    <option>Mexicali</option>
                    <option>Tijuana</option>
                    <option>Ensenada</option>
                    <option>Tecate</option>
                </Select>
            </FormControl>
            <FormControl>
                <FormLabel>Facultad</FormLabel>
                <Select placeholder="Facultad" >
                    <option>Facultad de Ingenieria Mexicali</option>
                    <option>Facultad de Idiomas Mexicali</option>
                    <option>Facultad de Arquitectura</option>
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel>Valor en créditos</FormLabel>
                <HStack paddingLeft={'5px'}> 
                <span>Si</span>
                <Checkbox size='lg' colorScheme='green' defaultChecked borderColor="green" />
                </HStack>
            </FormControl>
            <FormControl>
                <FormLabel>Fecha</FormLabel>
                <Input type="date" name="date"/>
            </FormControl>
            <FormControl>
                <FormLabel>Categoria</FormLabel>
                <Select placeholder="Categoria" >
                    <option>General</option>
                    <option>Conferencia</option>
                    <option>Investigacion</option>
                </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='green' mr={3} onClick={onCloseModalFilter}>
              Filtrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FiltroEventos