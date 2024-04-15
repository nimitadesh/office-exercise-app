import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Progress,
  Divider,
  Container,
  Text,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import WorkoutComplete from "./WorkoutComplete";
import styled from "@emotion/styled";
import Timer from "./Timer";

const AbsoluteCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function WorkoutStepper({ workout }) {
  const [currWorkoutIndex, setCurrWorkoutIndex] = useState(0);
  const [reachedEndOfWorkout, setReachedEndOfWorkout] = useState(false);

  if (!workout || !workout.exercises || workout.exercises.length === 0) {
    return null;
  }

  const updateProgress = () => {
    setCurrWorkoutIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex === workout.exercises.length) {
        setReachedEndOfWorkout(true);
      }
      return newIndex;
    });
  };

  const progressBarPercentage =
    (currWorkoutIndex / workout.exercises.length) * 100;

  return (
    <>
      <Progress
        hasStripe
        value={progressBarPercentage}
        colorScheme="green"
        marginLeft="5"
        marginRight="5"
      />
      {!reachedEndOfWorkout && (
        <>
          <Box position="relative" padding="3">
            <Text fontSize="2xl" align="center" padding="3">
              {workout.exercises[currWorkoutIndex].title}
            </Text>
            <Box position="relative" padding="3">
              {workout.exercises[currWorkoutIndex].description}
            </Box>
          </Box>
          <Box position="relative" padding="3">
            <Container centerContent={true}>
              <Box boxSize="100%">
                <img
                  src={workout.exercises[currWorkoutIndex].imageUrl}
                  alt={workout.exercises[currWorkoutIndex]}
                />
              </Box>
              <Box padding="5">
                <Timer onTimerReset={updateProgress} />
              </Box>
            </Container>
          </Box>
        </>
      )}
      {reachedEndOfWorkout && <WorkoutComplete workout={workout} />}
    </>
  );
}

export default WorkoutStepper;
