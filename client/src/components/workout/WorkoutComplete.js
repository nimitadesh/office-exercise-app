import React, { useState } from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import styled from "@emotion/styled";

const AbsoluteCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function WorkoutComplete({ workout }) {
  return (
    <>
      <Box position="relative" padding="8">
        <Text fontSize="2xl" align="center" padding="4">
          Congratulations!
        </Text>
        <Text fontSize="lg" align="center" padding="4">
          You have completed <b>{workout.title}</b>.
        </Text>
        <Text fontSize="lg" align="center" padding="4">
          Points earned:
        </Text>
        <Text fontSize="4xl" align="center">
          {workout.points}
        </Text>
      </Box>
    </>
  );
}

export default WorkoutComplete;
