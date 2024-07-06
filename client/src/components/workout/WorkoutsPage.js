import React, { useState, useEffect } from "react";
import "../../styles/app-styles.css";
import WorkoutPopup from "../workout/WorkoutPopup";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  ChakraProvider,
  extendTheme,
  Box,
  Heading,
  Text,
  Center,
  Input,
  InputRightElement,
  InputGroup,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  HStack,
  VStack,
} from "@chakra-ui/react";
import WorkoutGallery from "../workout/WorkoutGallery";
import Navbar from "../home/HomeComp/Navbar";
import FooterSection from "../home/HomeComp/FooterSection";
import Recommendations from "../recommendation/Recommendations";
import UserStats from "../dashboard/UserStats";
import { VisibilitySensor, Fade } from "react-visibility-sensor";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import NotificationSchedulerPopup from "./NotificationSchedulerPopup";

const theme = extendTheme({
  fonts: {
    heading: "Inria Sans, sans-serif",
    body: "Inria Sans, sans-serif",
  },
});

const WorkoutsPage = () => {
  const [workoutsFromDb, setWorkoutsFromDb] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [minDuration, setMinDuration] = useState(0);
  const [maxDuration, setMaxDuration] = useState(0);
  const [maxDurationDb, setMaxDurationDb] = useState(0);
  const [selectedWorkoutCategory, setSelectedWorkoutCategory] = useState("");

  const [isNotificationSchedulerOpen, setIsNotificationSchedulerOpen] =
    useState(false);
  const toggleNotifPopup = () =>
    setIsNotificationSchedulerOpen(!isNotificationSchedulerOpen);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchTerm);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleMinDurationChange = (value) => {
    setMinDuration(value);
  };

  const handleMaxDurationChange = (value) => {
    setMaxDuration(value);
  };

  const handleSelectedWorkoutCategoryChange = (event) => {
    setSelectedWorkoutCategory(event.target.value);
    console.log(selectedWorkoutCategory);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setMinDuration(0);
    setMaxDuration(maxDurationDb);
    setSelectedWorkoutCategory("");
    setFilteredWorkouts(workoutsFromDb);
  };

  const handleSearch = (searchTerm) => {
    console.log("searchTerm: " + searchTerm);
    const newWorkouts = workoutsFromDb.filter((workout) => {
      return (
        workout.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        workout.duration >= minDuration &&
        workout.duration <= maxDuration &&
        workout.category.some((category) => {
          return category
            .toLowerCase()
            .includes(selectedWorkoutCategory.toLowerCase());
        })
      );
    });
    setFilteredWorkouts(newWorkouts);
  };

  useEffect(() => {
    if (user && user._id) {
      fetch("http://localhost:3001/ratings/" + user._id)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch user ratings");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching user ratings:", error);
        });
    }
  }, [user]);

  useEffect(() => {
    fetch("http://localhost:3001/workouts/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setWorkoutsFromDb(data);
        setFilteredWorkouts(data);
        const maxDur = Math.max(...data.map((workout) => workout.duration));
        setMaxDuration(maxDur);
        setMaxDurationDb(maxDur);
      });
  }, []);

  console.log(workoutsFromDb);

  return (
    <div>
      <ChakraProvider backgroundColor={"#57663D"}>
        <Navbar />
        {user ? (
          <Box textAlign="center">
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <br />{" "}
              <Text color={"blue.400"} as={"span"}>
                Hello, {user.firstName}.
              </Text>{" "}
            </Heading>
            <Button
              variant="solid"
              bg="blue.400"
              color="white"
              mt={4}
              onClick={() => setIsNotificationSchedulerOpen(true)}
            >
              Schedule Notifications
            </Button>
          </Box>
        ) : (
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Loading...
          </Heading>
        )}
        <HStack marginTop="5%" spacing="30px" justifyContent="center">
          {/* <Recommendations/> */}

          <Box width="25%">
            <InputGroup>
              <Input
                pr="4.5rem"
                type="text"
                placeholder="Search for a workout..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <InputRightElement width="4rem"></InputRightElement>
            </InputGroup>
          </Box>
          <Select
            variant="outline"
            placeholder="Workout Category"
            width="15%"
            value={selectedWorkoutCategory}
            onChange={handleSelectedWorkoutCategoryChange}
          >
            <option value="Desk Stretch">Desk Stretch</option>
            <option value="Mobility">Mobility</option>
            <option value="Meditation">Meditation</option>
            <option value="Bodyweight">Bodyweight</option>
            <option value="Cardio">Cardio</option>
          </Select>
          <>
            <NumberInput
              width="5%"
              value={minDuration}
              onChange={handleMinDurationChange}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <p> min to</p>
            <NumberInput
              width="5%"
              value={maxDuration}
              onChange={handleMaxDurationChange}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </>
          <p> min</p>
          <Button
            variant="solid"
            bg="blue.400"
            color="white"
            onClick={() => handleSearch(searchTerm)}
          >
            Apply Filters
          </Button>
          <Button
            variant="solid"
            bg="blue.400"
            color="white"
            onClick={() => clearFilters()}
          >
            Clear
          </Button>
        </HStack>
        <Box display="flex" justifyContent="center">
          <WorkoutGallery workouts={filteredWorkouts} />
        </Box>

        <FooterSection />
        {isNotificationSchedulerOpen && (
          <NotificationSchedulerPopup
            isOpen={isNotificationSchedulerOpen}
            onClose={toggleNotifPopup}
          />
        )}
      </ChakraProvider>
    </div>
  );
};

export default WorkoutsPage;
