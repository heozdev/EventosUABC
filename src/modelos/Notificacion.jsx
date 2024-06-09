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

const Notificacion = ({
    notificacion,
    timestamp,
    setNotificacionSeleccionada,
}) => {
    return (
        <Box
            margin={"0 auto"}
            w={"75%"}
            onClick={() => setNotificacionSeleccionada(notificacion)}
            cursor={"pointer"}
            bg={notificacion.leida ? "white" : "blue.50"}
            p={4}
            borderRadius="md"
            boxShadow="sm"
            _hover={{ boxShadow: "md" }}
            transition=".2s ease-in"
            mt={"20px"}
        >
            <Flex align="center" p={"10px"}>
                <Avatar size="md" mr={4} />
                <VStack align="start" spacing={1} flex={1}>
                    <HStack>
                        <Text>
                            {notificacion.tipoDeNotificacion.tipoDeNotificacion}
                        </Text>
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
