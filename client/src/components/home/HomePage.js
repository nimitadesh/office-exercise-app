import WorkoutCard from "./WorkoutCard";
import React, {useState} from "react";
import "../../styles/app-styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import WorkoutGallery from "./WorkoutGallery";

const workouts = [
  {
    title: "Morning Yoga Routine",
    description: "Start your day with these energizing yoga poses.",
    imageUrl: "https://via.placeholder.com/550x260"
  },
  {
    title: "Cardio Blast",
    description: "A high-intensity cardio workout to boost your heart rate.",
    imageUrl: "https://via.placeholder.com/550x260"
  },
  {
    title: "Strength Training",
    description: "Build strength and muscle with these resistance exercises.",
    imageUrl: "https://via.placeholder.com/550x260"
  },
  {
    title: "Strength Training",
    description: "Build strength and muscle with these resistance exercises.",
    imageUrl: "https://via.placeholder.com/550x260"
  }
];

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

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };


  return (
    <div>
      <header className="header">
        <div className="logo">UpFit</div>
        <nav className="navigation">
          <button className="loginButton">Login</button>
          <button className="signupButton">Signup</button>
        </nav>
      </header>
      <WorkoutCard workout={testWorkout} onClick={handleOpen} />

      <WorkoutGallery workouts={workouts} />

    </div>
  );
};

export default HomePage;
