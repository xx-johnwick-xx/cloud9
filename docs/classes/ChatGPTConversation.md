[cloud9](../readme.md) / [Exports](../modules.md) / ChatGPTConversation

# Class: ChatGPTConversation

A conversation wrapper around the Cloud9AI. This allows you to send
multiple messages to Cloud9 and receive responses, without having to
manually pass the conversation ID and parent message ID for each message.

## Table of contents

### Constructors

- [constructor](ChatGPTConversation.md#constructor)

### Properties

- [api](ChatGPTConversation.md#api)
- [conversationId](ChatGPTConversation.md#conversationid)
- [parentMessageId](ChatGPTConversation.md#parentmessageid)

### Methods

- [sendMessage](ChatGPTConversation.md#sendmessage)

## Constructors

### constructor

• **new ChatGPTConversation**(`api`, `opts?`)

Creates a new conversation wrapper around the Cloud9 API.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `api` | [`Cloud9AI`](Cloud9AI.md) | The Cloud9 API instance to use |
| `opts` | `Object` | - |
| `opts.conversationId?` | `string` | Optional ID of a conversation to continue |
| `opts.parentMessageId?` | `string` | Optional ID of the previous message in the conversation |

#### Defined in

[src/cloud9-conversation.ts:21](https://github.com/xx-johnwick-xx/cloud9/blob/c257286/src/cloud9-conversation.ts#L21)

## Properties

### api

• **api**: [`Cloud9AI`](Cloud9AI.md)

#### Defined in

[src/cloud9-conversation.ts:10](https://github.com/xx-johnwick-xx/cloud9/blob/c257286/src/cloud9-conversation.ts#L10)

___

### conversationId

• **conversationId**: `string` = `undefined`

#### Defined in

[src/cloud9-conversation.ts:11](https://github.com/xx-johnwick-xx/cloud9/blob/c257286/src/cloud9-conversation.ts#L11)

___

### parentMessageId

• **parentMessageId**: `string` = `undefined`

#### Defined in

[src/cloud9-conversation.ts:12](https://github.com/xx-johnwick-xx/cloud9/blob/c257286/src/cloud9-conversation.ts#L12)

## Methods

### sendMessage

▸ **sendMessage**(`message`, `opts?`): `Promise`<`string`\>

Sends a message to Cloud9, waits for the response to resolve, and returns
the response.

If this is the first message in the conversation, the conversation ID and
parent message ID will be automatically set.

This allows you to send multiple messages to Cloud9 and receive responses,
without having to manually pass the conversation ID and parent message ID
for each message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | The prompt message to send |
| `opts` | [`SendConversationMessageOptions`](../modules.md#sendconversationmessageoptions) | - |

#### Returns

`Promise`<`string`\>

The response from Cloud9

#### Defined in

[src/cloud9-conversation.ts:48](https://github.com/xx-johnwick-xx/cloud9/blob/c257286/src/cloud9-conversation.ts#L48)
