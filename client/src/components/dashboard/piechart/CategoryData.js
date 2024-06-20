export const generateCategoryData = (userWorkouts) => {
  const categoryData = [];

  // Function to check if an object with a specific id exists
  const objectIdExists = (dataArray, id) => {
    return dataArray.some((obj) => obj.id === id);
  };

  // Function to increment the value of an existing object
  const incrementValue = (dataArray, id) => {
    dataArray.forEach((obj) => {
      if (obj.id === id) {
        obj.value++;
      }
    });
  };

  if (Array.isArray(userWorkouts) && userWorkouts.length > 0) {
    userWorkouts.forEach((userWorkout) => {
      if (userWorkout.category && Array.isArray(userWorkout.category)) {
        userWorkout.workoutId.category.forEach((cat) => {
          if (objectIdExists(categoryData, cat)) {
            incrementValue(categoryData, cat);
          } else {
            categoryData.push({
              id: cat,
              label: cat,
              value: 1, // Initialize value to 1 when adding a new object
            });
          }
        });
      } else {
        console.warn(
          "Category array is missing or not an array in userWorkout:",
          userWorkout
        );
      }
    });
  } else {
    console.error("userWorkouts is not defined, not an array, or empty");
  }

  return categoryData;
};
