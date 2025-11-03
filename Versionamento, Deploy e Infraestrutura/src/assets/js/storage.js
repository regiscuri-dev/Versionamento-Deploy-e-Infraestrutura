const CATALOG_KEY='app.catalog';const CART_KEY='app.cart';
export function getCatalog(){const exists=localStorage.getItem(CATALOG_KEY);if(exists){return JSON.parse(exists);}const seed=[{id:'p1',nome:'Teclado Mecânico',desc:'Switches táteis, RGB',preco:299.9},{id:'p2',nome:'Mouse Ergonômico',desc:'Alta precisão, 6 botões',preco:179.5},{id:'p3',nome:'Headset',desc:'Som estéreo, microfone',preco:239.0},{id:'p4',nome:'Suporte Notebook',desc:'Ajustável, alumínio',preco:119.9},{id:'p5',nome:'Webcam HD',desc:'1080p, auto foco',preco:199.0},{id:'p6',nome:'Hub USB-C',desc:'7 portas, PD',preco:149.9},];localStorage.setItem(CATALOG_KEY,JSON.stringify(seed));return seed;}
function getCart(){return JSON.parse(localStorage.getItem(CART_KEY)||'[]');}
function setCart(cart){localStorage.setItem(CART_KEY,JSON.stringify(cart));renderCart();}
export function setupCatalog(){getCatalog();}
export function mountCartHandlers(){const grid=document.getElementById('catalogGrid');grid?.addEventListener('click',e=>{const btn=e.target.closest('button[data-add]');if(!btn)return;const id=btn.getAttribute('data-add');const item=getCatalog().find(i=>i.id===id);const cart=getCart();const found=cart.find(i=>i.id===id);if(found){found.qtd+=1;}else{cart.push({id,nome:item.nome,preco:item.preco,qtd:1});}setCart(cart);});renderCart();}
function renderCart(){const el=document.getElementById('cart');if(!el)return;const cart=getCart();if(cart.length===0){el.innerHTML='<p class="help">Seu carrinho está vazio.</p>';return;}const total=cart.reduce((s,i)=>s+i.preco*i.qtd,0);el.innerHTML=`
<table>
  <thead><tr><th>Item</th><th>Qtd</th><th>Preço</th><th>Total</th><th></th></tr></thead>
  <tbody>
    ${cart.map(i=>`
      <tr>
        <td>${i.nome}</td>
        <td><input type="number" min="1" value="${i.qtd}" data-qtd="${i.id}" /></td>
        <td>R$ ${i.preco.toFixed(2)}</td>
        <td>R$ ${(i.preco*i.qtd).toFixed(2)}</td>
        <td><button class="btn small" data-rem="${i.id}">Remover</button></td>
      </tr>`).join('')}
  </tbody>
  <tfoot><tr><td colspan="3"><strong>Total</strong></td><td colspan="2"><strong>R$ ${total.toFixed(2)}</strong></td></tr></tfoot>
</table>`;el.addEventListener('input',e=>{const input=e.target.closest('input[data-qtd]');if(!input)return;const id=input.getAttribute('data-qtd');const item=getCart().find(i=>i.id===id);item.qtd=Math.max(1,parseInt(input.value||'1',10));setCart(getCart().map(x=>x.id===id?item:x));});el.addEventListener('click',e=>{const btn=e.target.closest('button[data-rem]');if(!btn)return;const id=btn.getAttribute('data-rem');setCart(getCart().filter(i=>i.id!==id));});}
