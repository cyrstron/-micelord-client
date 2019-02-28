export function filterObject<T>(obj: {
  [key: string]: T | undefined,
}): {
  [key: string]: T,
} | void {
  return Object.keys(obj).reduce((
      result: {[key: string]: T} | undefined,
      key: string,
    ) => {
      const value = obj[key];
      if (value === undefined) return result;

      if (result === undefined) {
        result = {};
      }

      result[key] = value;
      return result;
  }, undefined);
}
