import { BreedApiResponse } from "../repositories/dtos/BreedApiResponse";

export interface Breed {
  name: string;
  description: string;
  image: string;
}


export class BreedMapper{

    static toDomain(BreedDto: BreedApiResponse) : Breed {
        return {
            name : BreedDto.name,
            description : BreedDto.description,
            image : BreedDto.image!.url
        }
    }

}
