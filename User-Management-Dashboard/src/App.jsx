import { useEffect, useState } from 'react'
import React from 'react';
import './App.css'
import { Box } from '@chakra-ui/react';
import { fetchUsers } from './api/userService';
import { use } from 'react';
import UserList from './Components/UserList';

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    fetchUsers().then(data => {
      console.log(data)
    })
  }, [])

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
