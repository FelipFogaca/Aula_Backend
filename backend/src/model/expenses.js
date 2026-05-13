const sequelize = require('./db');
const Sequelize = require('sequelize');

const Expense = sequelize.define('Expense', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amount: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
});

class Expenses {

    constructor() { }

    async create(title, amount, category, date, description) {
        return Expense.create({ title, amount, category, date, description });
    }

    async getAll() {
        return Expense.findAll();
    }

    async getById(id) {
        return Expense.findByPk(id);
    }

    async update(id, title, amount, category, date, description) {
        return Expense.update({ title, amount, category, date, description }, { where: { id } });
    }

    async delete(id) {
        return Expense.destroy({ where: { id } });
    }
}

module.exports = new Expenses();