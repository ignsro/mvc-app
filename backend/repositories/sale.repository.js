const BaseRepository = require('./base.repository')

class SaleRepository extends BaseRepository {
    constructor({ Sale, Detail }){
        super(Sale)
        this.Sale = Sale
        this.Detail = Detail
    }

    async get(id){
        return this.Sale.findOne({
            where: { id: id },
            include: this.Detail
        })
    }
}

module.exports = SaleRepository;