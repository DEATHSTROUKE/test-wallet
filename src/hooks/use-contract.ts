import { PapayaMaster } from '@/ton/wrappers/PapayaMaster'
import { Address, OpenedContract } from '@ton/core'

import { envConfig } from '@/config/constants'

import { useAsyncInitialize } from './use-async-initialize'
import { useTonClient } from './use-ton-client'
import { useTonConnect } from './use-ton-connect'

/**
 * Logic for interacting with the smart contract
 */
export const useContract = () => {
  const { sender, wallet } = useTonConnect()
  const { client } = useTonClient()

  const papayaMasterContract = useAsyncInitialize(async () => {
    if (!client) return

    const contract = PapayaMaster.createFromAddress(
      Address.parse(envConfig.papayaMasterAddress)
    )

    return client.open(contract) as OpenedContract<PapayaMaster>
  }, [client])

  const getWalletData = async () => {
    if (!papayaMasterContract || !wallet) return

    const creatorClientAddress = await papayaMasterContract.getWalletAddress(
      Address.parse(wallet)
    )
    console.info(
      'getWalletAddress',
      { creatorClientAddress },
      Address.normalize(creatorClientAddress),
      wallet
    )

    if (client && !(await client.isContractDeployed(creatorClientAddress))) {
      console.info(
        `Error: Contract at address ${creatorClientAddress} is not deployed!`
      )
      return
    }
  }

  const initJettonWallet = async () => {
    if (!papayaMasterContract || !wallet) return

    await papayaMasterContract.sendInitJettonWallet(
      sender,
      BigInt(0.21 * 1e9),
      1
    )
  }

  return { getWalletData, initJettonWallet }
}
