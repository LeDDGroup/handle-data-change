import dynamicOnChange from "dynamic-on-change";
import getNames, { names } from "./getNames";

export class HandleDataChange<D> {
  constructor(
    data: D,
    private _onChange: (newData: D) => void,
    name?: string,
    prefix?: string
  ) {
    this.value = Object.assign({}, data);
    this.name = getNames<D>(name || "data", prefix || ".");
  }
  public change = dynamicOnChange<Required<D>>((key, value) => {
    this.value[key] = value;
    this._onChange(this.value);
  });
  public name: names<D>;
  public value: D;
}

export default HandleDataChange;
