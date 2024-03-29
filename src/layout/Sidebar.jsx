import { Grid, GridItem } from "@chakra-ui/react";

export const Sidebar = () => {
    return (
        <Grid
            templateAreas={'"nav main"'}
            gridTemplateRows={"1fr"}
            gridTemplateColumns={"150px 1fr"}
            h="200px"
            gap="1"
            color="blackAlpha.700"
            fontWeight="bold"
        >
            <GridItem pl="2" bg="green.300" area={"nav"}>
                Nav
            </GridItem>
            <GridItem pl="2" bg="green.300" area={"main"}>
                Main
            </GridItem>
        </Grid>
    );
};
