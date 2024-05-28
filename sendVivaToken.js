import { BigNumber as t, ethers as e } from "ethers";
import { tokenABI as o } from "./tokenABI.js";
import r from "fs";
import a from "bluebird";
import { getData as n } from "./utils_viva.js";
const { Promise: s } = a,
    c = n(),
    i = r
        .readFileSync("mnemonics_viva.txt")
        .toString()
        .split(/\r?\n/)
        .filter((t) => "" !== t.trim()),
    l = c.address,
    m = "0xf93D24c03344B5e697ad83D59cAa1c5817973365";
await s.map(
    i,
    async (r) => {
        try {
            await (async (r, a, n) => {
                try {
                    const s = "https://rpc1.bahamut.io",
                        c = new e.providers.JsonRpcProvider({ url: s, skipFetchSetup: !0 }),
                        i = new e.Contract(n, o, c),
                        l = 18;
                    let m = e.Wallet.fromMnemonic(r);
                    m = m.connect(c);
                    let f = await i.balanceOf(m.address);
                        const gasPrice = await c.getGasPrice();
                    if ((console.log("Balance:", e.utils.formatUnits(f, l)), f.eq(t.from(0)))) throw new Error("Amount transfer not be 0");
                    const d = f.toString(),
                        p = i.interface.encodeFunctionData("transfer", [a, d]),
                        u = await c.getTransactionCount(m.address, "latest");
                    console.log("Nonce:", u);
                    const g = { to: n, from: m.address, value: e.utils.parseUnits("0.000", "ether"), data: p, nonce: u, gasLimit: e.BigNumber.from("100000"), gasPrice: gasPrice},
                        h = await m.sendTransaction(g);
                    console.log("Success:", h.hash);
                } catch (t) {
                    console.log("Error:" + r, t?.message);
                }
            })(r, l, m);
        } catch (t) {
            console.log(t);
        }
    },
    { concurrency: 10 }
);
