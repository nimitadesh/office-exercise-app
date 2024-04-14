import React from "react";
import "../../styles/app-styles.css";
import WorkoutPopup from "../workout/WorkoutPopup";
import { ChakraProvider } from "@chakra-ui/react";

const testWorkout = {
  title: "Full Body Workout",
  description: "A complete workout targeting all major muscle groups.",
  imageUrl:
    "https://prod-ne-cdn-media.puregym.com/media/810213/bodyweight.jpg?quality=80&mode=pad&width=992",
  points: 200,
  exercises: [
    {
      title: "Push-ups",
      description: "A basic upper body exercise",
      type: "strength",
      imageUrl:
        "https://prod-ne-cdn-media.puregym.com/media/810213/bodyweight.jpg?quality=80&mode=pad&width=992",
    },
    {
      title: "Squats",
      description: "A lower body exercise",
      type: "strength",
      imageUrl:
        "https://prod-ne-cdn-media.puregym.com/media/810213/bodyweight.jpg?quality=80&mode=pad&width=992",
    },
    {
      title: "Plank",
      description: "Core stabilization exercise",
      type: "core",
      imageUrl:
        "https://prod-ne-cdn-media.puregym.com/media/810213/bodyweight.jpg?quality=80&mode=pad&width=992",
    },
    {
      title: "Jumping Jacks",
      description: "Cardiovascular exercise",
      type: "cardio",
      imageUrl:
        "https://prod-ne-cdn-media.puregym.com/media/810213/bodyweight.jpg?quality=80&mode=pad&width=992",
    },
  ],
};

const HomePage = () => {
  return (
    <div>
      <header className="header">
        <div className="logo">UpFit</div>
        <nav className="navigation">
          <button className="loginButton">Login</button>
          <button className="signupButton">Signup</button>
        </nav>
      </header>
      <ChakraProvider>
        <WorkoutPopup workout={testWorkout} />
      </ChakraProvider>
    </div>
  );
};

export default HomePage;
