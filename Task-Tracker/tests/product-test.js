const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {JSDOM}=require('jsdom');

const root=path.resolve(__dirname,'..');
const storage=fs.readFileSync(path.join(root,'assets/js/storage.js'),'utf8');
const app=fs.readFileSync(path.join(root,'assets/js/app.js'),'utf8');
let html=fs.readFileSync(path.join(root,'index.html'),'utf8')
  .replace(/<link[^>]+tokens\.css[^>]*>/,'')
  .replace(/<script defer src="[^"]*chart\.umd\.min\.js"><\/script>/,'')
  .replace(/<script defer src="[^"]*storage\.js"><\/script>/,'')
  .replace(/<script defer src="[^"]*app\.js"><\/script>/,'');
const product=html.match(/data-product="([^"]+)"/)[1];
const today=new Date(),date=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
const seed=product==='tasks'?`localStorage.setItem('lp_tasks_variable',JSON.stringify([{id:'task-1',title:'Ship standalone product',due:'${date}',priority:'High',status:'To do',notes:''}]));localStorage.setItem('lp_habits',JSON.stringify([{id:'habit-1',name:'Review tasks',frequency:'Daily',checks:{},createdAt:new Date().toISOString()}]));`:'';
const chartStub=`window.Chart=function(){this.destroy=function(){};this.getElementsAtEventForMode=function(){return[]}};`;
html=html.replace('</body>',`<script>${storage}<\/script><script>${seed}${chartStub}<\/script><script>${app}<\/script></body>`);
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://tracker.local/index.html#/dashboard'}),w=dom.window,d=w.document;

assert.equal(d.querySelectorAll('.modules>a').length,1,'Dashboard must be the first standalone navigation item');
assert.equal(d.querySelector('.modules>a').textContent.trim(),'Dashboard');
assert.equal(d.querySelector('.side-module-title').textContent.trim(),product==='finance'?'Financial Planner':'Task Tracker');
assert.equal(d.querySelectorAll('.side-sub-link').length,product==='finance'?4:5,'Only product pages belong in the sidebar');
assert(!d.body.textContent.includes(product==='finance'?'Fitness Planner':'Financial Planner'),'Unrelated product leaked into the UI');

if(product==='finance'){
  const data=w.DLFinance.getData(),income=data.categories.find(x=>x.type==='income'),expense=data.categories.find(x=>x.type==='expense'),month=date.slice(0,7);
  data.transactions.push({id:'i',type:'income',amount:1000,date,categoryId:income.id},{id:'e',type:'expense',amount:250,date,categoryId:expense.id});
  data.budgets.push({id:'b',categoryId:expense.id,limit:500});
  w.DLFinance.saveData(data);
  w.location.hash='/dashboard';w.dispatchEvent(new w.HashChangeEvent('hashchange'));
  assert.deepEqual({...w.DLFinance.getMonthSummary(data,month)},{expected:0,income:1000,spent:250,net:750,leftToSpend:750,savingsRate:75});
  assert(d.body.textContent.includes('Income')&&d.body.textContent.includes('Spent')&&d.body.textContent.includes('Budgets'),'Finance dashboard is not connected to finance data');
  const routes=['annual-dashboard','money-setup','log','calculator'];
  routes.forEach(route=>{w.location.hash=`/financial-planner/${route}`;w.dispatchEvent(new w.HashChangeEvent('hashchange'));assert(d.body.dataset.page.startsWith('finance'),'Finance route failed')});
}else{
  assert(d.body.textContent.includes('Ship standalone product'),'Task dashboard is not connected to task data');
  const formRoute=()=>{w.location.hash='/task-tracker/variable-tasks';w.dispatchEvent(new w.HashChangeEvent('hashchange'))};formRoute();
  const form=d.querySelector('#entry-form');form.elements.title.value='Test task flow';form.elements.due.value=date;form.elements.priority.value='Medium';form.elements.status.value='To do';form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
  assert(JSON.parse(w.localStorage.getItem('lp_tasks_variable')).some(x=>x.title==='Test task flow'),'Task create flow did not persist');
  ['recurring-rules','recurring-tasks','habit-tracker','daily-journal'].forEach(route=>{w.location.hash=`/task-tracker/${route}`;w.dispatchEvent(new w.HashChangeEvent('hashchange'));assert(['tasks-rules','tasks-recurring','habits','journal'].includes(d.body.dataset.page),'Task route failed')});
}

assert(w.LPStorage.KEYS.every(key=>product==='finance'?!key.startsWith('lp_tasks_')&&!['lp_habits','lp_journal'].includes(key):key!=='dl_finance'),'Backup includes unrelated product keys');
dom.window.close();
console.log(`${product==='finance'?'Finance':'Task'} Tracker test passed: isolated navigation, dashboard, routes, storage, and connected data flow.`);
