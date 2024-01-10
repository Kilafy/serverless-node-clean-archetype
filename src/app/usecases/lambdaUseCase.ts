import { type BasicLambdaRepository } from "../../infrastructure/driven/repositories/basicLambdaRepository";
import {
  HttpResponse,
  type ApiResponse,
  ResponseStatus,
} from "../../utils/apiResponse";
import { type BasicUseCase } from "./basicUseCase";

export class LambdaUseCase implements BasicUseCase {
  constructor(private readonly repository: BasicLambdaRepository) {}

  public async run(input: unknown): Promise<ApiResponse> {
    try {
      // TODO: generate use case logic
      await this.repository.run(input);
      return HttpResponse(ResponseStatus.OPERATION_SUCCESSFUL);
    } catch (error) {
      return HttpResponse(
        ResponseStatus.UNCONTROLLED_ERROR,
        "Uncontrolled error",
        error.toString(),
      );
    }
  }
}
