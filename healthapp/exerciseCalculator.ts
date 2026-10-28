type Description =
	'not really enough' |
	'not too bad but could be better' |
	'good to great';

export interface TrainingResult {
	periodLength: number,
	trainingDays: number,
	success: boolean,
	rating: number,
	ratingDescription: Description,
	target: number,
	average: number
}
const calculateExercises = (dailyExercise: number[], target: number): TrainingResult => {
	let sum: number = 0;
	let avg: number;
	let td: number = 0;
	const pl: number = dailyExercise.length;

	for (const d of dailyExercise) {
		if (d > 0) td = td + 1;
		sum = sum + d;
	}

	if (pl > 0) {
		avg = sum / pl;
	} else {
		avg = 0;
	}

	let desciption: Description = 'not really enough';
	const window: number = target * 0.15;
	let rating = 1;
	if (avg >= target - window && avg <= target + window) {
		desciption = 'not too bad but could be better';
		rating = 2;
	} else if (avg > target + window) {
		desciption = 'good to great';
		rating = 3;
	}

	const res: TrainingResult = {
		periodLength: pl,
		trainingDays: td,
		success: (avg >= target),
		rating: rating,
		ratingDescription: desciption,
		target: target,
		average: avg
	};

	return res;
};

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

interface ExCalParams {
	target: number;
	dailyExercise: number[];
}

const parseArgumentsExCal = (args: string[]): ExCalParams => {
	if (args.length < 4) throw new Error('Not enough arguments');
	const dailyExercise: number[] = [];
	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		for (let i = 3; i < args.length; i++) {
			if (!isNaN(Number(args[i]))) {
				dailyExercise.push(Number(args[i]));
			} else {
				throw new Error('Provided values were not numbers!');
			}
		}
		return {
			target: Number(args[2]),
			dailyExercise: dailyExercise
		};
	} else {
		throw new Error('Provided values were not numbers!');
	}
};
if (process.argv[1] === import.meta.filename) {
	// do not run this code if module is imported
	try {
		const { target, dailyExercise } = parseArgumentsExCal(process.argv);

		console.log(calculateExercises(dailyExercise, target));

	} catch (error: unknown) {
		let errorMessage = 'Something bad happened.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		console.log(errorMessage);
	}
}

export default calculateExercises;