import {useState, useEffect} from 'react'

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

function FiltroEventos({ isOpenModalFilter, onCloseModalFilter,solicitudes,setSolicitudes }) {
  
  /**
   * Filtro de solicitudes
   */
  const [filtro, setFiltro] = useState({
    ciudad: "",
    facultad: "",
    valorEnCreditos: false,
    fecha: "",
    categoria: "",
  });

  // Filtro de solicitudes
  const [filteredSolicitudes, setFilteredSolicitudes] = useState([]);


  // Actualizar solicitudes filtradas
  useEffect(() => {
    setFilteredSolicitudes(filterSolicitudes());
  }, [filtro, solicitudes]);


  // Actualizar solicitudes filtradas
  const handleChangeFiltro = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFiltro({ ...filtro, [name]: val });
  };


  // Filtrar solicitudes por ciudad, facultad, valor en creditos, fecha y categoria
  const filterSolicitudes = () => {
    return solicitudes.filter((evento) => {
      return (
        (filtro.ciudad === "" || 
          (evento.ciudad && evento.ciudad.toLowerCase()
          .includes(filtro.ciudad.toLowerCase()))) &&
        (filtro.facultad === "" || 
          (evento.facultad && evento.facultad.toLowerCase().
          includes(filtro.facultad.toLowerCase()))) &&
        (filtro.valorEnCreditos === false ||
          evento.valorEnCreditos.
          toString() === filtro.valorEnCreditos.toString()) &&
        (filtro.fecha === "" ||
          evento.fecha === filtro.fecha) &&
        (filtro.categoria === "" || 
          (evento.categoria && evento.categoria.
          toLowerCase().
          includes(filtro.categoria.toLowerCase())))
      );
    });
  };
  


  // Función para manejar el filtro
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
                <option>Mexicali</option>
                <option>Tijuana</option>
                <option>Ensenada</option>
                <option>Tecate</option>
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
                <option>Facultad de Ingenieria Mexicali</option>
                <option>Facultad de Idiomas Mexicali</option>
                <option>Facultad de Arquitectura</option>
                <option>Facultad de Artes</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Valor en créditos</FormLabel>
              <HStack paddingLeft={"5px"}>
                <label>Si</label>
                <Checkbox
                  size="lg"
                  colorScheme="green"
                  defaultChecked
                  borderColor="green"
                  name="valorEnCreditos"
                  isChecked={filtro.valorEnCreditos}
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
              <FormLabel>Categoria</FormLabel>
              <Select
                placeholder="Categoria"
                name="categoria"
                value={filtro.categoria}
                onChange={handleChangeFiltro}
              >
                <option>General</option>
                <option>Conferencia</option>
                <option>Investigacion</option>
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
