const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');

const app = express();
app.use(cors());
app.use(express.json());

mercadopago.configure({
  access_token: 'SUA_ACCESS_TOKEN'
});

app.post('/criar-preferencia', async (req, res) => {
  try {
    const preference = {
      items: [
        {
          title: 'Produto 1',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: 59.9
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
    res.status(500).json({ error: 'Erro ao criar preferência' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});