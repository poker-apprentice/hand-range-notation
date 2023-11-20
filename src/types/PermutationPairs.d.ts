export type PermutationPairs<T extends string, U extends string = T> = T extends never
  ? never
  : `${T}${Exclude<U, T>}`;
