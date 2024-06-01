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

function WorkoutPopup({ workout, isOpen, onClose }) {
  const [playWorkout, setPlayWorkout] = useState(false);
  const finalRef = React.useRef(null);

  const handleStartWorkout = () => {
    setPlayWorkout(true);
  };

  const handleCloseModal = () => {
    onClose();
    setPlayWorkout(false);
  };

  return (
    <>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={handleCloseModal}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{workout.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!playWorkout && (
              <div>
                <p>{workout.description}</p>
                <br />
                <Box boxSize="100%">
                  <Image src={workout.imageUrl} alt={workout.title} />
                </Box>
              </div>
            )}
            {playWorkout && <WorkoutStepper workout={workout} />}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
              Close
            </Button>
            {!playWorkout && (
              <Button variant="ghost" onClick={handleStartWorkout}>
                Start
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default WorkoutPopup;
