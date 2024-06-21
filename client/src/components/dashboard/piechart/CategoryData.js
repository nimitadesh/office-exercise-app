export const generateCategoryData = (userWorkouts) => {
  const categoryData = [];

  const objectIdExists = (dataArray, id) => {
    return dataArray.some((obj) => obj.id === id);
  };

  const incrementValue = (categoryData, id, currWorkoutCategories) => {
    categoryData.forEach((obj) => {
      if (obj.id === id) {
        obj.value = obj.value + 1 / currWorkoutCategories.length;
      }
    });
  };

  if (Array.isArray(userWorkouts) && userWorkouts.length > 0) {
    userWorkouts.forEach((userWorkout) => {
      let currWorkoutCategories = userWorkout.workoutId.category;
      currWorkoutCategories.forEach((cat) => {
        if (objectIdExists(categoryData, cat)) {
          incrementValue(categoryData, cat, currWorkoutCategories);
        } else {
          categoryData.push({
            id: cat,
            label: cat,
            value: 1 / currWorkoutCategories.length,
          });
        }
      });
    });

    // Convert values to percentages and round to two decimal places
    const totalValue = categoryData.reduce((sum, obj) => sum + obj.value, 0);
    categoryData.forEach((obj) => {
      obj.value = parseFloat(((obj.value / totalValue) * 100).toFixed(2));
    });
  } else {
    console.error("userWorkouts is not defined, not an array, or empty");
  }

  return categoryData;
};
