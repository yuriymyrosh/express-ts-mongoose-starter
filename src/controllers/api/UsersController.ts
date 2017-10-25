import {BaseController} from './BaseController';
import {User} from '../../models/User';


export class UsersController extends BaseController {

    protected schema = User;

    constructor () {
        super();
    }
}
