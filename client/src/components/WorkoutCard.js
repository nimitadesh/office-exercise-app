import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Text,
  Stack,
  Heading,
  Button,
  ChakraProvider,
  Tag,
  TagLabel,
  VStack,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import WorkoutPopup from "./workout/WorkoutPopup";
import PlaylistPopup from "./workout/PlaylistPopup";

const WorkoutCard = ({ workout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaylistPopupOpen, setIsPlaylistPopupOpen] = useState(false);
  const togglePlaylistPopup = () =>
    setIsPlaylistPopupOpen(!isPlaylistPopupOpen);
  const togglePopup = () => setIsOpen(!isOpen);

  return (
    <ChakraProvider>
      <Box position="relative" maxW="sm">
        <Card
          h="530px"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <CardBody>
            <Image
              src={workout.imageUrl}
              alt={workout.title}
              borderRadius="lg"
              width="100%"
              height="200px"
              objectFit="cover"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">{workout.title}</Heading>
              <Text>{workout.description}</Text>
            </Stack>
          </CardBody>
          <CardFooter>
            <VStack align="flex-start" w="100%">
              {workout.category.map((category, index) => (
                <Tag
                  key={index}
                  size="lg"
                  colorScheme="red"
                  borderRadius="full"
                >
                  <TagLabel>{category}</TagLabel>
                </Tag>
              ))}
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
        <IconButton
          icon={<AddIcon />}
          colorScheme="blue"
          position="absolute"
          bottom="4"
          right="4"
          borderRadius="full"
          onClick={() => setIsPlaylistPopupOpen(true)}
        />
      </Box>
      <>
        {isOpen && (
          <WorkoutPopup
            workout={workout}
            isOpen={isOpen}
            onClose={togglePopup}
          />
        )}
        {isPlaylistPopupOpen && (
          <PlaylistPopup
            workoutId={workout._id}
            isOpen={isPlaylistPopupOpen}
            onClose={togglePlaylistPopup}
          />
        )}
      </>
    </ChakraProvider>
  );
};

export default WorkoutCard;
