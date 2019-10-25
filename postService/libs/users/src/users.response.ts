import { Response } from 'node-fetch';
import { HttpException } from '@nestjs/common';
import { JsonDecoder, Ok } from 'ts.data.json';

export interface ErrorResponse<T> {
	error: {
		code:      number;
		name?:     string;
		message:   string;
		errors?:   T[];
	}
}

export interface SuccessResponse<T> {
	data: T;
}

export interface UserDetailedResponse {
	id:        string;
	firstName: string;
	lastName:  string;
	username:  string;
	gender:    string;
	status:    string;
}

function createTypedDecoder<T>(structure: JsonDecoder.DecoderObject<T>, name?: string) {
	return JsonDecoder.object<T>(structure, name || 'lol'); // TODO: fix
}

const userServiceSuccessDecoder = createTypedDecoder<SuccessResponse<UserDetailedResponse>>({
	data: JsonDecoder.object<UserDetailedResponse>({
		id:        JsonDecoder.string,
		firstName: JsonDecoder.string,
		lastName:  JsonDecoder.string,
		username:  JsonDecoder.string,
		gender:    JsonDecoder.string,
		status:    JsonDecoder.string,
	}, 'UserServiceSuccessDecoder')
});

const userServiceErrorDecoder = createTypedDecoder<ErrorResponse<any>>({
	error: JsonDecoder.object({
		code:    JsonDecoder.number,
		message: JsonDecoder.string,
		name:    JsonDecoder.optional(JsonDecoder.string),
		errors:  JsonDecoder.optional(JsonDecoder.array(JsonDecoder.string, 'ErrorServiceSpecificErrorDecoder')),
	}, 'UserServiceErrorDecoder')
});


function decodeUserServiceResponse(jsonData: string) {

	try {
		const successResponse = userServiceSuccessDecoder.decode(jsonData);
		if (successResponse instanceof Ok) {
			return successResponse.value;
		}
	} catch(e) {}
	
	try {
		const errorResponse = userServiceErrorDecoder.decode(jsonData);
		if (errorResponse instanceof Ok) {
			return errorResponse.value;
		}
	} catch(e) {}

	throw new Error('Unknown json data format');
} 

export type UserSuccessResponseType = SuccessResponse<UserDetailedResponse>;
export type UserErrorResponseType   = ErrorResponse<any>
export type UserServiceResponseType = SuccessResponse<UserDetailedResponse> | UserErrorResponseType

export class UserServiceResponse {

	private readonly status:     number;
	private readonly rawBody:    string;
	private readonly result:     UserServiceResponseType;

	private constructor(body: string, statusCode: number) {
		this.status  = statusCode;
		this.rawBody = body;
		this.result  = decodeUserServiceResponse(body);
	}

	public static async createFromHttpResponse(response: Response) {
		const status = response.status;
		const body   = await response.json();
		return new UserServiceResponse(body, status);
	}

	public static isSuccess(response: any): response is UserSuccessResponseType {
		if (response instanceof UserServiceResponse) {
			return response.getStatus() <= 400;
		}
		return false;
	}

	public static isError(response: any): response is UserErrorResponseType {
		return !UserServiceResponse.isSuccess(response);
	}

	/**
	 * If request was successfull -> returns data.
	 * If request has failed -> throw http exception.
	 */
	public toHttpException() {
		const result = this.getResult();

		if (UserServiceResponse.isError(result)) {
			const errorMessage = result.error.message;
			const statusCode   = result.error.code;
			return new HttpException(errorMessage, statusCode);
		}

		if (UserServiceResponse.isSuccess(result)) {
			throw new Error('No http exception for success response');
		}
	}

	public getStatus() {
		return this.status;
	}

	public getResult() {
		return this.result;
	}

	public getRawBody() {
		return this.rawBody;
	}

}
