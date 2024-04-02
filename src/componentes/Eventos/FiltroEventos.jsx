
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
    FormLabel,
    FormControl,
    Select,
    Checkbox,
    Input,
    HStack
  } from '@chakra-ui/react';

function FiltroEventos() {
    const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
        <Button onClick={onOpen} bgColor='#00723F' color='white'>Filtro</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
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
            <Button colorScheme='green' mr={3} onClick={onClose}>
              Filtrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FiltroEventos