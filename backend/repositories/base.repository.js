class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async get(id) {
        return await this.model.findByPk(id);
    }

    async getAll() {
        return await this.model.findAll()
    }

    async create(entity) {
        return await this.model.create(entity);
    }

    async update(id, entity) {
        return await this.model.update(entity, { where: { id: id } })
    }

    async delete(id) {
        return await this.model.destroy({ where: { id: id } })
    }
}

module.exports = BaseRepository;