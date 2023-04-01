[cloud9](../readme.md) / [Exports](../modules.md) / Cloud9AI

# Class: Cloud9AI

## Table of contents

### Constructors

- [constructor](Cloud9AI.md#constructor)

### Accessors

- [clearanceToken](Cloud9AI.md#clearancetoken)
- [sessionToken](Cloud9AI.md#sessiontoken)
- [user](Cloud9AI.md#user)
- [userAgent](Cloud9AI.md#useragent)

### Methods

- [ensureAuth](Cloud9AI.md#ensureauth)
- [getConversation](Cloud9AI.md#getconversation)
- [getIsAuthenticated](Cloud9AI.md#getisauthenticated)
- [refreshAccessToken](Cloud9AI.md#refreshaccesstoken)
- [sendMessage](Cloud9AI.md#sendmessage)

## Constructors

### constructor

• **new Cloud9AI**(`opts`)

Creates a new client wrapper around the unofficial Cloud9 REST API.

Note that your IP address and `userAgent` must match the same values that you used
to obtain your `clearanceToken`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | `Object` | - |
| `opts.accessToken?` | `string` | **`Default Value`**  `undefined` * |
| `opts.accessTokenTTL?` | `number` | **`Default Value`**  1 hour * |
| `opts.apiBaseUrl?` | `string` | **`Default Value`**  `'https://chat.openai.com/api'` * |
| `opts.backendApiBaseUrl?` | `string` | **`Default Value`**  `'https://chat.openai.com/backend-api'` * |
| `opts.clearanceToken` | `string` | = **Required** Cloudflare `cf_clearance` cookie value (see readme for instructions) |
| `opts.debug?` | `boolean` | **`Default Value`**  `false` * |
| `opts.headers?` | `Record`<`string`, `string`\> | **`Default Value`**  `undefined` * |
| `opts.markdown?` | `boolean` | **`Default Value`**  `true` * |
| `opts.sessionToken` | `string` | = **Required** OpenAI session token which can be found in a valid session's cookies (see readme for instructions) |
| `opts.userAgent?` | `string` | **`Default Value`**  `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'` * |

#### Defined in

[src/cloud9.ts:45](https://github.com/xx-johnwick-xx/cloud9/blob/c257286/src/cloud9.ts#L45)

## Accessors

### clearanceToken

• `get` **clearanceToken**(): `string`

Gets the current Cloudflare clearance token (`cf_clearance` cookie value).

#### Returns

`string`

#### Defined in

[src/cloud9.ts:136](https://github.com/xx-johnwick-xx/cloud9/blob/c257286/src/cloud9.ts#L136)

___

### sessionToken

• `get` **sessionToken**(): `string`

Gets the current session token.

#### Returns

`string`

#### Defined in

[src/cloud9.ts:131](https://github.com/xx-johnwick-xx/cloud9/blob/c257286/src/cloud9.ts#L131)

___

### user

• `get` **user**(): [`User`](../modules.md#user)

Gets the currently signed-in user, if authenticated, `null` otherwise.

#### Returns

[`User`](../modules.md#user)

#### Defined in

[src/cloud9.ts:126](https://github.com/xx-johnwick-xx/cloud9/blob/c257286/src/cloud9.ts#L126)

___

### userAgent

• `get` **userAgent**(): `string`

Gets the current user agent.

#### Returns

`string`

#### Defined in

[src/cloud9.ts:141](https://github.com/xx-johnwick-xx/cloud9/blob/c257286/src/cloud9.ts#L141)

## Methods

### ensureAuth

▸ **ensureAuth**(): `Promise`<`string`\>

Refreshes the client's access token which will succeed only if the session
is still valid.

#### Returns

`Promise`<`string`\>

#### Defined in

[src/cloud9.ts:319](https://github.com/xx-johnwick-xx/cloud9/blob/c257286/src/cloud9.ts#L319)

___

### getConversation

▸ **getConversation**(`opts?`): [`ChatGPTConversation`](ChatGPTConversation.md)

Gets a new ChatGPTConversation instance, which can be used to send multiple
messages as part of a single conversation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | `Object` | - |
| `opts.conversationId?` | `string` | Optional ID of the previous message in a conversation |
| `opts.parentMessageId?` | `string` | Optional ID of the previous message in a conversation |

#### Returns

[`ChatGPTConversation`](ChatGPTConversation.md)

The new conversation instance

#### Defined in

[src/cloud9.ts:425](https://github.com/xx-johnwick-xx/cloud9/blob/c257286/src/cloud9.ts#L425)

___

### getIsAuthenticated

▸ **getIsAuthenticated**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

`true` if the client has a valid acces token or `false` if refreshing
the token fails.

#### Defined in

[src/cloud9.ts:306](https://github.com/xx-johnwick-xx/cloud9/blob/c257286/src/cloud9.ts#L306)

___

### refreshAccessToken

▸ **refreshAccessToken**(): `Promise`<`string`\>

Attempts to refresh the current access token using the Cloud9
`sessionToken` cookie.

Access tokens will be cached for up to `accessTokenTTL` milliseconds to
prevent refreshing access tokens too frequently.

**`Throws`**

An error if refreshing the access token fails.

#### Returns

`Promise`<`string`\>

A valid access token

#### Defined in

[src/cloud9.ts:333](https://github.com/xx-johnwick-xx/cloud9/blob/c257286/src/cloud9.ts#L333)

___

### sendMessage

▸ **sendMessage**(`message`, `opts?`): `Promise`<`string`\>

Sends a message to Cloud9, waits for the response to resolve, and returns
the response.

If you want to receive a stream of partial responses, use `opts.onProgress`.
If you want to receive the full response, including message and conversation IDs,
you can use `opts.onConversationResponse` or use the `Cloud9AI.getConversation`
helper.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | The prompt message to send |
| `opts` | [`SendMessageOptions`](../modules.md#sendmessageoptions) | - |

#### Returns

`Promise`<`string`\>

The response from Cloud9

#### Defined in

[src/cloud9.ts:166](https://github.com/xx-johnwick-xx/cloud9/blob/c257286/src/cloud9.ts#L166)
