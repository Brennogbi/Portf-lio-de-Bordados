document.addEventListener('DOMContentLoaded', function () {
  const produtos = document.querySelectorAll('.produto');
  const lojaGrid = document.querySelector('.loja-grid');
  const produtosPorPagina = 4;
  let paginaAtual = 1;
  const totalPaginas = Math.ceil(produtos.length / produtosPorPagina);

  function mostrarPagina(pagina) {
    const inicio = (pagina - 1) * produtosPorPagina;
    const fim = inicio + produtosPorPagina;

    produtos.forEach((produto, index) => {
      produto.style.display = (index >= inicio && index < fim) ? 'block' : 'none';
    });

    const botoes = document.querySelectorAll('.pagination button');
    botoes.forEach(btn => btn.classList.remove('active'));
    if (botoes[pagina - 1]) {
      botoes[pagina - 1].classList.add('active');
    }
  }

  function criarPaginacao() {
    const paginacao = document.createElement('div');
    paginacao.classList.add('pagination');

    for (let i = 1; i <= totalPaginas; i++) {
      const botao = document.createElement('button');
      botao.textContent = i;
      if (i === paginaAtual) botao.classList.add('active');
      botao.addEventListener('click', () => {
        paginaAtual = i;
        mostrarPagina(paginaAtual);
      });
      paginacao.appendChild(botao);
    }

    lojaGrid.parentElement.appendChild(paginacao);
  }

  mostrarPagina(paginaAtual);
  criarPaginacao();

  // Código existente para o modal
  const modal = new bootstrap.Modal(document.getElementById('productModal'));
  const modalImg = document.getElementById('modalProductImg');
  const modalName = document.getElementById('modalProductName');
  const modalDesc = document.getElementById('modalProductDesc');
  const modalPrice = document.getElementById('modalProductPrice');
  const freteResultado = document.getElementById('freteResultado');

  let precoProdutoAtual = 0;

  produtos.forEach(produto => {
    produto.addEventListener('click', () => {
      const nome = produto.dataset.name;
      const preco = produto.dataset.price;
      const desc = produto.dataset.desc;
      const imagem = produto.dataset.img;

      precoProdutoAtual = parseFloat(preco);

      modalImg.src = imagem;
      modalImg.alt = nome;
      modalName.textContent = nome;
      modalDesc.textContent = desc;
      modalPrice.textContent = `R$ ${precoProdutoAtual.toFixed(2)}`;
      freteResultado.textContent = "";

      modal.show();
    });
  });
});

function comprarAgora() {
  alert('Redirecionando para o pagamento (simulação)...');
}

function adicionarAoCarrinho() {
  alert('Produto adicionado ao carrinho (simulação).');
}

function calcularFrete() {
  const cep = document.getElementById('cepInput').value.trim();
  const freteResultado = document.getElementById('freteResultado');

  if (!cep.match(/^\d{5}-?\d{3}$/)) {
    freteResultado.textContent = "CEP inválido. Digite no formato 00000-000.";
    freteResultado.style.color = 'red';
    return;
  }

  const frete = 20.00;
  freteResultado.textContent = `Frete para ${cep}: R$ ${frete.toFixed(2)}`;
  freteResultado.style.color = 'green';
}
