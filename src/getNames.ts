export function getNames<D>(name: string, prefix: string) {
  return new Proxy({} as names<D>, {
    get(target: names<D>, key: keyof D): string {
      if ((target[key] as any) === undefined) {
        target[key] = name + prefix + key;
      }
      return target[key];
    }
  });
}

export type names<T> = { [K in keyof T]: string };

export default getNames;
