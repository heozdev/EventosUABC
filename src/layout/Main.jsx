import { GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export const Main = ({ gridArea }) => {
    return (
        <GridItem overflow={scroll} area={gridArea}>
            <Outlet />
        </GridItem>
    );
};
