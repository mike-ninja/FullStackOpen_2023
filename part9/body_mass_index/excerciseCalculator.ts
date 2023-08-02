interface ExcerciseCalculation {
  periodLength: number;
  trainingDays: number;
  // success: boolean;
  rating: number;
  // ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (schedule: number[]): ExcerciseCalculation => {
  const target = 2;
  const average = schedule.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  ) / schedule.length;
  let rating = average / target;
  if (rating >= 1) {
    rating = 3;
  } else if (rating >= 0.5) {
    rating = 2;
  } else {
    rating = 1;
  }
  let ratingDescription;
  console.log(rating);
  if (rating === 3) {
    ratingDescription = "Good Job";
  } else if (rating === 2) {
    ratingDescription = "It's fine";
  } else {
    ratingDescription = "Terrible, you should be in jail";
  }

  const calculations = {
    periodLength: schedule.length,
    trainingDays: schedule.filter((day) => day !== 0).length,
    success: average >= target ? true : false,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
  return calculations;
};

console.log(calculateExercises([0, 0, 0, 1.5, 0, 3, 1]));
