/*
Underweight (Severe thinness)	< 16.0	< 0.64
Underweight (Moderate thinness)	16.0–17.0	0.64–0.68
Underweight (Mild thinness)	17.0–18.5	0.68–0.74
Normal range	18.5–25.0	0.74–1.00
Overweight (Pre-obese)	25.0–30.0	1.00–1.20
Obese (Class I)	30.0–35.0	1.20–1.40
Obese (Class II)	35.0–40.0	1.40–1.60
Obese (Class III)	≥ 40.0	≥ 1.60
*/

type Bmi =
	'Underweight (Severe thinness)' |
	'Underweight (Moderate thinness)' |
	'Underweight (Mild thinness)' |
	'Normal range' |
	'Overweight (Pre-obese)' |
	'Obese (Class I)' |
	'Obese (Class II)' |
	'Obese (Class III)';

const calculateBmi = (cm: number, kg: number): Bmi => {
	const m: number = (cm / 100);
	const bmiIndex: number = kg / (m * m);
	switch (true) {
		case bmiIndex < 16:
			return 'Underweight (Severe thinness)';
		case bmiIndex >= 16 && bmiIndex < 17:
			return 'Underweight (Moderate thinness)';
		case bmiIndex >= 17 && bmiIndex < 18.5:
			return 'Underweight (Mild thinness)';
		case bmiIndex >= 18.5 && bmiIndex < 25:
			return 'Normal range';
		case bmiIndex >= 25 && bmiIndex < 30:
			return 'Overweight (Pre-obese)';
		case bmiIndex >= 30 && bmiIndex < 35:
			return 'Obese (Class I)';
		case bmiIndex >= 35 && bmiIndex < 40:
			return 'Obese (Class II)';
		default:
			return 'Obese (Class III)';
	}
}

//console.log(calculateBmi(180, 74));

interface BmiParams {
	cm: number;
	kg: number;
}

const parseArguments = (args: string[]): BmiParams => {
	if (args.length < 4) throw new Error('Not enough arguments');
	if (args.length > 4) throw new Error('Too many arguments');

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			cm: Number(args[2]),
			kg: Number(args[3])
		}
	} else {
		throw new Error('Provided values were not numbers!');
	}
}

try {
	const { cm, kg } = parseArguments(process.argv);

	console.log(calculateBmi(cm, kg));

} catch (error: unknown) {
	let errorMessage = 'Something bad happened.'
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}

