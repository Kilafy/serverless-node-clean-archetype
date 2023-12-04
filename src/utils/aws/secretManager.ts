/* eslint-disable @typescript-eslint/naming-convention */
import aws from 'aws-sdk';
import {ParameterStore} from '../config/parameterStore';

export class SecretManager {
	private readonly client = new aws.SecretsManager();

	public async getSecretManaget(name: string): Promise<string> {
		const arn = `arn:aws:secretsmanager:${ParameterStore.awsRegion}:${ParameterStore.account}:secret:${name}`;

		const secretResponse = await this.client
			.getSecretValue({
				SecretId: arn,
			})
			.promise();

		if (!secretResponse.SecretString) {
			throw new Error('Parameter not found');
		}

		return secretResponse.SecretString;
	}
}
