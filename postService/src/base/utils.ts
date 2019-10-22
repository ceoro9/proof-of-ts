/**
 * Checks if B is sub-class of A
 */
export function isSubClass(B: any) {
	return (A: any) => B.prototype instanceof A || B === A;
}


/**
 * Compose multilple decorators into one
 */
export function composeDecorators(decorators: Array<(target: any, propertyKey: string) => any>) {
	return function (target: any, propertyKey: string) {
			decorators.reverse().forEach((decorator) => decorator(target, propertyKey));
	};
}
