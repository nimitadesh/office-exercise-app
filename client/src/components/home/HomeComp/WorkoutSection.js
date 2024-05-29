import WorkoutGallery from "../../workout/WorkoutGallery";
import { Box, Heading, Text } from "@chakra-ui/react";

const WorkoutSection = (workoutsFromDb) => {
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Heading fontSize="2xl" margin="5% 0">
          <Text as="span" color="white">
            Experience the benefits of incorporating simple exercises into your
            workday.
          </Text>
        </Heading>
      </Box>
      <Box position="relative" margin="30">
        <WorkoutGallery workouts={workoutsFromDb} />
      </Box>
    </>
  );
};

export default WorkoutSection;
