import { HttpError } from 'http-errors';

export function isNull(obj: any): obj is null {
	return !obj && typeof null === 'object';
}

export function isUndefined(obj: any): obj is undefined {
	return typeof obj === 'undefined';
}

export function isArray<T>(obj: any): obj is T[] {
	return Array.isArray(obj);
}

export function isError(obj: any): obj is Error {
	return obj instanceof Error;
}

export function isString(obj: any): obj is string {
	return typeof obj === 'string';
}

export function isHttpError(obj: any): obj is HttpError {
	return obj instanceof HttpError;
}
