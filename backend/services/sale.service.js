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
        const details = await Promise.all(data.details.map(async(detail) => {
            const product = await this.productRepository.get(detail.product_id);

            if (!product)
                throw new Error(`The product with id: ${detail.product_id} is not exists!`)

            if (!product.quantity > 0 || product.quantity < detail.quantity) {
                throw new Error(`This product ${product.name} is not avaliable`)
            }
            const subtotal = product.price * detail.quantity;
            product.quantity = product.quantity - detail.quantity;
            return ({ quantity: detail.quantity, product_id: detail.product_id, subtotal: subtotal, product: product })
        }))

        const subtotalSale = (details.length > 1 ? details.reduce((acc, el) => acc.subtotal + el.subtotal) : details[0].subtotal) - discount;
        const iva = subtotalSale * 0.19;
        const total = subtotalSale * 1.19;
        console.log(total)
        const sale = await this.respository.create({ iva: iva, discount: discount, total: total, client_id: client_id })
            .then((sale) => {
                details.forEach(async(detail) => {
                    detail.sale_id = sale.id;
                    await this.detailRepository.create(detail)
                    await this.productRepository.updateInstance(detail.product)
                })
                return sale
            })


        return sale
    }
}

module.exports = SaleService;