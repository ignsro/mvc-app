const BaseRepository = require('./base.repository')
class SaleRepository extends BaseRepository {
    constructor({ Sale, Detail, Client, Product }){
        super(Sale)
        this.Sale = Sale
        this.Detail = Detail
        this.Client = Client
        this.Product = Product
    }

    async get(id){
        return this.Sale.findOne({
            where: { id: id },
            include: [
                this.Client,
                {
                    model: this.Detail,
                    include: {
                        model: this.Product
                    }
                }
            ]
        })
    }

    async getAll(){
        return this.Sale.findAll({
            include: [
                this.Client,
                {
                    model: this.Detail,
                    include: {
                        model: this.Product
                    }
                }
            ]
        })
    }

}

module.exports = SaleRepository;