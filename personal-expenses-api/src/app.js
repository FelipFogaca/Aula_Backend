const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// Caminho do arquivo JSON
const filePath = path.join(__dirname, 'data', 'expenses.json');

//Função para ler despesas do arquivo JSON trata erros caso o arquivo esteja vazio ou inválido

function readExpenses() {
    try {
        const data = fs.readFileSync(filePath);
        return data.length ? JSON.parse(data) : [];
    } catch (error) {
        return [];
    }
}

//Função para salvar despesas no arquivo JSON
function saveExpenses(expenses) {
    fs.writeFileSync(filePath, JSON.stringify(expenses, null, 2));
}

// Função para validar dados da despesa

function validateExpense(data, isUpdate = false) {
    const errors = [];

    // title obrigatório
    if (!isUpdate || data.title !== undefined) {
        if (!data.title || data.title.trim() === '') {
            errors.push('Title é obrigatório');
        }
    }

    // amount deve ser maior que 0
    if (!isUpdate || data.amount !== undefined) {
        if (data.amount === undefined || data.amount <= 0) {
            errors.push('Amount deve ser maior que zero');
        }
    }

    // date não pode ser futura
    if (!isUpdate || data.date !== undefined) {
        if (!data.date) {
            errors.push('Date é obrigatório');
        } else {
            const inputDate = new Date(data.date);
            const today = new Date();

            if (inputDate > today) {
                errors.push('Date não pode ser no futuro');
            }
        }
    }

    return errors;
}

//Gerar ID simples

function generateId() {
    return 'exp_' + Date.now();
}

//POST /expenses 
app.post('/expenses', (req, res) => {
    const errors = validateExpense(req.body);

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const expenses = readExpenses();

    const newExpense = {
        id: generateId(),
        title: req.body.title,
        amount: req.body.amount,
        category: req.body.category || 'Outros',
        date: req.body.date,
        description: req.body.description || '',
        createdAt: new Date()
    };

    expenses.push(newExpense);
    saveExpenses(expenses);

    res.status(201).json(newExpense);
});

//GET /expenses - Listar despesas (com filtros)
app.get('/expenses', (req, res) => {
    let expenses = readExpenses();

    const { category, date } = req.query;

    if (category) {
        expenses = expenses.filter(e => e.category === category);
    }

    if (date) {
        expenses = expenses.filter(e => e.date === date);
    }

    res.json(expenses);
});

//GET /expenses/:id - Buscar por ID
app.get('/expenses/:id', (req, res) => {
    const expenses = readExpenses();

    const expense = expenses.find(e => e.id === req.params.id);

    if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
    }

    res.json(expense);
});

// PUT /expenses/:id - Atualizar despesa

app.put('/expenses/:id', (req, res) => {
    const expenses = readExpenses();

    const index = expenses.findIndex(e => e.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: 'Expense not found' });
    }

    // validação parcial (update)
    const errors = validateExpense(req.body, true);

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Atualiza apenas campos enviados
    const updatedExpense = {
        ...expenses[index],
        ...req.body
    };

    expenses[index] = updatedExpense;
    saveExpenses(expenses);

    res.json(updatedExpense);
});

// DELETE /expenses/:id - Remover despesa

app.delete('/expenses/:id', (req, res) => {
    const expenses = readExpenses();

    const index = expenses.findIndex(e => e.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: 'Expense not found' });
    }

    const deleted = expenses.splice(index, 1);
    saveExpenses(expenses);

    res.json(deleted[0]);
});

//GET /expenses/summary/total

app.get('/expenses/summary/total', (req, res) => {
    const expenses = readExpenses();

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);

    res.json({ total });
});

// GET /expenses/summary/category
app.get('/expenses/summary/category', (req, res) => {
    const expenses = readExpenses();

    const summary = {};

    expenses.forEach(e => {
        if (!summary[e.category]) {
            summary[e.category] = 0;
        }
        summary[e.category] += e.amount;
    });

    res.json(summary);
});

//Middleware global de erro

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});