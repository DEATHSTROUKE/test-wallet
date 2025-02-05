import { toNano, Cell, Address, Slice } from '@ton/core';
import { PapayaMaster } from '../wrappers/PapayaMaster';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const masterCode = await compile('PapayaMaster');
    const clientCode = await compile('PapayaClient');

    const adminAddr = Address.parse(process.env.JETTON_MINTER as string);
    const jettonMinterAddr = Address.parse(process.env.ADMIN as string);

    const papayaMaster = provider.open(PapayaMaster.createFromConfig({
        admin: adminAddr,
        salt: Math.floor(Math.random() * 10000),
        jetton_minter: jettonMinterAddr,
        total_supply: 0,
        jetton_wallet: jettonMinterAddr,
        content: Cell.EMPTY,
        clientCode: clientCode
    }, masterCode, 0));

    await papayaMaster.sendDeploy(provider.sender(), toNano('0.15'));

    await provider.waitForDeploy(papayaMaster.address);
}
