# handle-data-change

[![npm version](https://img.shields.io/npm/v/handle-data-change.svg)](https://www.npmjs.com/package/handle-data-change)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Handle data change.

- Great Typescript support.
- Meant to be used with React.

## Usage

```ts
// index.ts
import HandleDataChange from "handle-data-change";

type Data = { foo: string; bar: number };

const handleChange = new HandleDataChange<Data>(
  { foo: "adsf", bar: 0 },
  data => {
    console.log(data);
  }
);

handleChange.change.bar(6);
handleChange.change.foo("hello world");
```

```sh
$ ts-node index.ts
{ foo: 'adsf', bar: 6 }
{ foo: 'hello world', bar: 6 }
```
