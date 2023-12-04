export type BasicLambdaRepository = {
	run(input: unknown): Promise<any>;
};
