
function getSafeProperty<T>(obj: { [index: string]: T | undefined }, propName: string) {
	if (!(propName in obj) || obj[propName] === undefined) {
		throw new Error(`'${propName}' property is not set`);
	}
	return obj[propName] as T;
}

export function getEnvVar<T>(varName: string, defaultValue?: string) {
	try {
		return getSafeProperty<string>(process.env, varName);
	} catch (e) {
		if (defaultValue) {
			return defaultValue;
		}
		throw e;
	}
}
