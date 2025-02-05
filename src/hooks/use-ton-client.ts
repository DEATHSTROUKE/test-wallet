import { getHttpEndpoint } from '@orbs-network/ton-access'
import { TonClient } from '@ton/ton'
import { CHAIN } from '@tonconnect/ui-react'
import { useEffect } from 'react'

import { useAsyncInitialize } from './use-async-initialize'
import { useTonConnect } from './use-ton-connect'

/**
 * Getting the blockchain interface
 */
export function useTonClient() {
  const { network } = useTonConnect()

  useEffect(() => {
    console.info(network === CHAIN.MAINNET ? 'mainnet' : 'testnet')
  }, [network])

  return {
    client: useAsyncInitialize(async () => {
      if (!network) return

      return new TonClient({
        endpoint: await getHttpEndpoint({
          network: network === CHAIN.MAINNET ? 'mainnet' : 'testnet',
        }),
      })
    }, [network]),
  }
}
