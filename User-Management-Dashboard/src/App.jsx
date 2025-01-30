import React from 'react';
import './App.css'
import { Box } from '@chakra-ui/react';

import UserList from './Components/UserList';

function App() {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems={"center"}>
        <UserList />
      </Box>

    </>
  )
}

export default App;
