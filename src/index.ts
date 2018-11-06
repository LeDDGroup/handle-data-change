import dynamicOnChange from "dynamic-on-change";
import getNames from "./getNames";

export class HandleDataChange<D> {
  private _Data: D;
  private _name: string;
  private _prefix: string;
  constructor(
    data: D,
    private _onChange: (newData: D) => void,
    name?: string,
    prefix?: string
  ) {
    this._Data = Object.assign({}, data);
    this._name = name || "data";
    this._prefix = prefix || ".";
  }
  public change = dynamicOnChange<Required<D>>((key, value) => {
    this._Data[key] = value;
    this._onChange(this._Data);
  });
  public name = getNames<D>(this._name, this._prefix);
}

export default HandleDataChange;
