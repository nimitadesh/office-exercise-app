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
  title: "Desk Stretching Routine",
  description:
    "A quick stretching routine to relieve tension and improve flexibility while working at your desk.",
  imageUrl:
    "https://www.shape.com/thmb/pdeBzLJWXLc7-O4KS--DIZi2I0A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/wfh-aches-fb-2000-c7ec27c6a5ae40e59bebe4bdf7fd2534.jpg",
  points: 200,
  exercises: [
    {
      title: "Neck Stretch",
      description:
        "Gently tilt your head to the right until you feel a stretch along the left side of your neck. Hold for 15 seconds. Repeat on the other side.",
      type: "Stretching",
      imageUrl:
        "https://www.petrakchiro.com/uploads/1/1/7/9/117949446/neck-stretch_orig.png",
    },
    {
      title: "Shoulder Rolls",
      description:
        "Roll your shoulders backward in a circular motion, 10 times. Then, reverse the direction and roll forward 10 times.",
      type: "Stretching",
      imageUrl:
        "https://www.verywellfit.com/thmb/nb4ew2fCXu11s7M59yg8AbvkqVM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1218015783-5a02af224c4c49979dca08f9deaed6a1.jpg",
    },
    {
      title: "Deep Breathing",
      description:
        "Sit up straight with your feet flat on the floor. Inhale deeply through your nose, filling your lungs with air. Hold for 3 seconds, then exhale slowly through your mouth. Repeat for 1 minute.",
      type: "Breathing",
      imageUrl:
        "https://media.self.com/photos/62ec18605725f61f848ebf7c/4:3/w_2560%2Cc_limit/deep-breathing-exercises.jpg",
    },
    {
      title: "Wrist Stretch",
      description:
        "Extend your right arm out in front of you with your palm facing down. Use your left hand to gently press down on your right fingertips until you feel a stretch in your wrist and forearm. Hold for 15 seconds. Repeat with the other hand.",
      type: "Stretching",
      imageUrl:
        "https://cdn-prod.medicalnewstoday.com/content/images/articles/324/324489/wrist-rotations.jpg",
    },
    {
      title: "Eye Relaxation",
      description:
        "Close your eyes and rub your palms together vigorously to generate heat. Place your warm palms over your closed eyes and let the warmth relax your eye muscles. Hold for 30 seconds.",
      type: "Relaxation",
      imageUrl:
        "https://www.flvisioninstitute.com/wp-content/uploads/eye_sensitivity.png",
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
