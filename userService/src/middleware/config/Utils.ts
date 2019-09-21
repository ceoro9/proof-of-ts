
function getSafeProperty<T>(obj: { [index: string]: T | undefined }, propName: string) {
	if (!(propName in obj) || obj[propName] === undefined) {
		throw new Error(`'${propName}' property is not set`);
	}

	return obj[propName] as T;
}

export function getEnvVar(varName: string) {
	return getSafeProperty<string>(process.env, varName);
}
