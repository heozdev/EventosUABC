import { Sidebar } from "./layout/Sidebar";
import { Main } from "./layout/Main";
import { Grid } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const App = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("rol")) {
            navigate("/login");
        }
    }, []);

    return (
        <Grid
            templateAreas={'"sidebar main"'}
            gridTemplateRows={"100vh"}
            gridTemplateColumns={"15% 1fr"}
            color="blackAlpha.700"
            fontWeight="bold"
        >
            <Sidebar gridArea={"sidebar"} />
            <Main gridArea={"main"} />
        </Grid>
    );
};
