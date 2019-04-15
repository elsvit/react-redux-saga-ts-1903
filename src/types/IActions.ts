
import {Action} from 'redux';

export enum TActions {
  'ERROR',
  'LOADING',
  'restaurants/GET'
}

export interface IActionWithPayload<T> extends Action {
  readonly type: TActions
  readonly payload: T
}

// export function isActionWithPayload<T>(arg: any): arg is IActionWithPayload<T> {
//   return arg.type !== undefined && (arg.payload as T) !== undefined;
// }
//
// export function actionCreator<T = any>(type: string) {
//   return (payload: T): IActionWithPayload<T> => {
//     return {type, payload};
//   };
// }
//
// export function voidActionCreator<T = void>(type: string) {
//   return (payload?: T): IActionWithPayload<T | void> => {
//     return {type, payload};
//   };
// }

// const typeCache: Set<string> = new Set();
//
// export function type(tag: string, label: string): string {
//   const composed = `${tag}::${label}`;
//
//   if (typeCache.has(composed)) {
//     throw new TypeError(`Action type '${composed}' is not unique`);
//   }
//
//   typeCache.add(composed);
//
//   return composed;
// }
//
// export function reset(tag: string): string {
//   return type(tag, 'reset');
// }
//
// export function setInit(tag: string): string {
//   return type(tag, 'set initialized');
// }
//
// export function setErrors(tag: string): string {
//   return type(tag, 'set errors');
// }

// export function setLoading(tag: string): string {
//   return type(tag, 'set loading');
// }

// export interface IKeyValuePayload<T, T1> {
//   key: T
//   value: T1
// }

// export interface IKeyBooleanPayload<T> extends IKeyValuePayload<T, boolean> {}

