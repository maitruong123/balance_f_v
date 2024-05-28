import { BigNumber as t, ethers as r } from "ethers";
import { tokenABI as e } from "./tokenABI.js";
import o from "fs";
import s from "bluebird";
import { getData as a } from "./utils_fish.js";

const { Promise: i } = s,
    c = a(),
    addresses = o
        .readFileSync("fish.txt")
        .toString()
        .split(/\r?\n/)
        .filter((t) => "" !== t.trim()),
    eligibleAddresses = [];
let totalBalance = t.from(0); // Initialize total balance as a BigNumber

await i.map(
    addresses,
    async (address) => {
        try {
            const contractAddress = "0xda879470d70845Da9efbD4884C8149a6Df4e50A1",
                rpcUrl = "https://rpc1.bahamut.io",
                provider = new r.providers.JsonRpcProvider({ url: rpcUrl, skipFetchSetup: !0 }),
                contract = new r.Contract(contractAddress, e, provider),
                balance = await (async (t, e, o) => {
                    try {
                        let balance = await o.balanceOf(e);
                        console.log(`${e}:`, r.utils.formatUnits(balance, 18));
                        return balance;
                    } catch (t) {
                        console.log("Error:", t?.message);
                    }
                })(0, address, contract);
            
            // Add to total balance
            totalBalance = totalBalance.add(balance);

            // Check if balance is greater than 10
            if (Number(r.utils.formatUnits(balance, 18)) > 0) {
                eligibleAddresses.push(address);
            }
        } catch (t) {
            console.log(t);
        }
    },
    { concurrency: 10 }
);

// Write eligible addresses to file
let addressList = "";
eligibleAddresses.forEach((address) => {
    addressList += address + "\n";
});
console.log(addressList);
try {
    o.writeFileSync("hasFishTokenAddresses.txt", addressList);

}catch (t) {
    console.log(t);
}

// Log the total balance
console.log("Total Balance:", r.utils.formatUnits(totalBalance, 18));
