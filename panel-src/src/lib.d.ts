type DeepReadonlyPrimitive<T> =
  T extends (infer R)[] ? DeepReadonlyArray<R> :
  T extends Function ? T :
  T extends object ? DeepReadonlyObject<T> :
  T;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonlyPrimitive<T>> {}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonlyPrimitive<T[P]>;
};
