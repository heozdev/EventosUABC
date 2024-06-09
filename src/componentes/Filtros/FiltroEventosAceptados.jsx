import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Select,
  Checkbox,
  HStack,
  Input,
  Button
} from "@chakra-ui/react";

function FiltroEventosAceptados({ isOpenModalFilter, onCloseModalFilter, eventos, setEventos }) {
  const [filtro, setFiltro] = useState({
    ciudad: "",
    facultad: "",
    valorEnCreditos: false,
    fecha: "",
    categoria: "",
  });

  const [eventosFiltrados, setEventosFiltrados] = useState([]);
  const [eventosOriginales, setEventosOriginales] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/eventos")
      .then(response => response.json())
      .then(data => {
        setEventosOriginales(data);
        setEventosFiltrados(data); // Inicialmente, mostramos todos los eventos
      })
      .catch(error => {
        console.error('Error al obtener datos de eventos:', error);
      });
  }, []);

  useEffect(() => {
    setEventosFiltrados(filtrarEventos());
  }, [filtro, eventosOriginales]);

  const CambiarFiltro = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFiltro({ ...filtro, [name]: newValue });
  };

  const filtrarEventos = () => {
    return eventosOriginales.filter((evento) => {
      return (
        (filtro.ciudad === "" || (evento.solicitud.ubicacion.ciudad && evento.solicitud.ubicacion.ciudad.toLowerCase().includes(filtro.ciudad.toLowerCase()))) &&
        (filtro.facultad === "" || (evento.solicitud.ubicacion.facultad && evento.solicitud.ubicacion.facultad.toLowerCase().includes(filtro.facultad.toLowerCase()))) &&
        (!filtro.valorEnCreditos || evento.solicitud.valorEnCreditos === filtro.valorEnCreditos) &&
        (filtro.fecha === "" || evento.solicitud.fecha === filtro.fecha) &&
        (filtro.categoria === "" || (evento.solicitud.categoria && evento.solicitud.categoria.toLowerCase().includes(filtro.categoria.toLowerCase())))
      );
    });
  };

  const Filtro = () => {
    onCloseModalFilter();
    setEventos(filtrarEventos());
  };

  const opcionesCiudad = ["Mexicali", "Tijuana", "Ensenada", "Tecate"];

  return (
    <>
      <Modal isOpen={isOpenModalFilter} onClose={onCloseModalFilter}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filtros de Eventos</ModalHeader>
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

export default FiltroEventosAceptados;
