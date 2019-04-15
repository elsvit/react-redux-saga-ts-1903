/**
 * @fileOverview Misc types
 */

/**
 * NOTE: The 'Maybe' type comes from Elm (which gets it from Haskell). For all
 * intents null and void are the same thing in terms of handling them in most
 * cases. The only important caveat being `typeof null === 'object'` or
 * `typeof undefined === 'undefined'`, but we usually use `isEmpty` or
 * `val == null` which covers both cases.
 *
 * @type {T | null | void}
 * @template T
 */

type Maybe<T> = T | null | undefined;
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type ValueUnion<T> = T[keyof T];
type Keys<T extends object> = Array<(keyof T)>;

interface IClassNamesDict {
  [className: string]: Maybe<boolean>
}
