import HandleDataChange from "./index";

it("should create names", () => {
  type Data = { foo?: string; bar: number };
  const name = "handle-change-data";
  const data = new HandleDataChange<Data>(
    { bar: 0 },
    (value: Data) => console.log(value),
    [name]
  );

  expect(data.path.bar.join(".")).toBe(name + "." + "bar");
  expect(data.path.foo.join(".")).toBe(name + "." + "foo");
});

it("should create names in nested structures", () => {
  type Nested = {
    someNumber: number;
    someOther: any;
    complex: { a: string; b: string };
  };
  type Data = { foo?: Nested; bar: number };
  const name = "handle-change-data";
  const data = new HandleDataChange<Data>(
    { bar: 0 },
    (value: Data) => console.log(value),
    name
  );

  const nested = new HandleDataChange<Nested>(
    { someNumber: 3, someOther: "a", complex: { a: "a", b: "b" } },
    (value: Nested) => console.log(value),
    data.path.foo
  );

  const pre = name + "/" + "foo" + "/";
  expect(nested.path.complex.join("/")).toBe(pre + "complex");
  expect(nested.path.someOther.join("/")).toBe(pre + "someOther");
  expect(nested.path.someNumber.join("/")).toBe(pre + "someNumber");
});
