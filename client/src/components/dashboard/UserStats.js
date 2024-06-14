import React, { useState } from "react";
import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";

function StatsCard({ title, stat, icon }) {
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function UserStats({ userWorkouts, workouts }) {
  const [user, setUser] = useState(null);
  const calculatePointsEarned = () => {
    let points = 0;
    for (let i = 0; i < workouts.length; i++) {
      points += workouts[i].points;
    }
    return points;
  };

  const calculateMinutesExercised = () => {
    let duration = 0;
    for (let i = 0; i < workouts.length; i++) {
      duration += workouts[i].duration;
    }
    return duration;
  };

  return (
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={"center"}
        fontSize={"4xl"}
        py={10}
        fontWeight={"bold"}
      >
        Our company is expanding, you could be too.
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={"No. of Workouts Completed"}
          stat={userWorkouts.length}
          icon={<BsPerson size={"3em"} />}
        />
        <StatsCard
          title={"No. of Points Earned"}
          stat={calculatePointsEarned()}
          icon={<FiServer size={"3em"} />}
        />
        <StatsCard
          title={"No. of Minutes Exercised"}
          stat={calculateMinutesExercised()}
          icon={<GoLocation size={"3em"} />}
        />
      </SimpleGrid>
    </Box>
  );
}
