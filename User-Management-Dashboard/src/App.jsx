import { useState } from 'react'
import React from 'react';
import './App.css'
import { Box } from '@chakra-ui/react';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Box className=' text-red-500 text-4xl text-center'>
        hello world
      </Box>
      
    </>
  )
}

export default App;
