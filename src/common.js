/* @flow */

export type Decorator<T> = (input: string, data: T) => T;

export function createNode<T>(node: any, decorator: Decorator<T>, data: T): any {
  function fn(input: string): T {
    return decorator(input, data);
  }

  Object.defineProperties(fn, node);

  return fn;
}
