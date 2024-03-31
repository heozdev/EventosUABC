import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Textarea,
  Heading,
  Button,
  Flex,
  Card,
  Image,
  Stack,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  Grid,
  GridItem
} from '@chakra-ui/react'
import Solicitud1 from "./FormatoSolicitud1";
import Solicitud2 from "./FormatoSolicitud2";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

function MostrarEventos() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState('');

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  return (
    <center>
        <Heading>Solicitudes</Heading>

        <Card
          mt={20}
          direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'
          width={{ base: '100%', sm: '400px', md: '500px', lg: '70%' }}
          height={{ base: '200px', sm: '300px', md: '250px' }}
        >
          <Image
            objectFit='cover'
            maxW={{ base: '100%', sm: '200px', md: '200px' }}
            maxH={{ base: '200px', sm: '300px', md: '250px' }}
            src='https://d1csarkz8obe9u.cloudfront.net/posterpreviews/programming-course-lessons-flyer-template-design-d18f9ed41fc90f1491bcf62f9b1be3a2_screen.jpg?ts=1637024772'
            alt='Evento'
          />

          <Stack>
            <CardBody>
              <Heading size='md'>Nombre del Evento</Heading>

              <FormControl mt={2}>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={6}>
                  <GridItem>
                    <FormLabel mt={2}>Fecha</FormLabel>
                    <FormLabel mt={2}>Tipo del evento</FormLabel>
                    <FormLabel mt={2}>Hora inicio</FormLabel>
                    <Button onClick={onOpen} bg='#00723F' color='white' mt={7}>
                      Ver más
                    </Button>
                  </GridItem>
                  <GridItem>
                    <FormLabel mt={2}>Descripción</FormLabel>
                    <FormLabel mt={2}>Categoría</FormLabel>
                    <FormLabel mt={2}>Hora fin</FormLabel>
                  </GridItem>
                  <GridItem>
                    <FormLabel mt={2}>Capacidad</FormLabel>
                    <FormLabel mt={2}>Estado</FormLabel>
                    <FormLabel mt={2}>Co-responsable</FormLabel>
                  </GridItem>
                  <GridItem>
                    <FormLabel mt={2}>Ubicación</FormLabel>
                    <LoadScript googleMapsApiKey="AIzaSyAN374Wr-hVKOGOM2mXSkG_Pddko8zDb8o">
                      <GoogleMap
                        mapContainerStyle={{ width: '150px', height: '150px' }}
                        center={{ lat: 32.632667857327895, lng: -115.44600813750422}}
                        zoom={15}
                      />
                    </LoadScript>
                  </GridItem>
                </Grid>
              </FormControl>
            </CardBody>

            <CardFooter>
            </CardFooter>
          </Stack>
        </Card>

        

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Información del Evento</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Solicitud1 />
              <Solicitud2 />
              <Flex justifyContent='center'>
                <Button colorScheme='green' mt={10} ml={3} onClick={onClose}>
                  Aceptar
                </Button>
                <Button colorScheme='red' mt={10} ml={3} onClick={onClose}>
                  Rechazar
                </Button>
              </Flex>
              <Text mb='8px' mt={10}>Notas: {value}</Text>
              <Textarea
                value={value}
                onChange={handleInputChange}
                placeholder='Agregar observaciones sobre la solicitud'
                size='sm'
              />
            </ModalBody>
            <ModalFooter>
            
            </ModalFooter>
          </ModalContent>
        </Modal>
    </center>
  );
}

export default MostrarEventos