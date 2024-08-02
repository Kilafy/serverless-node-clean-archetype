import { APIGatewayEvent } from 'aws-lambda';
import { controllerApigatewayHttp } from '../../../../src/infrastructure/driving/apigateway/controllerApigateway';
import z from 'zod';
import { HttpResponse, ResponseStatus } from '../../../../src/utils/apiResponse';
import { IBreedsUseCase } from '../../../../src/domain/usecases/IBreedsUseCase';
import { zodValidator } from '../../../../src/utils/zodValidator';
import { decodeJwt } from '../../../../src/utils/decodeJws';

const mockBodyNullEvent: APIGatewayEvent = {
  body: null,
  headers: {},
  multiValueHeaders: {},
  httpMethod: 'POST',
  isBase64Encoded: false,
  path: '',
  pathParameters: null,
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  stageVariables: null,
  requestContext: {
    accountId: '',
    apiId: '',
    authorizer: null,
    httpMethod: 'POST',
    identity: {
      accessKey: null,
      accountId: null,
      apiKey: null,
      apiKeyId: null,
      caller: null,
      clientCert: null,
      cognitoAuthenticationProvider: null,
      cognitoAuthenticationType: null,
      cognitoIdentityId: null,
      cognitoIdentityPoolId: null,
      principalOrgId: null,
      sourceIp: '',
      user: null,
      userAgent: null,
      userArn: null,
    },
    path: '',
    protocol: '',
    requestId: '',
    requestTimeEpoch: 0,
    resourceId: '',
    resourcePath: '',
    stage: '',
  },
  resource: '',
};

const mockLambdaEvent: APIGatewayEvent = {
  body: JSON.stringify({ property: 'value' }),
  headers: { Authorization: 'Bearer token' },
  multiValueHeaders: {},
  httpMethod: 'POST',
  isBase64Encoded: false,
  path: '',
  pathParameters: null,
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  stageVariables: null,
  requestContext: {
    accountId: '',
    apiId: '',
    authorizer: null,
    httpMethod: 'POST',
    identity: {
      accessKey: null,
      accountId: null,
      apiKey: null,
      apiKeyId: null,
      caller: null,
      clientCert: null,
      cognitoAuthenticationProvider: null,
      cognitoAuthenticationType: null,
      cognitoIdentityId: null,
      cognitoIdentityPoolId: null,
      principalOrgId: null,
      sourceIp: '',
      user: null,
      userAgent: null,
      userArn: null,
    },
    path: '',
    protocol: '',
    requestId: '',
    requestTimeEpoch: 0,
    resourceId: '',
    resourcePath: '',
    stage: '',
  },
  resource: '',
};

const mockZodObject = z.object({
  property: z.string().min(1),
});

const mockFailZodObject = z.object({
  data: z.string().min(1),
});

const mockJwtPayload = { sub: 'user' };

jest.mock('../../../../src/utils/zodValidator.ts', () => ({
  zodValidator: jest.fn(),
}));

jest.mock('../../../../src/utils/decodeJws', () => ({
  decodeJwt: jest.fn(),
}));

describe('controllerApigateway test suite', () => {
  const mockResponse = HttpResponse(ResponseStatus.OPERATION_SUCCESSFUL);
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should pass successfully the execution', async () => {
    const serviceUseCase = { getBreeds: jest.fn().mockResolvedValue(mockResponse) } as unknown as IBreedsUseCase;
    const handler = controllerApigatewayHttp(serviceUseCase, mockZodObject);

    (zodValidator as jest.Mock).mockReturnValue({ success: true });
    (decodeJwt as jest.Mock).mockReturnValue(mockJwtPayload);

    const result = await handler(mockLambdaEvent, mockLambdaEvent.requestContext);

    expect(result.statusCode).toBe(ResponseStatus.OPERATION_SUCCESSFUL);
    expect(result).toBe(mockResponse);
  });

  it('Should return an unauthorized response when JWT is invalid', async () => {
    const serviceUseCase = { getBreeds: jest.fn().mockResolvedValue(mockResponse) } as unknown as IBreedsUseCase;
    const handler = controllerApigatewayHttp(serviceUseCase, mockZodObject);

    (zodValidator as jest.Mock).mockReturnValue({ success: true });
    (decodeJwt as jest.Mock).mockReturnValue(null);

    const result = await handler(mockLambdaEvent, mockLambdaEvent.requestContext);

    expect(result.statusCode).toBe(ResponseStatus.UNAUTHORIZED);
    expect(result).toBe(HttpResponse(ResponseStatus.UNAUTHORIZED, 'Unauthorized', 'Invalid JWT'));
  });

  it('Should return a bad request response from the handler', async () => {
    const serviceUseCase = { getBreeds: jest.fn().mockResolvedValue(mockResponse) } as unknown as IBreedsUseCase;
    const handler = controllerApigatewayHttp(serviceUseCase, mockFailZodObject);

    (zodValidator as jest.Mock).mockReturnValue({ success: false, message: 'Validation failed', errors: ['error'] });

    const result = await handler(mockLambdaEvent, mockLambdaEvent.requestContext);

    expect(result.statusCode).toStrictEqual(ResponseStatus.BAD_REQUEST);
    expect(result).toStrictEqual({
      code: 'BAD_REQUEST',
      statusCode: 400,
      message: 'Validation failed',
      data: ['error'],
    });
  });

  it('Should return a bad request when body is null', async () => {
    const serviceUseCase = { getBreeds: jest.fn().mockResolvedValue(mockResponse) } as unknown as IBreedsUseCase;
    const handler = controllerApigatewayHttp(serviceUseCase, mockZodObject);

    (zodValidator as jest.Mock).mockReturnValue({ success: false, message: 'Invalid body', errors: ['Body is null'] });

    const result = await handler(mockBodyNullEvent, mockBodyNullEvent.requestContext);

    expect(result.statusCode).toBe(ResponseStatus.BAD_REQUEST);
    expect(result).toStrictEqual({ code: 'BAD_REQUEST', data: ['Body is null'], message: 'Invalid body', statusCode: 400 });
  });

  it('Should fail the execution of the handler', async () => {
    const serviceUseCase = {
      getBreeds: jest.fn().mockRejectedValue(new Error('Uncontrolled error')),
    } as unknown as IBreedsUseCase;
    const handler = controllerApigatewayHttp(serviceUseCase, mockZodObject);

    (zodValidator as jest.Mock).mockReturnValue({ success: true });
    (decodeJwt as jest.Mock).mockReturnValue(mockJwtPayload);

    const result = await handler(mockLambdaEvent, mockLambdaEvent.requestContext);

    expect(result.statusCode).toBe(ResponseStatus.SERVICE_UNAVAILABLE);
    expect(result).toBe(HttpResponse(ResponseStatus.SERVICE_UNAVAILABLE, 'Uncontrolled error', new Error()));
  });
});
