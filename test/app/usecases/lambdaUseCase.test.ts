import { describe } from "mocha";
import Sinon from "sinon";
import { LambdaUseCase } from "../../../src/app/usecases/lambdaUseCase";
import { HttpResponse, ResponseStatus } from "../../../src/utils/apiResponse";
import { assert } from "chai";
import { type BasicLambdaRepository } from "../../../src/infrastructure/driven/repositories/basicLambdaRepository";

describe("LambdaUseCase test suit", () => {
  afterEach(() => {
    Sinon.restore();
  });

  it("Should return success response", async () => {
    const mockResponse = HttpResponse(ResponseStatus.OPERATION_SUCCESSFUL);
    const mockRepository: BasicLambdaRepository = {
      async run() {
        return Promise.resolve(mockResponse);
      },
    };

    const serviceUseCase = new LambdaUseCase(mockRepository);
    const mockInput = {
      property: "mock property",
    };

    const result = await serviceUseCase.run(mockInput);

    assert.equal(result.statusCode, mockResponse.statusCode);
    assert.equal(result.code, mockResponse.code);
  });

  it("Should return uncontrolled_error with a fail execution", async () => {
    const mockResponse = HttpResponse(ResponseStatus.UNCONTROLLED_ERROR);
    const mockRepository: BasicLambdaRepository = {
      run() {
        throw new Error();
      },
    };

    const serviceUseCase = new LambdaUseCase(mockRepository);
    const mockInput = {
      property: "mock property",
    };

    const result = await serviceUseCase.run(mockInput);

    assert.equal(result.statusCode, mockResponse.statusCode);
    assert.equal(result.code, mockResponse.code);
  });
});
