
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useModal } from "./modalContext";

function ModalContainer() {
  const { isOpen, onClose, modalContent } = useModal();


  if (!modalContent) return null;

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalContent.heading}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{modalContent.body}</ModalBody>
        <ModalFooter>
        
          {modalContent.buttons?.map((btn, index) => (
            <Button
              key={index}
              colorScheme={btn.colorScheme || "blue"}
              mr={3}
              onClick={() => {
                if (btn.onClick) btn.onClick();
                if (btn.closeOnClick) onClose();
              }}
            >
              {btn.label}
            </Button>
          ))}
          
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalContainer;
