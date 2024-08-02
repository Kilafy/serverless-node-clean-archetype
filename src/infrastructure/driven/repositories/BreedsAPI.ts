import { BreedApiResponse } from "../../../domain/repositories/dtos/BreedApiResponse";
import { IBreedsApi } from "../../../domain/repositories/IBreedsApi";

interface IApiOptions {
    method: string;
    headers: {
        'x-api-key': string;
    };
}

const options: IApiOptions = {
    method: 'GET',
    headers: {
        'x-api-key': process.env.API_KEY ?? '',
    },
};

export class BreedsAPI implements IBreedsApi {
    public async getCatBreeds(): Promise<BreedApiResponse[]> {
        const response = await fetch(process.env.API_URL ?? '', options);
        return <BreedApiResponse[]>JSON.parse(JSON.stringify(response.json));
    }
}
