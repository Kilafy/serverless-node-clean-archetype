import { type APIGatewayEvent } from "aws-lambda";
import { zodValidator } from "../../../utils/zodValidator";
import type z from "zod";
import { type ApiResponse, getHttpResponse } from "../../../utils/apiResponse";
import { decodeJwt } from "../../../utils/decodeJws";
import { type BasicUseCase } from "../../../app/usecases/basicUseCase";

type ControllerApigatewayHttp = (
  serviceUseCase: BasicUseCase,
  zodSchema: z.Schema,
) => (event: APIGatewayEvent, context: unknown) => Promise<ApiResponse>;

export const controllerApigatewayHttp: ControllerApigatewayHttp =
  (serviceUseCase: BasicUseCase, zodSchema: z.Schema) =>
  async (event: APIGatewayEvent, context: unknown) => {
    try {
      console.log(context);
      const body = JSON.parse(event.body ?? "{}") as Record<string, unknown>;

      const validateResult = zodValidator(zodSchema, body);

      if (!validateResult.success) {
        return getHttpResponse.badRequest(
          validateResult.message,
          validateResult.errors,
        );
      }

      const jwtPayload = decodeJwt(String(event.headers.Authorization));
      const result = await serviceUseCase.run(body, jwtPayload?.aud);

      return result;
    } catch (error) {
      return getHttpResponse.serviceUnavailable(error as string);
    }
  };
