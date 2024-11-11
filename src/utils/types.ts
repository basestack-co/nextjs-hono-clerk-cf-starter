export type ConvertAllToRequired<T> = {
  [P in keyof T]-?: T[P] extends object
    ? ConvertAllToRequired<NonNullable<T[P]>>
    : NonNullable<T[P]>;
};
