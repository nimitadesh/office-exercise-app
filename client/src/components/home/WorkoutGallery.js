import React from "react";
import styled from "styled-components";
import WorkoutCard from "../WorkoutCard";
import { Text } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/provider";

const ScrollContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  padding: 20px;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
`;

function WorkoutGallery({ workouts }) {
  return (
    <>
      <ScrollContainer>
        {workouts.map((workout, index) => (
          <WorkoutCard
            key={index}
            workout={workout}
            onClick={() => console.log("Open workout:", workout.title)}
          />
        ))}
      </ScrollContainer>
    </>
  );
}

export default WorkoutGallery;
