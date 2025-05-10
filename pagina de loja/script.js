const mp = new MercadoPago('SUA_PUBLIC_KEY', {
  locale: 'pt-BR'
});

function pagar() {
  fetch('http://localhost:3000/criar-preferencia', {
    method: 'POST'
  })
  .then(response => response.json())
  .then(data => {
    mp.checkout({
      preference: {
        id: data.id
      },
      autoOpen: true,
    });
  })
  .catch(error => console.error('Erro ao iniciar pagamento:', error));
}

function abrirModal(titulo, preco, imagem) {
  document.getElementById('modal-titulo').innerText = titulo;
  document.getElementById('modal-preco').innerText = preco;
  document.getElementById('modal-img').src = imagem;

  document.getElementById('productModal').style.display = 'flex';
}

function fecharModal() {
  document.getElementById('productModal').style.display = 'none';
}