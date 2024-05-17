import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Text,
  Stack,
  Heading,
  Divider,
  Button,
  ButtonGroup,
  ChakraProvider,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import WorkoutPopup from "./workout/WorkoutPopup";

const WorkoutCard = ({ workout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => setIsOpen(!isOpen);
  return (
    <ChakraProvider>
      <Card maxW="sm">
        <CardBody>
          <Image src={workout.imageUrl} alt={workout.title} borderRadius="lg" />
          <Stack mt="6" spacing="3">
            <Heading size="md">{workout.title}</Heading>
            <Text>{workout.description}</Text>
          </Stack>
        </CardBody>
        <CardFooter>
          <Flex justifyContent="center">
            <Button
              variant="solid"
              bg="blue.400"
              color="white"
              onClick={() => setIsOpen(true)}
            >
              Start
            </Button>
          </Flex>
        </CardFooter>
      </Card>
      {isOpen && (
        <WorkoutPopup workout={workout} isOpen={isOpen} onClose={togglePopup} />
      )}
    </ChakraProvider>
  );
};

export default WorkoutCard;
