const { Router } = require('express')

module.exports = function({ ProductController }) {
    const router = Router();

    router.get('/', ProductController.getAll)
    router.get('/:id', ProductController.get)
    router.post('/', ProductController.create)

    return router;
}