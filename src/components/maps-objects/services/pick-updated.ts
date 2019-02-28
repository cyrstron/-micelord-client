interface DynamicKeysObj {
  [key: string]: any;
}

export function pickUpdated<T>(
  prevProps: T & DynamicKeysObj | undefined,
  props: T & DynamicKeysObj | undefined,
): T | void {
  if (!props) return;
  if (!prevProps) return props as T;

  const updatedProps = Object.keys(props)
    .reduce((result: {[key: string]: any} | undefined, propName) => {
      const prop = props[propName];
      const prevProp = prevProps[propName];
      if (prop === prevProp) return result;

      if (!result) {
        result = {};
      }
      result[propName] = prop;
      return result;
    }, undefined);

  return updatedProps as T | undefined;
}
