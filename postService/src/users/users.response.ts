import { JsonDecoder, Ok } from 'ts.data.json';

export interface ErrorResponse<T> {
	error: {
		code:     number;
		name?:    string;
		message:  string;
		errors:   T[];
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
		errors:  JsonDecoder.array(JsonDecoder.string, 'ErrorServiceSpecificErrorDecoder'),
	}, 'UserServiceErrorDecoder')
});


function decodeUserServiceResponse(jsonData: string) {
	const successResponse = userServiceSuccessDecoder.decode(jsonData);
	const errorResponse   = userServiceErrorDecoder.decode(jsonData);

	if (successResponse instanceof Ok) {
		return successResponse.value;
	}

	if (errorResponse instanceof Ok) {
		return errorResponse.value;
	}

	throw new Error('Invalid json data');
} 

export type UserSuccessResponseType = SuccessResponse<UserDetailedResponse>;
export type UserErrorResponseType   = ErrorResponse<any>
export type UserServiceResponseType = SuccessResponse<UserDetailedResponse> | UserErrorResponseType

export class UserServiceResponse {

	private readonly status: number;
	private readonly rawBody:    string;
	private readonly result:     UserServiceResponseType;

	private constructor(body: string, statusCode: number) {
		this.status  = statusCode;
		this.rawBody = body;
		this.result  = decodeUserServiceResponse(body);
	}

	public static async createFromHttpResponse(response: { status: number, json: () => Promise<any> }) {
		const status = response.status;
		const body   = await response.json();
		return new UserServiceResponse(body, status);
	}

	public static isSuccess(response: any): response is UserSuccessResponseType {
		// TODO: check param type
		// TODO: may be check status code
		return (response.result as UserSuccessResponseType).data !== undefined;
	}

	public static isError(response: any): response is UserErrorResponseType {
		// TODO: check param type
		// TODO: may be check status code
		return (response.result as UserErrorResponseType).error !== undefined;
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
