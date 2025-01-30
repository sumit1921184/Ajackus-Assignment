import React from 'react'
import Navbar from '../Components/Navbar'
import { Box } from '@chakra-ui/react'
import UserList from '../Components/UserList'

function Dashboard() {
    return (
        <>

            <Box
                display="flex"
                h="100vh"
                flexDirection="column"
                justifyContent="center"
                alignItems={"center"}>
                <Navbar />
                <UserList />
            </Box>
        </>
    )
}

export default Dashboard
