import dynamicOnChange, { dynamicOnChanges } from "dynamic-on-change";
import getNames, { names } from "./getNames";

export interface IData<D> {
  change: dynamicOnChanges<Required<D>>;
  path: names<Required<D>>;
  value: D;
}

export class HandleDataChange<D> implements IData<D> {
  constructor(
    data: D,
    private onChange: (newData: D) => void = () => null,
    path: string | string[] = []
  ) {
    this.value = Object.assign({}, data);
    this.path = getNames<Required<D>>(typeof path === "string" ? [path] : path);
  }
  public change = dynamicOnChange<Required<D>>((key, value) => {
    this.value[key] = value;
    this.onChange(this.value);
  });
  public path: names<Required<D>>;
  public value: D;
}

export default HandleDataChange;
