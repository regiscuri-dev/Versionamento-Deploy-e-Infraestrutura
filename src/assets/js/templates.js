// src/assets/js/templates.js
import { getCatalog, mountCartHandlers } from './storage.js';

const Home = () => `
  <section class="card">
    <h1>SPA • Templates • Validação • Acessibilidade</h1>
    <p>Projeto final com <strong>GitFlow</strong>, <strong>WCAG 2.1 AA</strong> e <strong>Deploy</strong> automatizado.</p>
    <ul>
      <li>Navegação por teclado e foco visível</li>
      <li>Alto contraste e modo escuro acessível</li>
      <li>Persistência de estado no <code>localStorage</code></li>
    </ul>
  </section>
`;

const Catalogo = () => {
  const itens = getCatalog();
  return `
    <section class="card">
      <h1>Catálogo (Fake API)</h1>
      <div class="grid cols-3" id="catalogGrid" role="list">
        ${itens.map(i => `
          <article class="card" role="listitem">
            <h3>${i.nome}</h3>
            <p>${i.desc}</p>
            <p><strong>R$ ${i.preco.toFixed(2)}</strong></p>
            <button class="btn" data-add="${i.id}">Adicionar</button>
          </article>
        `).join('')}
      </div>
    </section>
    <section class="card">
      <h2>Carrinho</h2>
      <div id="cart"></div>
    </section>
  `;
};

const Formulario = () => {
  setTimeout(()=>document.dispatchEvent(new CustomEvent('route:form')),0);
  return `
    <section class="card">
      <h1>Formulário Acessível com Verificação de Consistência</h1>
      <form id="signupForm" novalidate>
        <div class="row">
          <div class="field">
            <label for="nome">Nome completo</label>
            <input id="nome" name="nome" autocomplete="name" required minlength="3" />
            <div class="help" id="h-nome">Mínimo 3 caracteres.</div>
          </div>
          <div class="field">
            <label for="email">E-mail</label>
            <input id="email" name="email" type="email" autocomplete="email" required aria-describedby="h-email" />
            <div class="help" id="h-email">Informe um e-mail válido.</div>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label for="senha">Senha</label>
            <input id="senha" name="senha" type="password" minlength="6" required />
          </div>
          <div class="field">
            <label for="confirmSenha">Confirmar senha</label>
            <input id="confirmSenha" name="confirmSenha" type="password" minlength="6" required />
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label for="nascimento">Data de nascimento</label>
            <input id="nascimento" name="nascimento" type="date" required />
          </div>
          <div class="field">
            <label for="telefone">Telefone</label>
            <input id="telefone" name="telefone" type="tel" inputmode="numeric" pattern="\\d{10,11}" placeholder="Apenas números" required />
            <div class="help">Use 10–11 dígitos (DDD + número).</div>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label for="inicio">Período – Início</label>
            <input id="inicio" name="inicio" type="date" required />
          </div>
          <div class="field">
            <label for="fim">Período – Fim</label>
            <input id="fim" name="fim" type="date" required />
          </div>
        </div>
        <div class="field">
          <label for="plano">Plano</label>
          <select id="plano" name="plano" required>
            <option value="">Selecione…</option>
            <option>Start</option>
            <option>Pro</option>
            <option>Enterprise</option>
          </select>
        </div>
        <div class="field">
          <label>
            <input id="termos" name="termos" type="checkbox" required />
            Li e aceito os termos de uso.
          </label>
        </div>
        <div aria-live="polite" class="error" id="formErrors"></div>
        <button class="btn" type="submit">Enviar</button>
        <button class="btn ghost" type="button" id="salvarRascunho">Salvar rascunho</button>
        <span class="success" id="okMsg" role="status" aria-live="polite"></span>
      </form>
    </section>
  `;
};

const NotFound = () => `
  <section class="card">
    <h1>404</h1>
    <p>Página não encontrada. Use o menu acima.</p>
  </section>
`;

export const routes = {
  '#/home': { template: Home },
  '#/catalogo': { template: Catalogo, afterRender: () => mountCartHandlers() },
  '#/formulario': { template: Formulario },
  '#/404': { template: NotFound }
};
