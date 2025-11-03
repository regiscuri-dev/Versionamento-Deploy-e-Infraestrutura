import { saveDraft, loadDraft, clearDraft } from './validation_draft.js';
const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
export function initFormValidation(){
  const form=document.getElementById('signupForm'); if(!form) return;
  const errorsEl=document.getElementById('formErrors'); const okMsg=document.getElementById('okMsg'); const draftBtn=document.getElementById('salvarRascunho');
  const draft=loadDraft(); if(draft){ Object.entries(draft).forEach(([k,v])=>{const el=form.elements.namedItem(k); if(el) el.value=v;});}
  function showErrors(msgs){ errorsEl.innerHTML=msgs.map(m=>`<div>• ${m}</div>`).join(''); }
  function validate(){
    const msgs=[]; const data=Object.fromEntries(new FormData(form).entries());
    if(!data.nome||data.nome.trim().length<3) msgs.push('Nome deve ter ao menos 3 caracteres.');
    if(!emailRegex.test(data.email||'')) msgs.push('E-mail inválido.');
    if(!data.senha||data.senha.length<6) msgs.push('Senha deve ter 6+ caracteres.');
    if(data.senha!==data.confirmSenha) msgs.push('Senha e confirmação não conferem.');
    if(!/^[0-9]{10,11}$/.test(data.telefone||'')) msgs.push('Telefone deve ter 10–11 dígitos (apenas números).');
    const hoje=new Date(); const nasc=data.nascimento? new Date(data.nascimento): null;
    if(!nasc||isNaN(nasc)) msgs.push('Data de nascimento é obrigatória.');
    if(nasc&&(hoje.getFullYear()-nasc.getFullYear()<18||(hoje.getFullYear()-nasc.getFullYear()===18&&(new Date(hoje.getFullYear(),nasc.getMonth(),nasc.getDate())>hoje)))) msgs.push('Você deve ter 18 anos ou mais.');
    const inicio=data.inicio? new Date(data.inicio): null; const fim=data.fim? new Date(data.fim): null;
    if(inicio&&fim&&inicio>fim) msgs.push('Período inválido: data inicial não pode ser maior que a final.');
    if(!data.plano) msgs.push('Selecione um plano.'); if(!form.termos.checked) msgs.push('Você deve aceitar os termos de uso.');
    return { ok: msgs.length===0, msgs, data };
  }
  form.addEventListener('submit', e=>{ e.preventDefault(); const {ok,msgs,data}=validate(); if(!ok){showErrors(msgs); okMsg.textContent=''; return;} clearDraft(); showErrors([]); okMsg.textContent='Formulário enviado com sucesso!'; console.log('Dados prontos para envio:', data); form.reset(); });
  draftBtn?.addEventListener('click', ()=>{ const {data}=validate(); saveDraft(data); okMsg.textContent='Rascunho salvo (local).'; });
  form.addEventListener('input', ()=>{ const {ok,msgs}=validate(); if(ok){showErrors([]);} else {showErrors(msgs);} });
}
