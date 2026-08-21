const $ = (id) => document.getElementById(id);
const set = (id, value) => { $(id).classList.toggle('on', value); $(id).querySelector('span').title = value ? 'Enabled' : 'Disabled'; };
async function refresh(){ const s=await chrome.runtime.sendMessage({action:'getState'}); $('blocked').textContent=s.blocked||0; set('shield',s.shield); set('cleanse',s.cleanse); set('aura',s.aura); }
$('shield').onclick=async()=>{await chrome.runtime.sendMessage({action:'toggleShield'});refresh()};
$('cleanse').onclick=async()=>{await chrome.runtime.sendMessage({action:'toggleCleanse'});refresh()};
$('aura').onclick=async()=>{await chrome.runtime.sendMessage({action:'toggleAura'});refresh()};
refresh();
