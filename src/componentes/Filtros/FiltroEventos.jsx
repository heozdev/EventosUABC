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

  const handleChangeFiltro = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFiltro({ ...filtro, [name]: val });
  };

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
  };

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
                <option value="">Seleccione una ciudad</option>
                <option value="mexicali">Mexicali</option>
                <option value="tijuana">Tijuana</option>
                <option value="ensenada">Ensenada</option>
                <option value="tecate">Tecate</option>
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
                <option value="">Seleccione una facultad</option>
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
            <FormControl>
              <FormLabel>Categoría</FormLabel>
              <Select
                placeholder="Categoría"
                name="categoria"
                value={filtro.categoria}
                onChange={handleChangeFiltro}
              >
                <option value="">Seleccione una categoría</option>
                <option value="general">General</option>
                <option value="conferencia">Conferencia</option>
                <option value="investigacion">Investigación</option>
              </Select>
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
