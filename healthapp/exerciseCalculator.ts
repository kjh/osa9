type Description =
	'not really enough' |
	'not too bad but could be better' |
	'good to great';

interface TrainingResult {
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
	let avg: number = 0;
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
	const window: number = target * 0.1;
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
	}

	return res;
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
