const DespesaController = require('../controller/despesa');

class Despesa{
    constructor(){
    }

    getAll(req, res){
        const despesas = DespesaController.getAll();

        res.json(despesas);
    }

    getById(req, res){
        const id = Number(req.params.id);
        const despesa = DespesaController.getById(id);

        res.json(despesa);
    }

    create(req, res){
        const {title, amount, category, date, description} = req.body;
        
        if(!title || !amount || !category || !date || !description ){
            return res.status(400).json({error: 'título, quantia, categoria, data e descrição são obrigatórios' });
        }
        
        try{
            const newDespesa = DespesaController.create(title, Number(amount), category, date, description);
            res.status(201).json(newDespesa);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
    
    update(req, res) {
        const id = Number(req.params.id);
        const {title, amount, category, date, description} = req.body;

        try{ 
            const updateDespesa = DespesaController.update(id, title, amount, category, date, description);

            if(!updateDespesa){
                return res.status(404).json({error: 'Despesa não encontrado'});
            }

            res.json(updateDespesa);
        }catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    delete(req, res) {
        const id = Number(req.params.id);
        const result = DespesaController.delete(id);
        if (result === null){
            return res.status(404).json({error: 'Despesa não encontrada'})
        }
        
        res.status(204).send();
    }

}
module.exports = new Despesa(); 