# Entrega IV — Versionamento, Acessibilidade e Deploy

**Aluno:** Régis Curi  
**Curso:** Front End  
**Instituição:** Universidade Cruzeiro do Sul

---

## 🎯 Objetivo
Consolidar o projeto em ambiente profissional com **GitFlow**, **WCAG 2.1 AA** e **deploy automatizado** via GitHub Pages.

## ⚙️ Tecnologias
- HTML5, CSS3, JavaScript (ES Modules)
- Git/GitHub (GitFlow, PRs, Issues, Releases)
- Build para produção (minificação de JS/CSS/HTML)
- Pipeline de deploy (GitHub Actions → Pages)

---

## 🧩 Estrutura
```
src/
  assets/
    css/styles.css
    img/favicon.svg
    js/
      router.js
      templates.js
      storage.js
      validation.js
      validation_draft.js
      theme.js
.github/
  workflows/deploy.yml
  ISSUE_TEMPLATE/bug_report.yml
  ISSUE_TEMPLATE/feature_request.yml
README.md
package.json
```
> A pasta `dist/` é gerada no build e publicada no Pages.

---

## ♿ Acessibilidade (WCAG 2.1 AA)
- **Teclado**: foco visível (`:focus-visible`), navegação por Tab, *skip link* para pular direto ao conteúdo.
- **Semântica**: `header[role=banner]`, `nav[aria-label]`, `main`, `footer[role=contentinfo]`.
- **Contraste**: tokens de cor com mínimo 4.5:1 (modo claro/escuro + **alto contraste** via botão ⛶).
- **Leitores de tela**: estados dinâmicos com `aria-live="polite"` e rótulos claros.
- **Formulário**: rótulos associados, ajuda, validação com mensagens e alerta agregada.

---

## 🛠️ Scripts (produção)
```bash
npm install
npm run build   # gera /dist com JS/CSS/HTML minificados
```
- `esbuild` → bundle + minify JS (gera `dist/assets/js/app.js`)
- `clean-css` → minifica CSS
- `html-minifier-terser` → minifica HTML
- Imagens: use formatos modernos quando possível (WebP/AVIF).

---

## 🌐 Deploy Automático (GitHub Pages)
1. Crie um repositório **público** no GitHub (ex.: `entrega-iv-a11y-deploy`).
2. Envie os arquivos **desta pasta** (inclusive `.github/workflows/deploy.yml`).
3. No GitHub: **Settings → Pages → Build and deployment → Source = GitHub Actions** (já configurado).
4. A cada **push na branch `main`**, a Action roda `npm run build` e publica a pasta `dist/`.

URL final: `https://<seu-usuario>.github.io/entrega-iv-a11y-deploy/`

---

## 🔀 GitFlow simplificado
1. Branch principal:
   ```bash
   git checkout -b main
   ```
2. Branch de feature:
   ```bash
   git checkout -b feature/a11y-contrast
   ```
3. **Commits semânticos** (Conventional Commits):
   - `feat: adiciona alto contraste`
   - `fix: corrige foco visível em botões`
   - `chore: configura action de deploy`
4. Abra **Pull Requests** para `main` (template incluso).
5. **Tag/Releases**:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
   No GitHub → Releases → *Draft a new release* usando a tag.

> Use **Issues** e **Milestones** para organizar o trabalho.

---

## ✅ Checklist da Entrega
- [x] Repositório público com histórico de commits organizado
- [x] GitFlow com branches de feature e PRs
- [x] WCAG 2.1 AA (foco visível, teclado, contraste, alto contraste, aria-live)
- [x] Build minificado (JS/CSS/HTML) e deploy automatizado
- [x] README profissional (este arquivo)

---

## 🚀 Como rodar localmente
- Dev: abra `src/index.html` no navegador
- Prod: `npm run build` → abra `dist/index.html`
