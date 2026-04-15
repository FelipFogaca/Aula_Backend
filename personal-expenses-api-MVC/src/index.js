const express = require('express');
const Despesa = require('./view/despesa');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/despesas', Despesa.getAll);
app.get('/despesas/:id', Despesa.getById);
app.post('/despesas', Despesa.create);
app.put('/despesas/:id', Despesa.update);
app.delete('/despesas/:id', Despesa.delete);

app.listen(3000, () => {
    console.info(`Servidor rodando na porta ${3000}`);
})