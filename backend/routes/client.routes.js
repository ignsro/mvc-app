const { Router } = require('express') 

module.exports = function({ ClientController }){
    const router = Router();

    router.get('/', ClientController.getAll);
    router.get('/:id', ClientController.get)
    router.post('/', ClientController.create)
    router.put('/:id', ClientController.update)
    router.delete('/:id', ClientController.delete)
    
    return router;
}