// workout card

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
  Tag,
  Avatar,
  TagLabel,
  VStack,
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
          <VStack align="flex-start">
            <Tag size="lg" colorScheme="red" borderRadius="full">
              <TagLabel>{workout.category}</TagLabel>
            </Tag>
            <Button
              variant="solid"
              bg="blue.400"
              color="white"
              onClick={() => setIsOpen(true)}
            >
              Start
            </Button>
          </VStack>
        </CardFooter>
      </Card>
      {isOpen && (
        <WorkoutPopup workout={workout} isOpen={isOpen} onClose={togglePopup} />
      )}
    </ChakraProvider>
  );
};

export default WorkoutCard;
