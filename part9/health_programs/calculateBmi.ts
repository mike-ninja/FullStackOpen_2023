import { isNotNumber } from "./utils/inNotNumber";

type BmiCategory = "Underweight" | "Normal" | "Overweight" | "Obese";

const parseArguments = (args: string[], argsLen: number): Boolean => {
  if (argsLen !== args.length - 2) {
    throw new Error(`Provided argruments does not match the required amount: ${argsLen}`);
  }
  for (let i = 2; i < argsLen; i++) {
    if (!isNotNumber(args[i])) {
      throw new Error("Provided values were not number!");
    }
  }
  return true;
};

const calculateBmi = (height: number, weight: number): BmiCategory => {
  if (weight === 0 || height === 0) throw Error("Values should not be 0!");
  const heightMetres = height / 100;
  const bmi = weight / (heightMetres * heightMetres);
  if (bmi <= 18.4) {
    return "Underweight";
  } else if (bmi > 18.4 && bmi <= 24.9) {
    return "Normal";
  } else if (bmi > 24.9 && bmi <= 29.9) {
    return "Overweight";
  } else if (bmi > 29.9) {
    return "Obese";
  }
};

try {
  const argsLen = 2;
  parseArguments(process.argv, argsLen);
  console.log(calculateBmi(Number(process.argv[3]), Number(process.argv[3])));
} catch (error) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.error(errorMessage);
}
