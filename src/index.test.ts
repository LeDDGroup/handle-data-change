import HandleDataChange from "./index";

class CheckCalls<D> {
  private lastChange: D | null = null;
  public check = (expected: D) => {
    expect(this.lastChange).toBeTruthy();
    expect(this.lastChange).toMatchObject(expected);
    this.lastChange = null;
  };
  public checkNotCalled = () => {
    expect(this.lastChange).toBeNull();
  };
  public change = (newData: D) => {
    this.checkNotCalled();
    this.lastChange = newData;
  };
}

it("should work", () => {
  type Data = { foo: string; bar: number };
  const checkCalls = new CheckCalls<Data>();
  const handleChange = new HandleDataChange<Data>(
    { foo: "adsf", bar: 0 },
    checkCalls.change
  );
  checkCalls.checkNotCalled();
  handleChange.change.bar(6);
  checkCalls.check({ foo: "adsf", bar: 6 });
  handleChange.change.foo("hello world");
  checkCalls.check({ foo: "hello world", bar: 6 });
});

it("should work with partial types", () => {
  type Data = { foo?: string; bar: number };
  const checkCalls = new CheckCalls<Data>();
  const handleChange = new HandleDataChange<Data>(
    { bar: 0 },
    checkCalls.change
  );
  checkCalls.checkNotCalled();
  handleChange.change.bar(6);
  checkCalls.check({ bar: 6 });
  handleChange.change.foo("hello world");
  checkCalls.check({ foo: "hello world", bar: 6 });
});

it("should have correct value", () => {
  type Data = { foo?: string; bar: number };
  const handleChange = new HandleDataChange<Data>({ bar: 0 }, console.log);
  handleChange.change.bar(6);
  handleChange.change.foo("hello world");
  expect(handleChange.value).toEqual({ bar: 6, foo: "hello world" });
});
