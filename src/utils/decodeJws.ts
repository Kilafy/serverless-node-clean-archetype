import jwt from 'jsonwebtoken';

export const decodeJwt = (jwtString: string): jwt.JwtPayload => {
	try {
		const jwtPayload = jwt.decode(jwtString.replace('Bearer', ''));

		return jwtPayload as jwt.JwtPayload;
	} catch (error) {
		throw new Error(error as string);
	}
};
