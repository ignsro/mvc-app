const { Router } = require('express')

module.exports = function({ ProductController }) {
    const router = Router();

    router.get('/', ProductController.getAll)

    return router;
}