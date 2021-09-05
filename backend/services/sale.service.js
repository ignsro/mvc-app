const BaseService = require('./base.service')
class SaleService extends BaseService {
    constructor({ SaleRepository, ProductRepository, DetailRepository }) {
        super(SaleRepository);
        this.respository = SaleRepository;
        this.productRepository = ProductRepository
        this.detailRepository = DetailRepository
    }

    async create(data) {

        const { discount, client_id } = data
        const details = await Promise.all(data.details.map(async (detail) => {
            console.log(detail)
            const product = await this.productRepository.get(detail.product_id);
            
            if (!product)
                throw new Error(`The product with id: ${detail.product_id} is not exists!`)

            if (!product.quantity > 0) {
                throw new Error(`This product ${product.name} is not avaliable`)
            }
            const subtotal = product.price * detail.quantity;
            console.log(subtotal)
            return ({ quantity: detail.quantity, product_id: detail.product_id, subtotal: subtotal })
        }))

        const total = details.reduce((acc, el) => acc.subtotal + el.subtotal)
        const iva = total * 1.19;
        const sale = await this.respository.create({ iva: iva, discount: discount, total: total, client_id: client_id  })

        details.forEach(async (detail) => {
            detail.sale_id = sale.id;
            this.detailRepository.create(detail)
        })

        return sale
    }
}

module.exports = SaleService;