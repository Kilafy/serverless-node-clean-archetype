import { type APIGatewayEvent } from "aws-lambda";
import { zodValidator } from "../../../utils/zodValidator";
import type z from "zod";
import {
  type ApiResponse,
  HttpResponse,
  ResponseStatus,
} from "../../../utils/apiResponse";
import { decodeJwt } from "../../../utils/decodeJws";
import { IBreedsUseCase } from "../../../domain/usecases/IBreedsUseCase";

type ControllerApigatewayHttp = (
  serviceUseCase: IBreedsUseCase,
  zodSchema: z.Schema,
) => (event: APIGatewayEvent, context: unknown) => Promise<ApiResponse>;

export const controllerApigatewayHttp: ControllerApigatewayHttp =
  (serviceUseCase: IBreedsUseCase, zodSchema: z.Schema) =>
  async (event: APIGatewayEvent, context: unknown) => {
    try {
      console.log(context);
      const body = JSON.parse(event.body ?? "{}") as Record<string, unknown>;

      const validateResult = zodValidator(zodSchema, body);

      if (!validateResult.success) {
        return HttpResponse(
          ResponseStatus.BAD_REQUEST,
          validateResult.message,
          validateResult.errors,
        );
      }

      const jwtPayload = decodeJwt(String(event.headers.Authorization));
      if (!jwtPayload) {
        return HttpResponse(
          ResponseStatus.UNAUTHORIZED,
          "Unauthorized",
          "Invalid JWT",
        );
      }

      const result = await serviceUseCase.getBreeds();

      return result;
    } catch (error) {
      console.error(error);
      return HttpResponse(
        ResponseStatus.SERVICE_UNAVAILABLE,
        "Uncontrolled error",
        error as string,
      );
    }
  };
