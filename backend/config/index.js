if (process.env.NOVE_ENV !== 'production') {
    require('dotenv').config();
}

const config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    APPLICATION_NAME: process.env.APPLICATION_NAME
}

export default config;