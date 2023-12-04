import {type z, type ZodError} from 'zod';
import {zodValues} from './constants';

export type ValidationError = {
	code: string;
	message: string;
	property: string;
};

export type ValidationResult = {
	success: boolean;
	message: string;
	errors: ValidationError[];
};

export const zodValidator = <T>(
	schema: z.Schema,
	payload: T,
): ValidationResult => {
	try {
		schema.parse(payload);
		return {
			success: zodValues.success.status,
			errors: [],
			message: zodValues.success.message,
		};
	} catch (error) {
		const errors = (error as ZodError).issues.map(issue => ({
			code: issue.code,
			message: issue.message,
			property: issue.path[0] as string,
		}));

		return {
			success: zodValues.failed.status,
			message: zodValues.failed.message,
			errors,
		};
	}
};
