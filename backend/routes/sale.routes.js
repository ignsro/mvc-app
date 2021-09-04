const { Router } = require('express')

module.exports = function({ SaleController }){
    const router = Router();

    router.get('/', SaleController.getAll);

    return router;
}