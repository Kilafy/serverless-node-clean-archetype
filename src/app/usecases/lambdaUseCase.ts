import {type BasicLambdaRepository} from '../../infrastructure/driven/repositories/basicLambdaRepository';
import {getHttpResponse, type ApiResponse} from '../../utils/apiResponse';
import {type BasicUseCase} from './basicUseCase';

export class LambdaUseCase implements BasicUseCase {
	constructor(private readonly repository: BasicLambdaRepository) {}

	public async run(input: unknown): Promise<ApiResponse> {
		try {
			// TODO: generate use case logic
			await this.repository.run(input);
			return getHttpResponse.ok('Operacion exitosa');
		} catch (error) {
			return getHttpResponse.uncontrolledError(error as string);
		}
	}
}
