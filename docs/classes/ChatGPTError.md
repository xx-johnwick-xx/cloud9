[cloud9](../readme.md) / [Exports](../modules.md) / Cloud9Error

# Class: Cloud9Error

## Hierarchy

- `Error`

  ↳ **`Cloud9Error`**

## Table of contents

### Constructors

- [constructor](Cloud9Error.md#constructor)

### Properties

- [originalError](Cloud9Error.md#originalerror)
- [response](Cloud9Error.md#response)
- [statusCode](Cloud9Error.md#statuscode)
- [statusText](Cloud9Error.md#statustext)

## Constructors

### constructor

• **new Cloud9Error**(`message?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

#### Inherited from

Error.constructor

#### Defined in

node_modules/.pnpm/typescript@4.9.3/node_modules/typescript/lib/lib.es5.d.ts:1059

• **new Cloud9Error**(`message?`, `options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |
| `options?` | `ErrorOptions` |

#### Inherited from

Error.constructor

#### Defined in

node_modules/.pnpm/typescript@4.9.3/node_modules/typescript/lib/lib.es2022.error.d.ts:30

## Properties

### originalError

• `Optional` **originalError**: `Error`

#### Defined in

[src/types.ts:298](https://github.com/xx-johnwick-xx/cloud9/blob/c257286/src/types.ts#L298)

___

### response

• `Optional` **response**: `Response`

#### Defined in

[src/types.ts:297](https://github.com/xx-johnwick-xx/cloud9/blob/c257286/src/types.ts#L297)

___

### statusCode

• `Optional` **statusCode**: `number`

#### Defined in

[src/types.ts:295](https://github.com/xx-johnwick-xx/cloud9/blob/c257286/src/types.ts#L295)

___

### statusText

• `Optional` **statusText**: `string`

#### Defined in

[src/types.ts:296](https://github.com/xx-johnwick-xx/cloud9/blob/c257286/src/types.ts#L296)
