import React from "react";
import {
    Box,
    Flex,
    Avatar,
    Text,
    VStack,
    HStack,
    Badge,
    Icon,
} from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";

const Notificacion = ({ avatarUrl, userName, action, time, isRead }) => {
    return (
        <Box
            bg={isRead ? "white" : "blue.50"}
            p={4}
            borderRadius="md"
            boxShadow="sm"
            _hover={{ boxShadow: "md" }}
        >
            <Flex align="center">
                <Avatar size="md" name={userName} src={avatarUrl} mr={4} />
                <VStack align="start" spacing={1} flex={1}>
                    <HStack>
                        <Text fontWeight="bold">{userName}</Text>
                        <Text>{action}</Text>
                    </HStack>
                    <Text fontSize="sm" color="gray.500">
                        {time}
                    </Text>
                </VStack>
                <Icon as={FaBell} color="blue.500" />
            </Flex>
        </Box>
    );
};

export default Notificacion;
