import React, { useState } from "react";
import styled from "styled-components";
import WorkoutPopup from "../workout/WorkoutPopup";
import { ChakraProvider, Button } from "@chakra-ui/react"; // Import Button from Chakra UI

const Card = styled.div`
  width: 600px;
  height: 410px;
  border: 1px solid #ddd;
  padding-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: "Arial", sans-serif;
  flex: 0 0 auto;
  background-color: #c7c4c4;
`;

const Image = styled.img`
  width: 550px;
  height: 260px;
  display: block;
  margin: auto;
  margin-bottom: 20px;
`;

const Title = styled.div`
  height: 50px;
  padding-top: 5px;
  font-size: 20px;
  font-weight: bold;
  bottom: 0;
  color: #57663d;
`;

const WorkoutCard = ({ workout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => setIsOpen(!isOpen);

  return (
    <>
      <Card>
        <Title>{workout.title}</Title>
        <Image src={workout.imageUrl} alt="Workout" />
        <ChakraProvider>
          <Button colorScheme="green" mr={3} onClick={() => setIsOpen(true)}>
            Start
          </Button>
        </ChakraProvider>
      </Card>
      {isOpen && (
        <ChakraProvider>
          <WorkoutPopup
            workout={workout}
            isOpen={isOpen}
            onClose={togglePopup}
          />
        </ChakraProvider>
      )}
    </>
  );
};
export default WorkoutCard;
