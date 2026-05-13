const Model = require('../model/expenses');

class Expenses {

    async create(title, amount, category, date, description) {
        // console.log(title, amount, category, date, description);
        if (!title || !amount || !category || !date || !description) {
            throw new Error('All fields are required');
        }
        return Model.create(title, amount, category, date, description);

        if (date > new Date()) {
            throw new Error('Date cannot be in the future');
        }
    }

    async getAll(category) {
        const expenses = await Model.getAll();
        if (category) {
            return expenses.filter(expense => expense.category.toLowerCase() === category.toLowerCase());
        }
        return expenses;
    }

    async summary(category) {
        const expenses = await this.getAll();
        const summary = expenses.reduce((acc, expense) => {
            if (!acc[expense.category]) {
                acc[expense.category] = 0;
            }
            acc[expense.category] += expense.amount;
            return acc;
        }, {});
        return category ? summary[category] : summary;
    }

    async getById(id) {
        const expense = await Model.getById(id);
        if (!expense) {
            throw new Error('Expense not found');
        }
        return expense;
    }

    async update(id, title, amount, category, date, description, createdAt) {
        if (!title || !amount || !category || !date || !description) {
            throw new Error('All fields are required');
        }
        return Model.update(id, title, amount, category, date, description, createdAt);

        if (date > new Date()) {
            throw new Error('Date cannot be in the future');
        }
    }

    async delete(id) {
        return Model.delete(id);
    }
}

module.exports = new Expenses();