import{ethers as r}from"ethers";import t from"fs";import e from"bluebird";const{Promise:o}=e,s=t.readFileSync("addresses.txt").toString().split(/\r?\n/).filter((r=>""!==r.trim()));await o.map(s,(async t=>{try{const e="https://rpc1.bahamut.io",o=new r.providers.JsonRpcProvider({url:e,skipFetchSetup:!0});await(async(t,e)=>{try{let o=await e.getBalance(t);console.log(`${t}:`,r.utils.formatEther(o))}catch(r){console.log("Error:",r?.message)}})(t,o)}catch(r){}}),{concurrency:10});