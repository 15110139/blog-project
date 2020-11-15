export function throws<T extends Error>(e: T): never {
	throw e;
}
