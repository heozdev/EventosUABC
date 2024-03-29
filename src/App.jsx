import React from "react";
import { Sidebar } from "./layout/Sidebar";
import { Outlet } from "react-router-dom";
import { Main } from "./layout/Main";
import { Grid } from "@chakra-ui/react";

export const App = () => {
    return (
        <Grid
            templateAreas={'"sidebar main"'}
            gridTemplateRows={"100vh"}
            gridTemplateColumns={"15% 1fr"}
            h="200px"
            color="blackAlpha.700"
            fontWeight="bold"
        >
            <Sidebar gridArea={"sidebar"} />
            <Main gridArea={"main"} />
        </Grid>
    );
};
