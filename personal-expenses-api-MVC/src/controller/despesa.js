const DespesaModel = require('../model/despesa');

class Despesa {
    constructor(){   
    }

    getAll(){
        return DespesaModel.getAll()
        .map(u => ({
            ...u
        }));
    }

    getById(id){
        const despesa = DespesaModel.getById(id);

        return{
            ...despesa
        };
    }



    create(title, amount, category, date, description){

        if(title===null || category===null || description===null){
            throw new Error('O título, categoria e descrição não devem estar nulos');
        }

        if(!title || !amount ||  !category || !description){
            throw new Error('O título, gasto, categoria e descrição devem ser preenchidos');
        }
        
        if(amount <=0 || date <=0){
            throw new Error('O gasto e data devem ser maiores que zero');
        }

        const despesa = DespesaModel.create(title, amount, category, date, description);
        return{...despesa};
    }


    update(id,title, amount, category, date, description){

        if(title===null || category===null || description===null){
            throw new Error('O título, categoria e descrição não devem estar nulos');
        }

        if(!title || !amount ||  !category || !description){
            throw new Error('O título, gasto, categoria e descrição devem ser preenchidos');
        }

        if(amount <=0 || date <=0){
            throw new Error('O gasto e data devem ser maiores que zero');
        }

        const despesa = DespesaModel.update(id, title, amount, category, date, description);
        return{...despesa};
    }



    delete(id){
        return DespesaModel.delete(id);
    }

}

module.exports = new Despesa();