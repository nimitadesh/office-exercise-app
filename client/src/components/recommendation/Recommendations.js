import React, { useState, useEffect } from "react";
import RecommendationCard from "./RecommendationCard";
import { VStack, HStack, Text } from "@chakra-ui/react";

const Recommendations = () => {
  const [ratingsFromDb, setRatingsFromDb] = useState([]);
  const [itemProfiles, setItemProfiles] = useState([]);
  const [normalizedUserRatings, setNormalizedUserRatings] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Function to convert workouts to item profile vectors
  function encodeWorkout(workout) {
    let itemProfile = Array(8).fill(0);

    if (workout.category.includes("Desk Stretch")) {
      itemProfile[0] = 1;
    }
    if (workout.category.includes("Mobility")) {
      itemProfile[1] = 1;
    }
    if (workout.category.includes("Meditation")) {
      itemProfile[2] = 1;
    }
    if (workout.category.includes("Bodyweight")) {
      itemProfile[3] = 1;
    }
    if (workout.category.includes("Cardio")) {
      itemProfile[4] = 1;
    }

    if (workout.intensity === "High") {
      itemProfile[5] = 1;
    }
    if (workout.intensity === "Medium") {
      itemProfile[6] = 1;
    }
    if (workout.intensity === "Low") {
      itemProfile[7] = 1;
    }

    return itemProfile;
  }

  // Fetch the ratings array for this specific user
  useEffect(() => {
    if (user) {
      fetch("http://localhost:3001/ratings/" + user._id)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch user ratings");
          }
          return res.json();
        })
        .then((data) => {
          setRatingsFromDb(data);
        })
        .catch((error) => {
          console.error("Error fetching user ratings:", error);
        });
    }
  }, [user]);

  // Fetch the workouts for each rating and encode them
  useEffect(() => {
    if (ratingsFromDb.length > 0) {
      const fetchWorkouts = async () => {
        const profiles = [];
        const normalizedRatings = [];

        for (const rating of ratingsFromDb) {
          try {
            const res = await fetch(
              "http://localhost:3001/workouts/" + rating.workoutId._id
            );
            if (!res.ok) {
              throw new Error("Failed to fetch workout");
            }
            const workout = await res.json();

            profiles.push(encodeWorkout(workout));
            normalizedRatings.push(rating.rating - 3);
          } catch (error) {
            console.error("Error fetching workout", error);
          }
        }

        setItemProfiles(profiles);
        setNormalizedUserRatings(normalizedRatings);
      };

      fetchWorkouts();
    }
  }, [ratingsFromDb]);

  // Generate the user profile by multiplying the normalized ratings by the item profiles
  useEffect(() => {
    if (
      normalizedUserRatings.length === itemProfiles.length &&
      itemProfiles.length > 0
    ) {
      const userProfileVector = itemProfiles[0].map((_, colIndex) =>
        itemProfiles.reduce(
          (sum, profile, rowIndex) =>
            sum + profile[colIndex] * normalizedUserRatings[rowIndex],
          0
        )
      );
      setUserProfile(userProfileVector);
    }
  }, [itemProfiles, normalizedUserRatings]);

  // Fetch all workouts
  useEffect(() => {
    fetch("http://localhost:3001/workouts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch workouts");
        }
        return res.json();
      })
      .then((data) => {
        setWorkouts(data);
      })
      .catch((error) => {
        console.error("Error fetching workouts:", error);
      });
  }, []);

  // Calculate cosine similarity
  function cosineSimilarity(vectorA, vectorB) {
    const dotProduct = vectorA.reduce(
      (sum, a, index) => sum + a * vectorB[index],
      0
    );
    const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }

  // Generate recommendations
  useEffect(() => {
    if (userProfile.length > 0 && workouts.length > 0) {
      const ratedWorkoutIds = new Set(
        ratingsFromDb.map((r) => r.workoutId._id)
      );
      const recommendations = workouts
        .filter((workout) => !ratedWorkoutIds.has(workout._id)) // Only include unrated workouts
        .map((workout) => {
          const workoutProfile = encodeWorkout(workout);
          const similarity = cosineSimilarity(userProfile, workoutProfile);
          return {
            workout,
            similarity,
          };
        })
        .sort((a, b) => b.similarity - a.similarity);

      setRecommendations(recommendations);
    }
  }, [userProfile, workouts, ratingsFromDb]);

  // Log recommendations to verify
  useEffect(() => {
    console.log("Recommendations:", recommendations);
  }, [recommendations]);

  return (
    <VStack>
      <Text>Here are your recommended workouts!</Text>
      <HStack>
        {recommendations.map((rec, index) => (
          <RecommendationCard recommendation={rec} />
        ))}
      </HStack>
    </VStack>
  );
};

export default Recommendations;
