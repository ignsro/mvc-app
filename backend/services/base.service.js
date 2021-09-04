const { NotFoundException } = require('../helpers')

class BaseService {
    constructor(respository){
        this.respository = respository;
    }

    async get(id){
        if (!id){
            const error = new Error();
            error.status = 400;
            error.message = "Id must be sent!";
            throw error;
        }

        const currentModel = await this.respository.get(id);
        if (!currentModel) 
            throw new NotFoundException("Model not found!", 404)

        return currentModel;
    }

    async getAll(){
        return await this.respository.getAll();
    }

    async create(model){
        return await this.respository.create(model)
    }

    async update(id, model) {
        return await this.respository.update(id, model)
    }
}

module.exports = BaseService;