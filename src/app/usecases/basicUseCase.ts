import {type ApiResponse} from '../../utils/apiResponse';

type TokenAud = string | string[] | undefined;

export type BasicUseCase = {
	run<T>(input: T, token?: TokenAud): Promise<ApiResponse>;
};
