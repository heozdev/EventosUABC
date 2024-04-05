import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';

import Solicitud1 from "../componentes/Solicitud/FormatoSolicitud1";
import Solicitud2 from "../componentes/Solicitud/FormatoSolicitud2";

export const Solicitud = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  const [modalSize] = useState("5xl"); 
  return (
    <center>
      <Card
        mt={10}
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="outline"
        borderRadius={10}
        bgColor={'#F5F5F5'}
        width={{ base: '100%', sm: '400px', md: '500px', lg: '50%' }}
        height={{ base: '200px', sm: '300px', md: '240px' }}
        onClick={handleOpen}
        cursor="pointer"
      >
        <Image
          objectFit="cover"
          maxW={{ base: '100%', sm: '200px', md: '200px' }}
          maxH={{ base: '200px', sm: '300px', md: '250px' }}
          src="src/recursos/imagenes/ejemploEvento.jpg"
          alt="Evento"
        />
        <Stack>
          <CardBody>
            <FormControl>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                <GridItem>
                  <FormLabel mt={2} fontSize="xl">
                    Conferencia de Psicología
                  </FormLabel>
                  <FormLabel mt={2} fontSize="xl">
                    Ciencias Humanas
                  </FormLabel>
                  <FormLabel mt={2} fontSize="xl">
                    11 de Mayo de 2024
                  </FormLabel>
                  <FormLabel mt={2} fontSize="xl">
                    Cristina Yang
                  </FormLabel>
                </GridItem>
                <GridItem>
                  <Badge
                    colorScheme="green"
                    variant="solid"
                    fontSize="md"
                    padding={2.5}
                    borderRadius={15}
                    position="absolute"
                    right={0}
                    bottom={0}
                  >
                    Aceptado
                  </Badge>
                </GridItem>
              </Grid>
            </FormControl>
          </CardBody>
          <CardFooter></CardFooter>
        </Stack>
      </Card>
      <Modal isOpen={isOpen} onClose={handleClose} size={modalSize}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Información del Evento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Solicitud1 />
              <Solicitud2 />
            </div>
            <Text mb="8px" mt={10}>
              Notas: {value}
            </Text>
            <Textarea
              value={value}
              onChange={handleInputChange}
              placeholder="Agregar observaciones sobre la solicitud"
              size="sm"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleClose}>
              Aceptar
            </Button>
            <Button colorScheme="red" mr={3} onClick={handleClose}>
              Rechazar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </center>
  );
};