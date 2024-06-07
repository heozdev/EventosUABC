import { useState, useEffect } from 'react';
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
  HStack,
} from '@chakra-ui/react';


function FiltroEventos({ isOpenModalFilter, onCloseModalFilter, solicitudes, setSolicitudes }) {
  const [filtro, setFiltro] = useState({
    ciudad: "",
    facultad: "",
    valorEnCreditos: false,
    fecha: "",
    categoria: "",
  });

  const [filteredSolicitudes, setFilteredSolicitudes] = useState([]);

  useEffect(() => {
    setFilteredSolicitudes(filterSolicitudes());
  }, [filtro, solicitudes]);

  const handleChangeFiltro = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFiltro({ ...filtro, [name]: newValue });
  };

  const[solicitudesFiltradas, setSolicitudesFiltradas] = useState([])
  const[solicitudesOriginales, setSolicitudesOriginales] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/solicitudes")
      .then(response => response.json())
      .then(data => {
        setSolicitudesOriginales(data);
        setSolicitudesFiltradas(data); // Inicialmente, mostramos todas las solicitudes
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }, []);



  const filterSolicitudes = () => {
    return solicitudes.filter((evento) => {
      return (
        (filtro.ciudad === "" ||
          (evento.ciudad && evento.ciudad.toLowerCase().includes(filtro.ciudad.toLowerCase()))) &&
        (filtro.facultad === "" ||
          (evento.facultad && evento.facultad.toLowerCase().includes(filtro.facultad.toLowerCase()))) &&
        (filtro.valorEnCreditos === false ||
          evento.valorEnCreditos.toString() === filtro.valorEnCreditos.toString()) &&
        (filtro.fecha === "" ||
          evento.fecha === filtro.fecha) &&
        (filtro.categoria === "" ||
          (evento.categoria && evento.categoria.toLowerCase().includes(filtro.categoria.toLowerCase())))
      );
    });
  };

  const handleFilter = () => {
    onCloseModalFilter();
    setSolicitudes(filterSolicitudes());

    // Filtramos las solicitudes originales con los criterios del filtro
    const nuevasSolicitudesFiltradas = solicitudesOriginales.filter(solicitud => {
      if (
        (filtro.ciudad && solicitud.ciudad.toLowerCase() !== filtro.ciudad.toLowerCase()) ||
        (filtro.facultad && solicitud.facultad !== filtro.facultad) ||
        (filtro.valorEnCreditos && !solicitud.valorEnCreditos) ||
        (filtro.fecha && solicitud.fecha !== filtro.fecha) ||
        (filtro.categoria && solicitud.categoria.toLowerCase() !== filtro.categoria.toLowerCase())
      ) {
        return false; // No cumple con los criterios de filtro, excluimos la solicitud
      }
      return true; // Cumple con todos los criterios de filtro, incluimos la solicitud
    });
  
    // Actualizamos el estado de solicitudesFiltradas con las nuevas solicitudes filtradas
    setSolicitudesFiltradas(nuevasSolicitudesFiltradas);
  };

  const opcionesCiudad = ["Mexicali", "Tijuana", "Ensenada", "Tecate" ]

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
              <Select
                placeholder="Ciudad"
                name="ciudad"
                value={filtro.ciudad}
                onChange={handleChangeFiltro}
              >

              {opcionesCiudad.map((tipo, index)=>(
                <option value={tipo} key={index}>{tipo}</option>
              ))}
          
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Facultad</FormLabel>
              <Select
                placeholder="Facultad"
                name="facultad"
                value={filtro.facultad}
                onChange={handleChangeFiltro}
              >
                <option value="ingenieria">Facultad de Ingeniería Mexicali</option>
                <option value="idiomas">Facultad de Idiomas Mexicali</option>
                <option value="arquitectura">Facultad de Arquitectura</option>
                <option value="artes">Facultad de Artes</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Valor en créditos</FormLabel>
              <HStack paddingLeft={"5px"}>
                <label>Si</label>
                <Checkbox
                  size="lg"
                  colorScheme="green"
                  defaultChecked={filtro.valorEnCreditos}
                  borderColor="green"
                  name="valorEnCreditos"
                  onChange={handleChangeFiltro}
                />
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel>Fecha</FormLabel>
              <Input
                type="date"
                name="fecha"
                value={filtro.fecha}
                onChange={handleChangeFiltro}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleFilter}>
              Filtrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FiltroEventos;
