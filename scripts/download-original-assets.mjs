import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import pages from '../src/original-pages.json' with {type:'json'};
fs.mkdirSync('public/assets/original',{recursive:true});
const sources=[...new Set(pages.flatMap(page=>page.blocks.filter(block=>block.type==='image').map(block=>block.source||block.src)))];
const mapping={};
await Promise.all(sources.map(async src=>{
 const response=await fetch(src);
 if(!response.ok)throw Error(`${response.status}: ${src}`);
 const filename=crypto.createHash('sha256').update(src).digest('hex').slice(0,12)+path.extname(new URL(src).pathname);
 fs.writeFileSync(`public/assets/original/${filename}`,Buffer.from(await response.arrayBuffer()));
 mapping[src]=`/assets/original/${filename}`;
}));
process.stdout.write(JSON.stringify(mapping));
