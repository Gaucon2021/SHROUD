import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFile} from 'node:fs/promises';
import {createServer} from 'node:http';
import {resolve,extname} from 'node:path';
const require=createRequire(resolve(process.env.QA_PLAYWRIGHT_ROOT,'package.json'));
const {chromium}=require('playwright');
const root=process.cwd();
const server=createServer(async(req,res)=>{try{const path=new URL(req.url,'http://localhost').pathname;const p=resolve(root,'.'+(path==='/'?'/index.html':path));if(!p.startsWith(root+'/')){res.writeHead(403);res.end();return}const mime={'.html':'text/html','.mjs':'application/javascript','.js':'application/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml'};if(!mime[extname(p)]){res.writeHead(404);res.end();return}const body=await readFile(p);res.writeHead(200,{'Content-Type':mime[extname(p)]+'; charset=utf-8'});res.end(body)}catch{res.writeHead(404);res.end()}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;let browser;
try{browser=await chromium.launch({channel:'chrome',headless:true,args:['--no-sandbox']});for(const viewport of [{width:1440,height:900},{width:390,height:844}]){
const ctx=await browser.newContext({viewport,acceptDownloads:true});const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route('**/*',r=>r.request().url().startsWith(origin+'/')?r.continue():r.abort());await page.goto(origin+'/');await page.waitForLoadState('load');
const nav=page.locator('.workspace-nav');assert.equal(await nav.evaluate(e=>getComputedStyle(e).position),viewport.width>740?'fixed':'sticky');
if(viewport.width>740)assert(Math.abs((await nav.boundingBox()).height-viewport.height)<=2);
const targets=await page.locator('.workspace-nav button[data-target]').evaluateAll(xs=>xs.map(x=>x.dataset.target));assert(targets.length>=2);
for(const target of targets){await page.locator('.workspace-nav button[data-target="'+target+'"]').click();assert(await page.locator('[data-page="'+target+'"]').isVisible());assert.equal(await page.locator('.workspace-page:not([hidden])').count(),1);assert.equal(await page.locator('.workspace-nav [aria-current=page]').count(),1);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+3),'horizontal overflow on '+target+' at '+viewport.width);}
await page.locator('.workspace-nav button[data-target="'+targets[0]+'"]').click();
if(viewport.width>740){const eq=async(sel,value)=>{await page.waitForFunction(({sel,value})=>document.querySelector(sel)?.textContent.trim()===value,{sel,value});assert.equal((await page.locator(sel).innerText()).trim(),value)};await page.click('#inspect');await eq('#status','DEVICE_ONLY');await page.selectOption('#mode','hybrid');await eq('#status','Review required');await page.click('#inspect');await eq('#status','BLOCK');await page.check('#consent');await page.click('#inspect');await eq('#status','REVIEW_REDACTED');assert(!(await page.locator('#preview').innerText()).includes('alex@example.com'));assert((await page.locator('#preview').innerText()).includes('REDACTED_EMAIL'));await page.fill('#doc','New synthetic document');await eq('#status','Review required');assert(await page.locator('#run').isDisabled());await eq('#ui-proof','Not verified');}
assert.deepEqual(errors,[]);console.log('PASS browser '+viewport.width+'x'+viewport.height+' navigation, overflow, page errors'+(viewport.width>740?' and product flow':''));await ctx.close();
}}finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}
