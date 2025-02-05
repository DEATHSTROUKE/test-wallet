import { Address, toNano, Cell } from '@ton/core';
import { PapayaClient } from '../../wrappers/PapayaClient';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const clientAddress = Address.parse(args.length > 0 ? args[0] : await ui.input('papayaClient address'));
 
    if (!(await provider.isContractDeployed(clientAddress))) {
        ui.write(`Error: Contract at address ${clientAddress} is not deployed!`);
        return;
    }

    const client = provider.open(PapayaClient.createFromAddress(clientAddress))

    const wallet_address = Address.parse(args.length > 0 ? args[1] : await ui.input('creator`s wallet address'));

    const forward_ton_amount = toNano("0.2");

    await client.unsubscribe(
        provider.sender(), 
        forward_ton_amount,
        Math.floor(Math.random() * 10000), //query_id
        wallet_address
        );
}