import { ChakraProvider, Box } from "@chakra-ui/react";
import Navbar from "../home/HomeComp/Navbar";

const UserDashboard = () => {
    return (
        <ChakraProvider>
            <Navbar/>
            <Box>
                <h1>User Dashboard</h1>
            </Box>
        </ChakraProvider>
    )
}

export default UserDashboard