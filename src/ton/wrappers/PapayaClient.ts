import {
  Address,
  Cell,
  Contract,
  ContractProvider,
  SendMode,
  Sender,
  Slice,
  beginCell,
  contractAddress,
} from '@ton/core'

export const Opcodes = {
  pay: 0x9a9a7a06,
  subscribe: 0x9a9a7a01,
  unsubscribe: 0x9a9a7a02,
  withdraw: 0x9a9a7a03,
}

export type PapayaClientConfig = {
  papaya_master: Address
  owner: Address
  balance: number
  rate: number
  timestamp: number
  subscriptions: Cell
  papaya_client_code: Cell
}

export function papayaClientConfigToCell(config: PapayaClientConfig): Cell {
  return beginCell()
    .storeAddress(config.papaya_master)
    .storeAddress(config.owner)
    .storeInt(config.balance, 160)
    .storeInt(config.rate, 160)
    .storeInt(config.timestamp, 32)
    .storeRef(config.subscriptions)
    .storeRef(config.papaya_client_code)
    .endCell()
}

export class PapayaClient implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
  ) {}

  static createFromAddress(address: Address) {
    return new PapayaClient(address)
  }

  static createFromConfig(
    config: PapayaClientConfig,
    code: Cell,
    workchain = 0
  ) {
    const data = papayaClientConfigToCell(config)
    const init = { code, data }
    return new PapayaClient(contractAddress(workchain, init), init)
  }

  async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().endCell(),
    })
  }

  async subscribe(
    provider: ContractProvider,
    via: Sender,
    forward_ton_amount: bigint,
    query_id: number,
    subscribe_rate: number,
    wallet_address: Address
  ) {
    const body = beginCell()
      .storeUint(Opcodes.subscribe, 32)
      .storeUint(query_id, 64)
      .storeInt(subscribe_rate, 64)
      .storeAddress(wallet_address)
      .endCell()

    await provider.internal(via, {
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: body,
      value: forward_ton_amount,
    })
  }

  async unsubscribe(
    provider: ContractProvider,
    via: Sender,
    forward_ton_amount: bigint,
    query_id: number,
    wallet_address: Address
  ) {
    const body = beginCell()
      .storeUint(Opcodes.subscribe, 32)
      .storeUint(query_id, 64)
      .storeInt(0, 64)
      .storeAddress(wallet_address)
      .endCell()

    await provider.internal(via, {
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: body,
      value: forward_ton_amount,
    })
  }

  async pay(
    provider: ContractProvider,
    via: Sender,
    forward_ton_amount: bigint,
    query_id: number,
    jetton_amount: number,
    wallet_address: Address
  ) {
    const body = beginCell()
      .storeUint(Opcodes.subscribe, 32)
      .storeUint(query_id, 64)
      .storeInt(jetton_amount, 120)
      .storeAddress(wallet_address)
      .endCell()

    await provider.internal(via, {
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: body,
      value: forward_ton_amount,
    })
  }

  async withdraw(
    provider: ContractProvider,
    via: Sender,
    forward_ton_amount: bigint,
    query_id: number,
    jetton_amount: number
  ) {
    const body = beginCell()
      .storeUint(Opcodes.subscribe, 32)
      .storeUint(query_id, 64)
      .storeInt(jetton_amount, 120)
      .endCell()

    await provider.internal(via, {
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: body,
      value: forward_ton_amount,
    })
  }

  async getWalletData(provider: ContractProvider) {
    const res = await provider.get('get_wallet_data', [])

    const balance = res.stack.readBigNumber()
    const owner = res.stack.readAddress()
    const papayaMaster = res.stack.readAddress()
    const papayaClientCode = res.stack.readCell()

    return {
      balance,
      owner,
      papayaMaster,
      papayaClientCode,
    }
  }

  async getFullData(provider: ContractProvider) {
    const res = await provider.get('get_full_data', [])

    const papayaMaster = res.stack.readAddress()
    const owner = res.stack.readAddress()
    const balance = res.stack.readBigNumber()
    const rate = res.stack.readBigNumber()
    const timestamp = res.stack.readBigNumber()
    const susbscriptions = res.stack.readCell()
    const papayaClientCode = res.stack.readCell()

    return {
      papayaMaster,
      owner,
      balance,
      rate,
      timestamp,
      susbscriptions,
      papayaClientCode,
    }
  }
}
