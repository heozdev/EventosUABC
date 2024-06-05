import React from "react";
import {
    Box,
    Flex,
    Avatar,
    Text,
    VStack,
    HStack,
    Icon,
} from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";

const Notificacion = ({ usuario, mensaje, leida, timestamp }) => {
    return (
        <Box
            bg={leida ? "white" : "blue.50"}
            p={4}
            borderRadius="md"
            boxShadow="sm"
            _hover={{ boxShadow: "md" }}
        >
            <Flex align="center">
                <Avatar size="md" mr={4} />
                <VStack align="start" spacing={1} flex={1}>
                    <HStack>
                        <Text>{mensaje}</Text>
                    </HStack>
                    <Text fontSize="sm" color="gray.500">
                        {timestamp}
                    </Text>
                </VStack>
                <Icon as={FaBell} color="blue.500" />
            </Flex>
        </Box>
    );
};

export default Notificacion;
