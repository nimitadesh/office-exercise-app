import { ChakraProvider, Box } from "@chakra-ui/react";
import Navbar from "../home/HomeComp/Navbar";
import UserStats from "./UserStats";
import React, { useState, useEffect } from "react";

const UserDashboard = () => {
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/ratings/660374f51774b92c5b6e7dfd")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user ratings");
        }
        return res.json();
      })
      .then((data) => {
        setUserWorkouts(data);
      })
      .catch((error) => {
        console.error("Error fetching user ratings:", error);
      });
  }, []);

  console.log(userWorkouts);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const fetchedWorkouts = await Promise.all(
          userWorkouts.map(async (workout) => {
            const response = await fetch(
              "http://localhost:3001/workouts/" + workout.workoutId.toString()
            );
            if (!response.ok) {
              throw new Error("Failed to fetch workout");
            }
            return response.json();
          })
        );
        setWorkouts(fetchedWorkouts);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, [userWorkouts]);

  console.log(workouts);

  return (
    <ChakraProvider>
      <Navbar />
      <Box>
        <h1>User Dashboard</h1>
      </Box>
      <UserStats userWorkouts={userWorkouts} workouts={workouts} />
    </ChakraProvider>
  );
};

export default UserDashboard;
