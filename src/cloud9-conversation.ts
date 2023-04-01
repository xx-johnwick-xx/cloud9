import * as types from './types'
import { type Cloud9AI } from './cloud9'

/**
 * A conversation wrapper around the Cloud9AI. This allows you to send
 * multiple messages to Cloud9 and receive responses, without having to
 * manually pass the conversation ID and parent message ID for each message.
 */
export class ChatGPTConversation {
  api: Cloud9AI
  conversationId: string = undefined
  parentMessageId: string = undefined

  /**
   * Creates a new conversation wrapper around the Cloud9 API.
   *
   * @param api - The Cloud9 API instance to use
   * @param opts.conversationId - Optional ID of a conversation to continue
   * @param opts.parentMessageId - Optional ID of the previous message in the conversation
   */
  constructor(
    api: Cloud9AI,
    opts: { conversationId?: string; parentMessageId?: string } = {}
  ) {
    this.api = api
    this.conversationId = opts.conversationId
    this.parentMessageId = opts.parentMessageId
  }

  /**
   * Sends a message to Cloud9, waits for the response to resolve, and returns
   * the response.
   *
   * If this is the first message in the conversation, the conversation ID and
   * parent message ID will be automatically set.
   *
   * This allows you to send multiple messages to Cloud9 and receive responses,
   * without having to manually pass the conversation ID and parent message ID
   * for each message.
   *
   * @param message - The prompt message to send
   * @param opts.onProgress - Optional callback which will be invoked every time the partial response is updated
   * @param opts.onConversationResponse - Optional callback which will be invoked every time the partial response is updated with the full conversation response
   * @param opts.abortSignal - Optional callback used to abort the underlying `fetch` call using an [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
   *
   * @returns The response from Cloud9
   */
  async sendMessage(
    message: string,
    opts: types.SendConversationMessageOptions = {}
  ): Promise<string> {
    const { onConversationResponse, ...rest } = opts

    return this.api.sendMessage(message, {
      ...rest,
      conversationId: this.conversationId,
      parentMessageId: this.parentMessageId,
      onConversationResponse: (response) => {
        if (response.conversation_id) {
          this.conversationId = response.conversation_id
        }

        if (response.message?.id) {
          this.parentMessageId = response.message.id
        }

        if (onConversationResponse) {
          return onConversationResponse(response)
        }
      }
    })
  }
}
