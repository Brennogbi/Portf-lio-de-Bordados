// Script para ampliar imagem com modal
document.addEventListener("DOMContentLoaded", function () {
    const imagens = document.querySelectorAll('.zoom-img');
    const modal = document.getElementById('imagemModal');
    const modalImg = document.getElementById('imagemExpandida');
    const fechar = document.getElementById('fecharModal');
  
    imagens.forEach(img => {
      img.addEventListener('click', () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
      });
    });
  
    fechar.addEventListener('click', () => {
      modal.style.display = "none";
    });
  
    // Fecha modal clicando fora da imagem
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });
  