
import { User } from "../models";
import { BaseController } from "../services";

export class UserController extends BaseController {
    constructor() {
        super(User);
    }
}
