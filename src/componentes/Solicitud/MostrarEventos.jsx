import { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Text, Textarea, Heading, Button, Badge, Card, Image, Stack, CardBody, CardFooter,
  FormControl, FormLabel, Grid, GridItem, Flex
} from '@chakra-ui/react';
import Solicitud1 from "./FormatoSolicitud1";
import Solicitud2 from "./FormatoSolicitud2";
import { SearchIcon } from '@chakra-ui/icons'
import { BiSolidFilterAlt } from "react-icons/bi";

function MostrarEventos() {
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
      <Heading size='xl' color={'black'} mt={5}>Solicitudes</Heading>
      <Flex justifyContent='center' alignItems='center' mt={10} ml={600}>
        <BiSolidFilterAlt style={{ color: '#004928', fontSize: '45px', marginRight: '8px' }} />
        <SearchIcon style={{ color: '#004928', fontSize: '45px' }} />
      </Flex>
      
      <Card
        mt={10}
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        borderRadius={10}
        bgColor={'#F5F5F5'}
        width={{ base: '100%', sm: '400px', md: '500px', lg: '50%' }}
        height={{ base: '200px', sm: '300px', md: '240px' }}
        onClick={handleOpen}
        cursor='pointer'
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
            <FormControl>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                <GridItem>
                  <FormLabel mt={2} fontSize="xl">Curso de programación</FormLabel>
                  <FormLabel mt={2} fontSize="xl">Ingeniería</FormLabel>
                  <FormLabel mt={2} fontSize="xl">15 de julio de 2024</FormLabel>
                  <FormLabel mt={2} fontSize="xl">Abad Padilla</FormLabel>
                </GridItem>
                <GridItem>
                  <Badge colorScheme='green' variant='solid' fontSize="md" padding={2.5} borderRadius={15} position={'absolute'} right={0} bottom={0}>
                    Aceptado
                  </Badge>
                </GridItem>
              </Grid>
            </FormControl>
          </CardBody>
          <CardFooter>
          </CardFooter>
        </Stack>
      </Card>

      <Card
        mt={10}
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        borderRadius={10}
        bgColor={'#F5F5F5'}
        width={{ base: '100%', sm: '400px', md: '500px', lg: '50%' }}
        height={{ base: '200px', sm: '300px', md: '240px' }}
        onClick={handleOpen}
        cursor='pointer'
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
            <FormControl>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                <GridItem>
                  <FormLabel mt={2} fontSize="xl">Curso de programación</FormLabel>
                  <FormLabel mt={2} fontSize="xl">Ingeniería</FormLabel>
                  <FormLabel mt={2} fontSize="xl">15 de julio de 2024</FormLabel>
                  <FormLabel mt={2} fontSize="xl">Abad Padilla</FormLabel>
                </GridItem>
                <GridItem>
                  <Badge colorScheme='yellow' variant='solid' fontSize="md" padding={2.5} borderRadius={15} position={'absolute'} right={0} bottom={0}>
                    Pendiente
                  </Badge>
                  <FormLabel fontWeight={'bold'} mt={2} fontSize="xl" position={'absolute'} right={0} top={0}>8=1</FormLabel>
                </GridItem>
              </Grid>
            </FormControl>
          </CardBody>
          <CardFooter>
          </CardFooter>
        </Stack>
      </Card>

      <Card
        mt={10}
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        borderRadius={10}
        bgColor={'#F5F5F5'}
        width={{ base: '100%', sm: '400px', md: '500px', lg: '50%' }}
        height={{ base: '200px', sm: '300px', md: '240px' }}
        onClick={handleOpen}
        cursor='pointer'
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
            <FormControl>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                <GridItem>
                  <FormLabel mt={2} fontSize="xl">Curso de programación</FormLabel>
                  <FormLabel mt={2} fontSize="xl">Ingeniería</FormLabel>
                  <FormLabel mt={2} fontSize="xl">15 de julio de 2024</FormLabel>
                  <FormLabel mt={2} fontSize="xl">Abad Padilla</FormLabel>
                </GridItem>
                <GridItem>
                  <Badge colorScheme='red' variant='solid' fontSize="md" padding={2.5} borderRadius={15} position={'absolute'} right={0} bottom={0}>
                    Rechazado
                  </Badge>
                </GridItem>
              </Grid>
            </FormControl>
          </CardBody>
          <CardFooter>
          </CardFooter>
        </Stack>
      </Card>

      <Card
        mt={10}
        mb={10}
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        borderRadius={10}
        bgColor={'#F5F5F5'}
        width={{ base: '100%', sm: '400px', md: '500px', lg: '50%' }}
        height={{ base: '200px', sm: '300px', md: '240px' }}
        onClick={handleOpen}
        cursor='pointer'
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
            <FormControl>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                <GridItem>
                  <FormLabel mt={2} fontSize="xl">Curso de programación</FormLabel>
                  <FormLabel mt={2} fontSize="xl">Ingeniería</FormLabel>
                  <FormLabel mt={2} fontSize="xl">15 de julio de 2024</FormLabel>
                  <FormLabel mt={2} fontSize="xl">Abad Padilla</FormLabel>
                </GridItem>
                <GridItem>
                  <Badge colorScheme='green' variant='solid' fontSize="md" padding={2.5} borderRadius={15} position={'absolute'} right={0} bottom={0}>
                    Aceptado
                  </Badge>
                  <FormLabel fontWeight={'bold'} mt={2} fontSize="xl" position={'absolute'} right={0} top={0}>8=1</FormLabel>
                </GridItem>
              </Grid>
            </FormControl>
          </CardBody>
          <CardFooter>
          </CardFooter>
        </Stack>
      </Card>

      <Modal isOpen={isOpen} onClose={handleClose} size={modalSize}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Información del Evento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div style={{display:'flex', gap: '10px'}}>
              <Solicitud1/>
              <Solicitud2/>
            </div>
            <Text mb='8px' mt={10}>Notas: {value}</Text>
            <Textarea
              value={value}
              onChange={handleInputChange}
              placeholder='Agregar observaciones sobre la solicitud'
              size='sm'
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='green' mr={3} onClick={handleClose}>
              Aceptar
            </Button>
            <Button colorScheme='red' mr={3} onClick={handleClose}>
              Rechazar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </center>
  );
}

export default MostrarEventos;