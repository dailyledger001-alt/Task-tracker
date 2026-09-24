(function(){
  'use strict';
  const product=document.body.dataset.product==='tasks'?'tasks':'finance';
  const shared=['lp_settings','lp_app_started_at','lp_app_start_version'];
  const KEYS=shared.concat(product==='finance'?['dl_finance','lp_finance_log','lp_finance_budgets','lp_finance_savings_debt']:['lp_tasks_variable','lp_tasks_recurring_rules','lp_tasks_recurring_instances','lp_habits','lp_journal']);
  function getItem(key,fallback){try{const raw=localStorage.getItem(key);return raw===null?(fallback===undefined?null:fallback):JSON.parse(raw)}catch(error){console.warn('Life Planner could not read '+key,error);return fallback===undefined?null:fallback}}
  function setItem(key,value){try{localStorage.setItem(key,JSON.stringify(value));return value}catch(error){console.error('Life Planner could not save '+key,error);throw error}}
  function exportAllData(){const data={version:1,exportedAt:new Date().toISOString(),data:{}};KEYS.forEach(k=>{const v=getItem(k,null);if(v!==null)data.data[k]=v});return JSON.stringify(data,null,2)}
  function importAllData(payload){const parsed=typeof payload==='string'?JSON.parse(payload):payload;if(!parsed||typeof parsed!=='object'||!parsed.data)throw new Error('This is not a valid tracker backup.');Object.keys(parsed.data).forEach(k=>{if(KEYS.includes(k))setItem(k,parsed.data[k])});return true}
  window.LPStorage={KEYS,getItem,setItem,exportAllData,importAllData};
})();
