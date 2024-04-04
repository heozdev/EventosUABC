import {
  Heading, Flex, useDisclosure
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons'
import { BiSolidFilterAlt } from "react-icons/bi";
import FiltroEventos  from '../Filtros/FiltroEventos';
import FiltroBarraBusqueda from '../Filtros/FiltroBarraBusqueda';

function MostrarEventos() {
  const { isOpen:isOpenModalFilter, onOpen:onOpenModalFilter, onClose:onCloseModalFilter } = useDisclosure();
  const { isOpen:isOpenModalSearch, onOpen:onOpenModalSearch, onClose:onCloseModalSearch } = useDisclosure();

  return (
    <center>
      <Heading size='xl' color={'black'} mt={5}>Solicitudes</Heading>
      <Flex justifyContent='center' alignItems='center' mt={10} ml={600}>
        <BiSolidFilterAlt style={{ color: '#004928', fontSize: '45px', marginRight: '8px', cursor:'pointer' }} onClick={onOpenModalFilter}/>
        <SearchIcon style={{ color: '#004928', fontSize: '45px', cursor:'pointer' }} onClick={onOpenModalSearch}/>
        <FiltroEventos isOpenModalFilter={isOpenModalFilter} onCloseModalFilter={onCloseModalFilter}/>
        <FiltroBarraBusqueda isOpenModalSearch={isOpenModalSearch}  onCloseModalSearch={onCloseModalSearch}/>
      </Flex>
    </center>
  );
}

export default MostrarEventos;