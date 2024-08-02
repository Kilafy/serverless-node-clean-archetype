import { BreedMapper } from "../../domain/models/Breed";
import { IBreedsApi } from "../../domain/repositories/IBreedsApi";
import { IBreedsUseCase } from "../../domain/usecases/IBreedsUseCase";
import {
  HttpResponse,
  type ApiResponse,
  ResponseStatus,
} from "../../utils/apiResponse";

export class BreedsUseCase implements IBreedsUseCase {

    constructor(private breedsRepository: IBreedsApi) { }

    public async getBreeds(): Promise<ApiResponse> {
      try {
        const breeds = await this.breedsRepository.getCatBreeds();
        const breedDomain = breeds.map(BreedMapper.toDomain);
        return HttpResponse(ResponseStatus.OPERATION_SUCCESSFUL, undefined, breedDomain);
      } catch (error) {
        return HttpResponse(
          ResponseStatus.UNCONTROLLED_ERROR,
          "Uncontrolled error",
          error.toString(),
        );
      }
    }
}
