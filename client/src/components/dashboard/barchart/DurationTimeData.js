export const generateDurationTimeData = (userWorkouts) => {
  // Function to format date in 'YYYY-MM-DD' format
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const today = new Date();
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    last7Days.push({
      Date: formatDate(date),
      "Desk Stretch": 0,
      Mobility: 0,
      Meditation: 0,
      Bodyweight: 0,
      Cardio: 0,
      "Desk StretchColor": "hsl(60, 70%, 50%)",
      MobilityColor: "hsl(138, 70%, 50%)",
      MeditationColor: "hsl(7, 70%, 50%)",
      BodyweightColor: "hsl(293, 70%, 50%)",
      CardioColor: "hsl(287, 70%, 50%)",
    });
  }

  // Check if userWorkouts is defined and is an array
  if (Array.isArray(userWorkouts)) {
    userWorkouts.forEach((userWorkout) => {
      const workoutDate = formatDate(new Date(userWorkout.createdAt));
      const workoutId = userWorkout.workoutId._id; // Assuming workoutId is the ID of the workout

      // Calculate total categories for this workout
      const totalCategories = userWorkout.workoutId.category.length;

      // Increment each category for the workout day
      last7Days.forEach((entry) => {
        if (formatDate(new Date(userWorkout.createdAt)) === entry["Date"]) {
          console.log("Date: " + entry["Date"]);
          userWorkout.workoutId.category.forEach((category) => {
            entry[category] += 1 / totalCategories; // Increment by fraction
          });
        }
      });
    });
  } else {
    console.error("userWorkouts is not defined or not an array");
  }

  console.log("FINAL LAST7DAYS");
  console.log(last7Days);

  return last7Days;
};
