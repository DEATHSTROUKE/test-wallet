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

export type PapayaMasterConfig = {
  admin: Address
  salt: number
  jetton_minter: Address
  total_supply: number
  jetton_wallet: Address
  content: Cell
  clientCode: Cell
}

export function papayaMasterConfigToCell(config: PapayaMasterConfig): Cell {
  return beginCell()
    .storeAddress(config.admin)
    .storeInt(config.salt, 32)
    .storeAddress(config.jetton_minter)
    .storeInt(config.total_supply, 160)
    .storeAddress(config.jetton_wallet)
    .storeRef(config.content)
    .storeRef(config.clientCode)
    .endCell()
}

export const Opcodes = {
  init_jetton_wallet: 0x9a9a7a07,
  init_content: 0x9a9a7a08,
}

export class PapayaMaster implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
  ) {}

  static createFromAddress(address: Address) {
    return new PapayaMaster(address)
  }

  static createFromConfig(
    config: PapayaMasterConfig,
    code: Cell,
    workchain = 0
  ) {
    const data = papayaMasterConfigToCell(config)
    const init = { code, data }
    return new PapayaMaster(contractAddress(workchain, init), init)
  }

  async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().endCell(),
    })
  }

  async sendInitJettonWallet(
    provider: ContractProvider,
    via: Sender,
    forward_ton_amount: bigint,
    query_id: number | 0
  ) {
    const body = beginCell()
      .storeUint(Opcodes.init_jetton_wallet, 32)
      .storeUint(query_id, 64)
      .endCell()

    await provider.internal(via, {
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: body,
      value: forward_ton_amount,
    })
  }

  async sendInitContent(
    provider: ContractProvider,
    via: Sender,
    forward_ton_amount: bigint,
    query_id: number = Math.floor(Math.random() * 10000),
    content: Cell
  ) {
    const body = beginCell()
      .storeUint(Opcodes.init_content, 32)
      .storeUint(query_id, 64)
      .storeRef(content)
      .endCell()

    await provider.internal(via, {
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: body,
      value: forward_ton_amount,
    })
  }

  async getJettonData(provider: ContractProvider) {
    const res = await provider.get('get_jetton_data', [])
    const totalSupply = res.stack.readBigNumber()
    const mintable = res.stack.readBoolean()
    const adminAddress = res.stack.readAddress()
    const content = res.stack.readCell()
    const walletCode = res.stack.readCell()
    return {
      totalSupply,
      mintable,
      adminAddress,
      content,
      walletCode,
    }
  }

  async getFullData(provider: ContractProvider) {
    const res = await provider.get('get_full_data', [])

    const admin = res.stack.readAddress()
    const salt = res.stack.readBigNumber()
    const jetton_minter = res.stack.readAddress()
    const total_supply = res.stack.readBigNumber()
    const jetton_wallet = res.stack.readAddress()
    const content = res.stack.readCell()
    const clientCode = res.stack.readCell()

    return {
      admin,
      salt,
      jetton_minter,
      total_supply,
      jetton_wallet,
      content,
      clientCode,
    }
  }

  async getWalletAddress(
    provider: ContractProvider,
    owner: Address
  ): Promise<Address> {
    const res = await provider.get('get_wallet_address', [
      { type: 'slice', cell: beginCell().storeAddress(owner).endCell() },
    ])
    return res.stack.readAddress()
  }
}
