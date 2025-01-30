import { createContext, useContext, useState } from "react";
import React from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

 const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const showModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen, modalContent, onClose: closeModal, showModal }}>
      {children}
    </ModalContext.Provider>
  );
};
export default ModalProvider;