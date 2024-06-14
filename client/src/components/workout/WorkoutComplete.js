import React, { useState, useEffect } from "react";
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
  useEffect(() => {
    const createRating = async () => {
      try {
        const response = await fetch("http://localhost:3001/ratings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: "660374f51774b92c5b6e7dfd",
            workoutId: workout._id,
            rating: 3,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to create rating");
        }
      } catch (error) {
        console.error("Error creating rating:", error);
      }
    };

    // Call the async function to create a rating
    createRating();
  }, []);

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
