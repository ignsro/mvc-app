const { Router } = require('express')

module.exports = function({ SaleController }){
    const router = Router();

    router.get('/', SaleController.getAll);
    router.get('/:id', SaleController.get)
    router.post('/', SaleController.create);

    return router;
}