document.addEventListener('DOMContentLoaded', () => {
  const cartCount = document.getElementById('cart-count');
  const produtos = document.querySelectorAll('.produto');
  const carrinhoLista = document.getElementById('carrinho');
  const totalSpan = document.getElementById('total');
  let carrinho = [];

  produtos.forEach(produto => {
    produto.querySelector('.btn-comprar').addEventListener('click', () => {
      const name = produto.getAttribute('data-name');
      const price = parseFloat(produto.getAttribute('data-price'));
      carrinho.push({ name, price });

      atualizarCarrinho();
      alert(`${name} adicionado ao carrinho!`);
    });

    produto.addEventListener('click', (e) => {
      if (!e.target.classList.contains('btn-comprar')) {
        const name = produto.getAttribute('data-name');
        const desc = produto.getAttribute('data-desc');
        const price = produto.getAttribute('data-price');
        const imgSrc = produto.getAttribute('data-img');

        document.getElementById('modalProductImg').src = imgSrc;
        document.getElementById('modalProductName').textContent = name;
        document.getElementById('modalProductDesc').textContent = desc;
        document.getElementById('modalProductPrice').textContent = `Preço: R$ ${price},00`;

        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        modal.show();
      }
    });
  });

  function atualizarCarrinho() {
    carrinhoLista.innerHTML = '';
    let total = 0;

    carrinho.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
      carrinhoLista.appendChild(li);
      total += item.price;
    });

    cartCount.textContent = `Carrinho: ${carrinho.length}`;
    totalSpan.textContent = total.toFixed(2);
  }

  // Animações (se tiver essas classes no CSS)
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.portfolio-item, .produto, .sobre, .contato').forEach(el => {
    observer.observe(el);
  });

  // Menu Toggle - Atualizado para ocupar a tela toda
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.querySelector('.navbar ul');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Alterna uma classe no body ou html para bloquear scroll se desejar
    document.body.classList.toggle('menu-open');
  });
});
