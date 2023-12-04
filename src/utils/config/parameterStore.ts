/* eslint-disable @typescript-eslint/no-extraneous-class */
export class ParameterStore {
	static readonly awsRegion = String(process.env.REGION_ORIGIN);
	static readonly account = String(process.env.ACCOUNT);
	static readonly logQueueUrl = `https://sqs.${this.awsRegion}.amazonaws.com/${
		this.account
	}/${String(process.env.LOG_QUEUE_NAME)}`;
}
