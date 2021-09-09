const { Router } = require('express')

module.exports = function({ SaleController }){
    const router = Router();

    router.get('/', SaleController.getAll);
    router.get('/:id', SaleController.get)
    router.post('/', SaleController.create);
    router.put('/:id', SaleController.update)
    router.delete('/:id', SaleController.delete)

    return router;
}