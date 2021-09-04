const express = require("express")
const { Router } = require("express")
const cors = require("cors")
const helmet = require("helmet")
const { NotFoundMiddleware, ErrorMiddleware } = require("../middlewares")
require('express-async-errors')

module.exports  = function({ ClientRoutes, ProductRoutes, SaleRoutes }) {
    const router = Router();
    const apiRoutes = express.Router();

    apiRoutes
        .use(express.json())
        .use(cors())
        .use(helmet())

    apiRoutes.use("/client", ClientRoutes)
    apiRoutes.use("/product", ProductRoutes)
    apiRoutes.use("/sale", SaleRoutes)

    router.use("/v1/api", apiRoutes)

    router.use(NotFoundMiddleware);
    //router.use(ErrorMiddleware);

    return router
}