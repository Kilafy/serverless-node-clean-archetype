export type ApiResponse = {
	statusCode: number;
	message: string;
	code: string;
	data?: any;
};

export type ApiResponseMethods = {
	ok: <T>(message: string, data?: T) => ApiResponse;
	badRequest: <T>(message: string, errors?: T[]) => ApiResponse;
	notFound: (message: string) => ApiResponse;
	processingError: (message: string) => ApiResponse;
	uncontrolledError: (message: string) => ApiResponse;
	serviceUnavailable: (message: string) => ApiResponse;
};

export enum ResponseStatus {
	OPERATION_SUCCESSFUL = 200,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	NOT_FOUND = 404,
	METHOD_NOT_ALLOWED = 405,
	PROCESSING_ERROR = 422,
	PRECONDITION_FAILED = 412,
	UNCONTROLLED_ERROR = 500,
	SERVICE_UNAVAILABLE = 503,
}

export enum ResponseCode {
	OPERATION_SUCCESSFUL = 'OPERATION_SUCCESSFUL',
	CLIENT_NOT_FOUND = 'CLIENT_NOT_FOUND',
	ACCOUNT_NOT_FOUND = 'ACCOUNT_NOT_FOUND',
	OPERATION_NOT_ALLOWED = 'OPERATION_NOT_ALLOWED',
	BAD_REQUEST = 'BAD_REQUEST',
	UNAUTHORIZED = 'UNAUTHORIZED',
	PROCESSING_ERROR = 'PROCESSING_ERROR',
	UNCONTROLLED_ERROR = 'UNCONTROLLED_ERROR',
	SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
	NOT_FOUND = 'NOT_FOUND',
}

export const getHttpResponse: ApiResponseMethods = {
	ok<T>(message: string, data?: T): ApiResponse {
		return {
			statusCode: ResponseStatus.OPERATION_SUCCESSFUL,
			code: ResponseCode.OPERATION_SUCCESSFUL,
			message,
			data: data as T,
		};
	},
	badRequest<T>(message: string, errors?: T[] | undefined): ApiResponse {
		return {
			statusCode: ResponseStatus.BAD_REQUEST,
			code: ResponseCode.BAD_REQUEST,
			message,
			data: errors,
		};
	},
	notFound(message: string): ApiResponse {
		return {
			statusCode: ResponseStatus.NOT_FOUND,
			code: ResponseCode.NOT_FOUND,
			message,
		};
	},
	processingError(message: string): ApiResponse {
		return {
			statusCode: ResponseStatus.PROCESSING_ERROR,
			code: ResponseCode.PROCESSING_ERROR,
			message,
		};
	},
	uncontrolledError(message: string): ApiResponse {
		return {
			statusCode: ResponseStatus.UNCONTROLLED_ERROR,
			code: ResponseCode.UNCONTROLLED_ERROR,
			message,
		};
	},
	serviceUnavailable(message: string): ApiResponse {
		return {
			statusCode: ResponseStatus.SERVICE_UNAVAILABLE,
			code: ResponseCode.SERVICE_UNAVAILABLE,
			message,
		};
	},
};
