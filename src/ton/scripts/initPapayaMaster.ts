import { Address, toNano, Cell } from '@ton/core';
import { PapayaMaster } from '../wrappers/PapayaMaster';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('papayaMaster address'));
 
    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const master = provider.open(PapayaMaster.createFromAddress(address))
    const forward_ton_amount = toNano("0.3");

    await master.sendInitJettonWallet(provider.sender(), forward_ton_amount, 1);
}