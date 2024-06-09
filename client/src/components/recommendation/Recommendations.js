import React, { useState, useEffect } from "react";
import RecommendationCard from "./RecommendationCard";
import { VStack, HStack, Text } from "@chakra-ui/react";

const Recommendations = () => {
  const [ratingsFromDb, setRatingsFromDb] = useState([]);
  const [itemProfiles, setItemProfiles] = useState([]);
  const [normalizedUserRatings, setNormalizedUserRatings] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [unratedWorkouts, setUnratedWorkouts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

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
    fetch("http://localhost:3001/ratings/660374f51774b92c5b6e7dfd")
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
  }, []);

  // Fetch the workouts for each rating and encode them
  useEffect(() => {
    if (ratingsFromDb.length > 0) {
      const fetchWorkouts = async () => {
        const profiles = await Promise.all(
          ratingsFromDb.map(async (rating) => {
            try {
              const res = await fetch(
                "http://localhost:3001/workouts/" + rating.workoutId
              );
              if (!res.ok) {
                throw new Error("Failed to fetch workout");
              }
              const workout = await res.json();

              // Update normalizedUserRatings immutably
              setNormalizedUserRatings((prevState) => [
                ...prevState,
                rating.rating - 3,
              ]);

              return encodeWorkout(workout);
            } catch (error) {
              console.error("Error fetching workout", error);
              return null;
            }
          })
        );
        setItemProfiles(profiles.filter((profile) => profile !== null));
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

  // Fetch unrated workouts
  useEffect(() => {
    fetch("http://localhost:3001/workouts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch workouts");
        }
        return res.json();
      })
      .then((data) => {
        const ratedWorkoutIds = new Set(ratingsFromDb.map((r) => r.workoutId));
        const unrated = data.filter(
          (workout) => !ratedWorkoutIds.has(workout._id)
        );
        setUnratedWorkouts(unrated);
      })
      .catch((error) => {
        console.error("Error fetching workouts:", error);
      });
  }, [ratingsFromDb]);

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
    if (userProfile.length > 0 && unratedWorkouts.length > 0) {
      const recommendations = unratedWorkouts
        .map((workout) => {
          const workoutProfile = encodeWorkout(workout);
          const similarity = cosineSimilarity(userProfile, workoutProfile);
          return { workout, similarity };
        })
        .sort((a, b) => b.similarity - a.similarity);

      setRecommendations(recommendations);
    }
  }, [userProfile, unratedWorkouts]);

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
