import {
    Heading
  } from '@chakra-ui/react';

import { useState, useEffect } from 'react';




export const Eventos = () => {
    <Heading size='xl' color={'black'} mt={5} justifyContent={"center"}>Eventos</Heading>;


    const setEventos = () => {
        fetch("http://localhost:3000/evento")
        .then((response) => response.json())
        .then((data) =>{
            setEventos(data);
        })
    }


    

    return (
        <>
            
        </>
    );
};
