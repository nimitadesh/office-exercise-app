import { ChakraProvider, Box } from "@chakra-ui/react";
import Navbar from "../home/HomeComp/Navbar";
import UserStats from "./UserStats";
import React, { useState, useEffect } from "react";
import DurationTime from "./barchart/DurationTimeGraph";
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
      const generatedCategoryData = generateCategoryData(userWorkouts);
      setCategoryData(generatedCategoryData);
      console.log("Generated Category Data");
      console.log(categoryData);
    }
  }, [userWorkouts]);

  return (
    <ChakraProvider>
      <Navbar />
      {user && <UserStats currUser={user} userWorkouts={userWorkouts} />}
      <DurationTime durationTimeData={durationTimeData} />
      <FooterSection />
    </ChakraProvider>
  );
};

export default UserDashboard;
