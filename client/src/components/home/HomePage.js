import React, { useState, useEffect } from "react";
import "../../styles/app-styles.css";
import WorkoutPopup from "../workout/WorkoutPopup";
import {
  ChakraProvider,
  extendTheme,
  Box,
  IconButton,
  Heading,
  Text,
} from "@chakra-ui/react";
import HeroSection from "./HomeComp/HeroSection";
import BannerText from "./HomeComp/Banner/BannerText";
import { Link } from "react-router-dom";
import { TbMessageChatbot } from "react-icons/tb";
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

        <BannerText />
        <FooterSection />
        <Box
          position="fixed"
          bottom={4}
          right={4}
          background="linear-gradient(135deg, #37D5D6, #36096D)"
          paddingBottom="30"
        >
          <Link to="/chatbot">
            <IconButton
              isRound={true}
              aria-label="Chatbot"
              colorScheme="teal"
              size="lg"
              fontSize="30px"
              icon={<TbMessageChatbot />}
            />
          </Link>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default HomePage;
