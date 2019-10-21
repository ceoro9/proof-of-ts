/**
 * Checks if B is sub-class of A
 */
export function isSubClass(B: any) {
	return (A: any) => B.prototype instanceof A || B === A;
}
