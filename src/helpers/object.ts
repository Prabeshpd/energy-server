import snakeize = require('snakeize');
import camelize = require('camelize');

export function toCamelCase<T>(object: any): T {
  return camelize(object);
}

export function toSnakeCase<T>(object: any): T {
  return snakeize(object);
}

export function listWithoutAttrs<T>(obj: object[], attrsToExclude: any[]): T[] {
  return obj.map((item) => withoutAttrs<T>(item, attrsToExclude));
}

export function withoutAttrs<T>(obj: any, attrsToExclude: any[]): T {
  if (Array.isArray(obj)) {
    throw new TypeError('withoutAttrs() expects first argument to be a plain object, array given.');
  }

  const result: any = {};

  Object.keys(obj).forEach((key: string) => {
    if (!attrsToExclude.includes(key)) {
      result[key] = obj[key];
    }
  });

  return result;
}

export function withOnlyAttrs<T>(obj: any, attrs: any[]): T {
  const result: any = {};

  Object.keys(obj).forEach((key) => {
    if (attrs.includes(key)) {
      result[key] = obj[key];
    }
  });

  return result;
}
