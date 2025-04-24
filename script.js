// 🔎 Espera o DOM estar carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // ✅ 1. Anima elementos ao aparecerem na tela com IntersectionObserver
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Aplica a classe de animação quando entra na tela
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Não observar de novo
        }
      });
    }, {
      threshold: 0.2 // Aplica a animação quando 20% estiver visível
    });
  
    // Seleciona todos os elementos que queremos animar na rolagem
    document.querySelectorAll('.portfolio-item, .produto, .sobre, .contato').forEach(el => {
      observer.observe(el); // Observa esses elementos
    });
  
    // ✅ 2. Simula envio do formulário de contato
    const form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Evita recarregar a página
  
      // Feedback visual
      alert('Mensagem enviada com sucesso!');
  
      // Reseta os campos do formulário
      form.reset();
    });
  });
  