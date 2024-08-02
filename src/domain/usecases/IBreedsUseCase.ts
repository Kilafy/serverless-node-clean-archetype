import { ApiResponse } from "../../utils/apiResponse";

export interface IBreedsUseCase {
  getBreeds(): Promise<ApiResponse>;

}
