class Despesa {
    constructor(){
        this.despesas = [];
        this.idCounter = 1;
    }

    getAll(){
        return this.despesas;
    }

    getById(id) {
        return this.despesas.find(u => u.id === id);
    }

    create(title, amount, category, date, description){
        const newDespesa = {
            id: this.idCounter++,
            title,
            amount,
            category, 
            date,
            description,
            createdAt: new Date()
        };
        this.despesas.push(newDespesa);

        return newDespesa;
    }

    update(id, title, amount, category, date, description){
        const index = this.despesas.findIndex( u => u.id === id);

        if (index === -1){
            return null;
        };

        this.despesas[index] = {
            ...this.despesas[index],
            title,
            amount,
            category,
            date,
            description
        };

        return this.despesas[index];
    }

    delete(id){
        const index = this.despesas.findIndex(u => u.id === id); // 1
        
        if (index === -1) {
            return null;
        };

        this.despesas.splice(index, 1);

        return null;
    }
}

module.exports = new Despesa();