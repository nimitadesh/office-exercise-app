import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

  const StatusModal = ({isOpen, onClose, title, message}) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>{message}</ModalBody>
        </ModalContent>
      </Modal>
    )
  }

  export default StatusModal;