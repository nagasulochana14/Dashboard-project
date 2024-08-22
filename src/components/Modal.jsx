
import React from 'react';
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody
} from '@chakra-ui/react';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        pos="fixed"
        right="0"
        top="0"
        height="100vh"
        width="500px"
        maxWidth="100%"
        borderRadius="none"
      >
        <ModalHeader bg="purple.800" color="white">Add New Widget</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody p={4}>
          {children}
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
