import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import Notificacion from "../modelos/Notificacion";

export const Notificaciones = () => {
    const notifications = [
        {
            avatarUrl: "https://bit.ly/broken-link",
            userName: "Juan Pérez",
            action: "te ha enviado una solicitud de amistad.",
            time: "Hace 2 horas",
            isRead: false,
        },
        {
            avatarUrl: "https://bit.ly/broken-link",
            userName: "María López",
            action: "ha comentado en tu publicación.",
            time: "Hace 1 día",
            isRead: true,
        },
    ];

    return (
        <Box p={5}>
            <VStack spacing={4}>
                {notifications.map((notification, index) => (
                    <Notificacion
                        key={index}
                        avatarUrl={notification.avatarUrl}
                        userName={notification.userName}
                        action={notification.action}
                        time={notification.time}
                        isRead={notification.isRead}
                    />
                ))}
            </VStack>
        </Box>
    );
};
