import { ethers as s } from "ethers";
import t from "fs";
import { getData as o } from "./utils_fish.js";
const e = o(),
    r = async (t, o, e, r, n, gasPrice) => {
        try {
            console.log("Nonce:", n);
            const o = { to: t, from: r.address, value: s.utils.parseUnits(e.toString(), "ether"), nonce: n, gasLimit: s.BigNumber.from("100000"), gasPrice: gasPrice },
                a = await r.sendTransaction(o);
            console.log("Success:", a.hash);
        } catch (s) {
            console.log("Error:" + t, s?.message);
        }
    },
    n = t
        .readFileSync("hasVivaTokenAddresses.txt")
        .toString()
        .split(/\r?\n/)
        .filter((s) => "" !== s.trim()),
    a = e.mnemonic,
    i = e.amount,
    c = new s.providers.JsonRpcProvider({ url: "https://rpc1.bahamut.io", skipFetchSetup: !0 });
let l = s.Wallet.fromMnemonic(a);
    const gasPrice = await c.getGasPrice();

(l = l.connect(c)), console.log("Main address:", l.address);
let m = await c.getTransactionCount(l.address, "latest");
for (const s of n) await r(s, 0, i, l, m, gasPrice), m++;
