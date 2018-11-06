import HandleDataChange from "./index";

it("should create names", () => {
  type Data = { foo?: string; bar: number };
  const name = "handle-change-data";
  const data = new HandleDataChange<Data>(
    { bar: 0 },
    (value: Data) => console.log(value),
    name
  );

  expect(data.name.bar).toBe(name + "." + "bar");
  expect(data.name.foo).toBe(name + "." + "foo");
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
    data.name.foo
  );

  const pre = name + "." + "foo";
  expect(nested.name.complex).toBe(pre + "." + "complex");
  expect(nested.name.someOther).toBe(pre + "." + "someOther");
  expect(nested.name.someNumber).toBe(pre + "." + "someNumber");
});
