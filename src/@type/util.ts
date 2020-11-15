export type Constructor<T> = Function & { prototype: T }

export type ConstructorFunction<T> = new (...args: any[]) => T;