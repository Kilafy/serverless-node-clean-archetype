import { BreedApiResponse } from './dtos/BreedApiResponse';

export interface IBreedsApi {
  getCatBreeds(): Promise<BreedApiResponse[]>;
}
