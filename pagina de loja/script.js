// Abre o modal com as informações do produto clicado
function abrirModal(botao) {
  const produto = botao.closest('.produto');
  const titulo = produto.querySelector('h3').textContent;
  const preco = produto.querySelector('.preco').textContent;
  const imgSrc = produto.querySelector('img').getAttribute('src');

  document.getElementById('modal-img').src = imgSrc;
  document.getElementById('modal-titulo').textContent = titulo;
  document.getElementById('modal-preco').textContent = `R$ ${preco}`;

  // Salva para usar no pagamento
  localStorage.setItem('titulo', titulo);
  localStorage.setItem('preco', preco);

  document.getElementById('modal').style.display = 'flex';
}

// Fecha o modal
function fecharModal() {
  document.getElementById('modal').style.display = 'none';
}

// Chama o backend para criar a preferência de pagamento
function pagar() {
  const titulo = localStorage.getItem('titulo');
  const preco = parseFloat(localStorage.getItem('preco'));

  fetch('http://localhost:3000/criar-preferencia', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      titulo: titulo,
      preco: preco,
    }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.id) {
        const mp = new MercadoPago('APP_USR-5d2d7ac3-3855-48a9-a8fb-e3fb4d047bc7', {
          locale: 'pt-BR',
        });

        mp.checkout({
          preference: {
            id: data.id,
          },
          autoOpen: true,
        });
      } else {
        alert('Erro ao criar preferência de pagamento');
      }
    })
    .catch(error => {
      console.error('Erro ao pagar:', error);
      alert('Erro na comunicação com o servidor');
    });
}
