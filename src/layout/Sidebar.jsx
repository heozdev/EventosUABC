import { Grid, GridItem } from "@chakra-ui/react";
import { AiFillHome, BsCalendar,  } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { LuFolderEdit } from "react-icons/lu";

export const Sidebar = () => {
    return(
        <Grid 
            templateAreas ={'"nav main"'}
                gridTemplateRows={'100vh'}
                gridTemplateColumns={'150px 1fr'}
                h='200px'
                gap='1'
                color='blackAlpha.700'
                fontWeight='bold'
            >

            <GridItem pl="2" bg="green.300" area={"nav"}>
                Nav
                <AiFillHome />
                <BsCalendar />
                <FaUserCircle/>
                <ImExit/>
                <LuFolderEdit/>
            </GridItem>
            <GridItem pl="2" bg="green.300" area={"main"}>
                Main
                
            </GridItem>
        </Grid>
    );
};
