import { z } from "zod";
import { BreedsUseCase } from "./app/usecases/BreedsUseCase";
import { BreedsAPI } from "./infrastructure/driven/repositories/BreedsAPI";
import { controllerApigatewayHttp } from "./infrastructure/driving/apigateway/controllerApigateway";

const myZodSchema = z.object({
  name: z.string(),
  age: z.number(),
});


const breedsApi = new BreedsAPI();
const breedsUsecase = new BreedsUseCase(breedsApi);

export const handler = controllerApigatewayHttp(breedsUsecase, myZodSchema);

