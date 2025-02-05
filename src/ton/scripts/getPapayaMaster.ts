import { Address, toNano, Cell, OpenedContract } from '@ton/core';
import { PapayaMaster } from '../wrappers/PapayaMaster';
import { NetworkProvider, sleep } from '@ton/blueprint';

let papayaMaster:OpenedContract<PapayaMaster>

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('papayaMaster address'));
 
    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    papayaMaster = provider.open(PapayaMaster.createFromAddress(address))

    console.log(await papayaMaster.getFullData());

    // const providerAddr = provider.sender().address as Address

    // const forward_ton_amount = 1n;

    // var jettonAddress = await ui.input('papayaMaster jetton wallet address')

    // const jetton_wallet = Address.parse(jettonAddress);

    // await master.sendInit(provider.sender(), providerAddr, providerAddr, 0, forward_ton_amount, 1, jetton_wallet, Cell.EMPTY)
}