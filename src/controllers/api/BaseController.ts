import * as mongoose from 'mongoose';
import {Model, ValidationError} from 'mongoose';
import {Config} from '../../configs/local';

export class BaseController {

    protected schema: Model<any>;

    constructor() {
        mongoose.connect(Config.MONGO_URL, {useMongoClient: true});
    }

    public index(request, response) {
        this.schema.find().then(data => {
            this.sendResponse(response, data);
        }).catch(err => {
            console.log(err);
        });
    }

    public show(request, response) {
        if (request.params.id) {
            this.schema.findById(request.params.id).then(data => {
                this.sendResponse(response, data);
            }).catch(err => console.log(err));
        }
    }

    public store(request, response) {
        this.schema.create(request.body).then(data => {
            this.sendResponse(response, data);
        }).catch((validationError) => this.catchErrors(validationError, response));
    }

    public update(request, response) {
        if (request.params.id) {
            this.schema.findByIdAndUpdate(request.params.id, request.body, {new: true}).then(data => {
                this.sendResponse(response, data);
            }).catch((validationError) => this.catchErrors(validationError, response));
        }
    }

    public delete(request, response) {
        this.schema.findByIdAndRemove(request.params.id).then(data => {
            this.sendResponse(response, null);
        }).catch(err => console.log(err));
    }

    private catchErrors(validationError: ValidationError, response) {
        const errorMessages = [];
        for (var errName in validationError.errors) {
            errorMessages.push(validationError.errors[errName].message)
        }
        response.status(422).send({
            success: false,
            errors: errorMessages,
        });
    }

    private sendResponse(response, data) {
        response.send({
            'success': true,
            'data': data,
        });
    }
}
