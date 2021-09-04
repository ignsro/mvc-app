class BaseController {
    constructor(service){
        this.service = service
    }
    get = async (req, res) => {
        const { id } = req.params;
        const model = await this.service.get(id);
        return res.send(model);
    }

    getAll = async (req, res) => {
        const models = await this.service.getAll();
        return res.send(models);
    }

    create = async (req, res) => {
        const { body } = req;
        const createdModel = await this.service.create(body);
        return res.status(201).send(createdModel);
    }

    update = async (req, res) => {
        const { body, params: { id } } = reqM
        const updatedModel = await this.service.update(id, body);
        return res.send(updatedModel);
    }

    delete = async (req, res) => {
        const { id } = req.params;
        const deletedModel = await this.service.delete(id);
        return res.send(deletedModel);
    }
}

export default BaseController;