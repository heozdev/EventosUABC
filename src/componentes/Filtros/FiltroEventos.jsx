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

  const [solicitudesFiltradas, setSolicitudesFiltradas] = useState([]);
  const [solicitudesOriginales, setSolicitudesOriginales] = useState([]);

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

  useEffect(() => {
    setSolicitudesFiltradas(filtrarSolicitudes());
  }, [filtro, solicitudesOriginales]);

  const CambiarFiltro = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFiltro({ ...filtro, [name]: newValue });
  };

  const filtrarSolicitudes = () => {
    return solicitudesOriginales.filter((evento) => {
      return (
        (filtro.ciudad === "" ||
          (evento.ubicacion.ciudad && evento.ubicacion.ciudad.toLowerCase().includes(filtro.ciudad.toLowerCase()))) &&
        (filtro.facultad === "" ||
          (evento.ubicacion.facultad && evento.ubicacion.facultad.toLowerCase().includes(filtro.facultad.toLowerCase()))) &&
        (!filtro.valorEnCreditos || evento.valorEnCreditos === filtro.valorEnCreditos) &&
        (filtro.fecha === "" || evento.fecha === filtro.fecha) &&
        (filtro.categoria === "" || (evento.categoria && evento.categoria.toLowerCase().includes(filtro.categoria.toLowerCase())))
      );
    });
  };

  const Filtro = () => {
    onCloseModalFilter();
    setSolicitudes(filtrarSolicitudes());
  };

  const opcionesCiudad = ["Mexicali", "Tijuana", "Ensenada", "Tecate"];

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
                onChange={CambiarFiltro}
              >
                {opcionesCiudad.map((tipo, index) => (
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
                onChange={CambiarFiltro}
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
                  checked={filtro.valorEnCreditos}
                  name="valorEnCreditos"
                  onChange={CambiarFiltro}
                />
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel>Fecha</FormLabel>
              <Input
                type="date"
                name="fecha"
                value={filtro.fecha}
                onChange={CambiarFiltro}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={Filtro}>
              Filtrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FiltroEventos;