import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react"; // Importing Button and useDisclosure hook
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Progress,
  Container,
} from "@chakra-ui/react";
import WorkoutStepper from "./WorkoutStepper";
import NotificationScheduler from "./NotificationScheduler";

function NotificationSchedulerPopup({ isOpen, onClose }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Schedule Notifications</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NotificationScheduler />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NotificationSchedulerPopup;
