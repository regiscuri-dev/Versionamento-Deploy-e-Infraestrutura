const DRAFT_KEY='app.formDraft';
export function saveDraft(data){ localStorage.setItem(DRAFT_KEY, JSON.stringify(data)); }
export function loadDraft(){ try{ return JSON.parse(localStorage.getItem(DRAFT_KEY)||'null'); }catch{return null;} }
export function clearDraft(){ localStorage.removeItem(DRAFT_KEY); }
