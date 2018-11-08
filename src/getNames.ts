export function getNames<D>(names: string[]) {
  return new Proxy({} as names<D>, {
    get(target: names<D>, key: keyof D): string[] {
      if ((target[key] as any) === undefined) {
        target[key] = Object.assign([], names);
        target[key].push(key.toString());
      }
      return target[key];
    }
  });
}

export type names<T> = { [K in keyof T]: string[] };

export default getNames;
