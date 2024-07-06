import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Text,
  Stack,
  Heading,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import WorkoutPopup from "../workout/WorkoutPopup";

const PlaylistCard = ({ workout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => setIsOpen(!isOpen);
  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        width="100%"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={workout.imageUrl}
          alt={workout.title}
        />

        <Stack>
          <CardBody>
            <Heading size="md">{workout.title}</Heading>

            <Text py="2">{workout.description}</Text>
          </CardBody>

          <CardFooter>
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => setIsOpen(true)}
            >
              Start
            </Button>
          </CardFooter>
        </Stack>
      </Card>
      {isOpen && (
        <WorkoutPopup workout={workout} isOpen={isOpen} onClose={togglePopup} />
      )}
    </>
  );
};

export default PlaylistCard;
