const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');

const app = express();
app.use(cors());
app.use(express.json());

// Configure sua Access Token do Mercado Pago (modo produção ou sandbox)
mercadopago.configure({
  access_token: 'APP_USR-5284975810503316-050923-dfdc514aa27d20cb6b4687a71bc60b33-810017031'
});

app.post('/criar-preferencia', async (req, res) => {
  const { titulo, preco } = req.body;

  try {
    const preference = {
      items: [
        {
          title: titulo,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: parseFloat(preco)
        }
      ],
      back_urls: {
        success: 'https://seusite.com/sucesso',
        failure: 'https://seusite.com/erro',
        pending: 'https://seusite.com/pendente'
      },
      auto_return: 'approved'
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    res.status(500).json({ error: 'Erro ao criar preferência de pagamento' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
