type BmiCategory = "Underweight" | "Normal" | "Overweight" | "Obese";

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
  console.log(calculateBmi(176, 200));
} catch (error) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.error(errorMessage);
}
