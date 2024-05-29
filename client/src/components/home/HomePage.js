import React, { useState, useEffect } from "react";
import { ChakraProvider, Box, Heading, Text } from "@chakra-ui/react";
import HeroSection from "./HomeComp/HeroSection";
import BannerText from "./HomeComp/Banner/BannerText";
import WorkoutGallery from "../workout/WorkoutGallery";
import FooterSection from "./HomeComp/FooterSection";

const HomePage = () => {
  const [workoutsFromDb, setWorkoutsFromDb] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/workouts")
      .then((res) => res.json())
      .then((data) => {
        setWorkoutsFromDb(data);
      })
      .catch((error) => {
        console.error("Error fetching workouts:", error);
      });
  }, []);

  return (
    <ChakraProvider backgroundColor="#57663D">
      <Box>
        <HeroSection />
        <Box
          background="linear-gradient(135deg, #37D5D6, #36096D)"
          paddingBottom="30"
        >
          <Box textAlign="center" paddingTop="5%">
            <Heading fontSize="4xl" color="#949494">
              <Text as="span" color="white">
                Check out some of our free workouts!
              </Text>
            </Heading>
          </Box>
          {workoutsFromDb.length > 0 && (
            <Box display="flex" justifyContent="center">
              <WorkoutGallery workouts={workoutsFromDb.slice(0, 3)} />
            </Box>
          )}
        </Box>

        <BannerText />
        <FooterSection />
      </Box>
    </ChakraProvider>
  );
};

export default HomePage;
