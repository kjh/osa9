import express from 'express';
import type { Request, Response } from 'express';
import calculateBmi from './bmiCalculator.ts';
import calculateExercises, { type TrainingResult } from './exerciseCalculator.ts';
const app = express();
app.use(express.json());


app.post('/exercises', (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  try {
    if (!daily_exercises || !target) throw new Error('parameters missing');
    if (Array.isArray(daily_exercises)) {
      if (isNaN(Number(target))) {
        throw new Error('malformatted parameters');
      }
      if (daily_exercises.length < 1) throw new Error('malformatted parameters');
      for (let i = 0; i < daily_exercises.length; i++) {
        if (isNaN(Number(daily_exercises[i]))) {
          throw new Error('malformatted parameters');
        }
      }
      const dailyExercise: number[] = daily_exercises.map(Number);

      console.log(dailyExercise);

      const result: TrainingResult = calculateExercises(dailyExercise, Number(target));

      return res.send(result);
    } else {
      throw new Error('malformatted parameters');
    }
  } catch (error: unknown) {
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
    return res.status(400).json({
      error: errorMessage
    });
  }
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = req.query;

    if (!weight || !height) {
      throw new Error('Missing values!');
    }

    if (!isNaN(Number(weight)) && !isNaN(Number(height))) {
      res.json({
        weight: Number(weight),
        height: Number(height),
        bmi: calculateBmi(Number(height), Number(weight))
      });
    } else {
      throw new Error('Provided values were not numbers!');
    }
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    res.status(400).json({
      error: 'malformatted parameters'
    });
  }
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});