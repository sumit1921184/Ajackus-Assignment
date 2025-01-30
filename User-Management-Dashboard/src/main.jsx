import { StrictMode } from 'react'
import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
  ;
import ModalProvider from './contexts/modalContext.jsx';
import ModalContainer from './contexts/modalContainer.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <ModalProvider>
      <ModalContainer/>
        <App />
      </ModalProvider>
    </ChakraProvider>
  </StrictMode>
)
