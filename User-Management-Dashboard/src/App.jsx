import { useEffect, useState } from 'react'
import React from 'react';
import './App.css'
import { Box } from '@chakra-ui/react';
import { fetchUsers } from './api/userService';
import { use } from 'react';

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    fetchUsers().then(data => {
      console.log(data)
    })
  }, [])

  return (
    <>
      <Box className=' text-red-500 text-4xl text-center'>
        hello world
      </Box>
      
    </>
  )
}

export default App;
