import dynamicOnChange from "dynamic-on-change";
import getNames, { names } from "./getNames";

export class HandleDataChange<D> {
  private _Data: D;
  constructor(
    data: D,
    private _onChange: (newData: D) => void,
    name?: string,
    prefix?: string
  ) {
    this._Data = Object.assign({}, data);
    this.name = getNames<D>(name || "data", prefix || ".");
  }
  public change = dynamicOnChange<Required<D>>((key, value) => {
    this._Data[key] = value;
    this._onChange(this._Data);
  });
  public name: names<D>;
}

export default HandleDataChange;
