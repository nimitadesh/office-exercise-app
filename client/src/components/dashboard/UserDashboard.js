import { ChakraProvider, Grid, Box, Text } from "@chakra-ui/react";
import Navbar from "../home/HomeComp/Navbar";
import UserStats from "./UserStats";
import React, { useState, useEffect } from "react";
import DurationTime from "./barchart/DurationTimeGraph";
import { CategoryGraph } from "./piechart/CategoryGraph";
import { generateDurationTimeData } from "./barchart/DurationTimeData";
import { generateCategoryData } from "./piechart/CategoryData";
import FooterSection from "../home/HomeComp/FooterSection";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [durationTimeData, setDurationTimeData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3001/ratings/${user._id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch user ratings");
          }
          return res.json();
        })
        .then((data) => {
          setUserWorkouts(data);
          console.log("User workouts", data);
        })
        .catch((error) => {
          console.error("Error fetching user ratings:", error);
        });
    }
  }, [user]);

  useEffect(() => {
    if (userWorkouts.length > 0) {
      const generatedDurationTimeData = generateDurationTimeData(userWorkouts);
      setDurationTimeData(generatedDurationTimeData);
      const customColors = [
        "#648FFF",
        "#785EF0",
        "#DC267F",
        "#FE6100",
        "#FFB000",
      ];
      const generatedCategoryData = generateCategoryData(
        userWorkouts,
        customColors
      );
      setCategoryData(generatedCategoryData);
      console.log("Generated Duration Time Data:", generatedDurationTimeData);
      console.log("Generated Category Data:", generatedCategoryData);
    } else {
      console.log("No user workouts to generate data from");
    }
  }, [userWorkouts]);

  return (
    <ChakraProvider>
      <Navbar />
      {user && <UserStats currUser={user} userWorkouts={userWorkouts} />}
      <Grid
        templateColumns="2fr 1fr"
        gap={18}
        marginTop="5%"
        marginBottom="5%"
        marginLeft="5%"
        marginRight="5%"
      >
        <Box height="450px">
          <Text fontSize="xl" textAlign="center">
            Your Past Week at a Glance
          </Text>
          {durationTimeData.length > 0 ? (
            <DurationTime durationTimeData={durationTimeData} />
          ) : (
            <p>No duration time data available</p>
          )}
        </Box>
        <Box height="450px">
          <Text fontSize="xl" textAlign="center">
            Overall Workout Category Distribution
          </Text>
          {categoryData.length > 0 ? (
            <CategoryGraph categoryData={categoryData} />
          ) : (
            <p>No category data available</p>
          )}
        </Box>
      </Grid>
      <FooterSection />
    </ChakraProvider>
  );
};

export default UserDashboard;
