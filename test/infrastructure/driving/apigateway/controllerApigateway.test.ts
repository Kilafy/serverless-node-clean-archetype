import { describe } from "mocha";
import Sinon from "sinon";
import { controllerApigatewayHttp } from "../../../../src/infrastructure/driving/apigateway/controllerApigateway";
import { LambdaUseCase } from "../../../../src/app/usecases/lambdaUseCase";
import z from "zod";
import {
  mockBodyNullEvent,
  mockLambdaEvent,
} from "../../../mocks/aws/apiGatewayEventMock";
import { assert } from "chai";
import {
  HttpResponse,
  ResponseStatus,
} from "../../../../src/utils/apiResponse";
import { type BasicLambdaRepository } from "../../../../src/infrastructure/driven/repositories/basicLambdaRepository";

describe("controllerApigateway test suit", () => {
  const mockZodObject = z.object({
    property: z.string().min(1),
  });

  const mockFailZodObject = z.object({
    data: z.string().min(1),
  });

  afterEach(() => {
    Sinon.restore();
  });

  it("Should pass successfully the execution", async () => {
    const mockResponse = HttpResponse(ResponseStatus.OPERATION_SUCCESSFUL);
    const mockRepository: BasicLambdaRepository = {
      async run() {
        return Promise.resolve(mockResponse);
      },
    };

    const serviceUseCase = new LambdaUseCase(mockRepository);
    const handler = controllerApigatewayHttp(serviceUseCase, mockZodObject);

    Sinon.stub(serviceUseCase, "run").resolves(mockResponse);

    const result = await handler(
      mockLambdaEvent,
      mockLambdaEvent.requestContext,
    );

    assert.equal(result.statusCode, ResponseStatus.OPERATION_SUCCESSFUL);
    assert.equal(result.code, mockResponse.code);
  });

  it("Should return a bad request response from the handler", async () => {
    const mockResponse = HttpResponse(ResponseStatus.BAD_REQUEST);
    const mockRepository: BasicLambdaRepository = {
      async run() {
        return Promise.resolve(mockResponse);
      },
    };

    const serviceUseCase = new LambdaUseCase(mockRepository);
    const handler = controllerApigatewayHttp(serviceUseCase, mockFailZodObject);

    Sinon.stub(serviceUseCase, "run").resolves(mockResponse);

    const result = await handler(
      mockLambdaEvent,
      mockLambdaEvent.requestContext,
    );

    assert.equal(result.statusCode, ResponseStatus.BAD_REQUEST);
    assert.equal(result.code, mockResponse.code);
  });

  it("Should return a bad request when body is null", async () => {
    const mockResponse = HttpResponse(ResponseStatus.BAD_REQUEST);
    const mockRepository: BasicLambdaRepository = {
      async run() {
        return Promise.resolve(mockResponse);
      },
    };

    const serviceUseCase = new LambdaUseCase(mockRepository);
    const handler = controllerApigatewayHttp(serviceUseCase, mockZodObject);

    Sinon.stub(serviceUseCase, "run").resolves(mockResponse);

    const result = await handler(
      mockBodyNullEvent,
      mockBodyNullEvent.requestContext,
    );

    assert.equal(result.statusCode, ResponseStatus.BAD_REQUEST);
    assert.equal(result.code, mockResponse.code);
  });

  it("Should fail the execution of the handler", async () => {
    const mockResponse = HttpResponse(ResponseStatus.SERVICE_UNAVAILABLE);
    const mockRepository: BasicLambdaRepository = {
      async run() {
        return Promise.resolve(mockResponse);
      },
    };

    const serviceUseCase = new LambdaUseCase(mockRepository);
    const handler = controllerApigatewayHttp(serviceUseCase, mockZodObject);

    Sinon.stub(serviceUseCase, "run").rejects(new Error());

    const result = await handler(
      mockLambdaEvent,
      mockLambdaEvent.requestContext,
    );

    assert.equal(result.statusCode, ResponseStatus.SERVICE_UNAVAILABLE);
    assert.equal(result.code, mockResponse.code);
  });
});
