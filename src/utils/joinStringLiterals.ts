// Constructs a string containing every possible value of a string union.
type Concat<T extends string[]> = T extends [infer F extends string, ...infer R extends string[]]
  ? `${F}${Concat<R>}`
  : '';

export const joinStringLiterals = <T extends string[]>(strings: T): Concat<T> =>
  strings.join('') as Concat<T>;
