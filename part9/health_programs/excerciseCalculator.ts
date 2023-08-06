import { isNotNumber } from "./utils/inNotNumber";

interface ExcerciseCalculation {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]): number[] => {
  let schedule: number[] = [];

  if (args.length <= 2) {
    throw new Error("Provide workout hours");
  }
  for (let i = 2; i < args.length; i++) {
    if (!isNotNumber(args[i])) {
      throw new Error("Provided values were not number!");
    } else {
      schedule = schedule.concat(Number(args[i]))
    }
  }
  return schedule;
};

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

try {
  const schedule = parseArguments(process.argv);
  console.log(
    calculateExercises(schedule),
  );
} catch (error) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.error(errorMessage);
}
