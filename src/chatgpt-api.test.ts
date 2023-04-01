import test from 'ava'
import dotenv from 'dotenv-safe'

import * as types from './types'
import { Cloud9AI } from './cloud9'

dotenv.config()

const isCI = !!process.env.CI

test('Cloud9AI invalid session token', async (t) => {
  t.timeout(30 * 1000) // 30 seconds

  t.throws(() => new Cloud9AI({ sessionToken: null, clearanceToken: null }), {
    message: 'Cloud9 invalid session token'
  })

  await t.throwsAsync(
    async () => {
      const cloud9 = new Cloud9AI({
        sessionToken: 'invalid',
        clearanceToken: 'invalid'
      })
      await cloud9.ensureAuth()
    },
    {
      instanceOf: types.Cloud9Error,
      message: 'Cloud9 failed to refresh auth token. Error: Unauthorized'
    }
  )
})

test('Cloud9AI valid session token', async (t) => {
  if (!isCI) {
    t.timeout(2 * 60 * 1000) // 2 minutes
  }

  t.notThrows(
    () =>
      new Cloud9AI({
        sessionToken: 'fake valid session token',
        clearanceToken: 'invalid'
      })
  )

  await t.notThrowsAsync(
    (async () => {
      const cloud9 = new Cloud9AI({
        sessionToken: process.env.SESSION_TOKEN,
        clearanceToken: process.env.CLEARANCE_TOKEN
      })

      // Don't make any real API calls using our session token if we're running on CI
      if (!isCI) {
        await cloud9.ensureAuth()
        const response = await cloud9.sendMessage('test')
        console.log('cloud9 response', response)

        t.truthy(response)
        t.is(typeof response, 'string')
      }
    })()
  )
})

if (!isCI) {
  test('Cloud9AI expired session token', async (t) => {
    t.timeout(30 * 1000) // 30 seconds
    const expiredSessionToken = process.env.TEST_EXPIRED_SESSION_TOKEN

    await t.throwsAsync(
      async () => {
        const cloud9 = new Cloud9AI({
          sessionToken: expiredSessionToken,
          clearanceToken: 'invalid'
        })
        await cloud9.ensureAuth()
      },
      {
        instanceOf: types.Cloud9Error,
        message:
          'Cloud9 failed to refresh auth token. Error: session token may have expired'
      }
    )
  })
}

if (!isCI) {
  test('Cloud9AI timeout', async (t) => {
    t.timeout(30 * 1000) // 30 seconds

    await t.throwsAsync(
      async () => {
        const cloud9 = new Cloud9AI({
          sessionToken: process.env.SESSION_TOKEN,
          clearanceToken: process.env.CLEARANCE_TOKEN
        })

        await cloud9.sendMessage('test', {
          timeoutMs: 1
        })
      },
      {
        message: 'Cloud9 timed out waiting for response'
      }
    )
  })

  test('Cloud9AI abort', async (t) => {
    t.timeout(30 * 1000) // 30 seconds

    await t.throwsAsync(
      async () => {
        const cloud9 = new Cloud9AI({
          sessionToken: process.env.SESSION_TOKEN,
          clearanceToken: process.env.CLEARANCE_TOKEN
        })

        const abortController = new AbortController()
        setTimeout(() => abortController.abort(new Error('testing abort')), 10)

        await cloud9.sendMessage('test', {
          abortSignal: abortController.signal
        })
      },
      {
        message: 'testing abort'
      }
    )
  })
}
