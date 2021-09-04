const express = require("express")
class App {
    constructor({ config, router}){
        this.config = config;
        this.express = express().use(router)
    }

    start(){
        return new Promise(resolve => {
            this.express.listen(this.config.PORT, () => {
                console.log(`${this.config.APPLICATION_NAME} is running on port ${this.config.PORT}`)
            })
            resolve();
        })
    }
}

module.exports = App;