import dynamicOnChange from "dynamic-on-change";

export class HandleDataChange<D> {
  private _Data: D;
  constructor(data: D, private _onChange: (newData: D) => void) {
    this._Data = Object.assign({}, data);
  }
  public change = dynamicOnChange<Required<D>>((key, value) => {
    this._Data[key] = value;
    this._onChange(this._Data);
  });
}

export default HandleDataChange;
