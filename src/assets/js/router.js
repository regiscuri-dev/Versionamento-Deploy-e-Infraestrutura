import { routes } from './templates.js';
import { initFormValidation } from './validation.js';
import { setupCatalog } from './storage.js';

const app = document.getElementById('app');

function safeRender(fn) {
  try { return fn(); } catch (e) {
    app.innerHTML = `<section class="card"><h2>Erro</h2><pre>${String(e)}</pre></section>`;
    console.error(e);
    return '';
  }
}

function render(path){
  const route = routes[path] ?? routes['#/home'] ?? routes['#/404'];
  app.setAttribute('aria-busy','true');
  app.innerHTML = safeRender(route.template);
  if(route.afterRender){ route.afterRender(); }
  app.setAttribute('aria-busy','false');
  app.focus();
}

function onRouteChange(){
  const path = location.hash || '#/home';
  render(path);
}

export function startRouter(){
  window.addEventListener('hashchange', onRouteChange);
  window.addEventListener('DOMContentLoaded', onRouteChange);
  onRouteChange();
  setupCatalog();
  document.addEventListener('route:form', initFormValidation);
}
