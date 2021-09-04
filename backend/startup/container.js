import { createContainer, asClass, asFunction, asValue } from 'awilix'

//Config
import config from '../config';
import app from '.'


const container = createContainer();

container
    .register({
        app: asClass(app).singleton(),
        config: asValue(config).singleton(),
        
    })