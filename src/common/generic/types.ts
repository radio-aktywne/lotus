export type ExcludeExact<T, U> = T extends U ? (U extends T ? never : T) : T;
