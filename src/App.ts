import * as express from 'express';
import * as bodyParser from 'body-parser';
import {HomeController} from './controllers/api/HomeController';
import {UsersController} from './controllers/api/UsersController';

class App {
    public express

    constructor() {
        this.express = express()
        // parse application/x-www-form-urlencoded
        this.express.use(bodyParser.urlencoded({extended: false}))
        // parse application/json
        this.express.use(bodyParser.json())
        this.mountRoutes()
    }

    private mountRoutes(): void {
        const apiRouter = express.Router()
        const usersController = new UsersController();
        const homeController = new HomeController();

        apiRouter.get('/', homeController.index.bind(homeController));
        apiRouter.get('/users', usersController.index.bind(usersController));
        apiRouter.get('/users/:id', usersController.show.bind(usersController));
        apiRouter.post('/users', usersController.store.bind(usersController));
        apiRouter.put('/users/:id', usersController.update.bind(usersController));
        apiRouter.delete('/users/:id', usersController.delete.bind(usersController));

        this.express.use('/api', apiRouter)
    }
}

export default new App().express
