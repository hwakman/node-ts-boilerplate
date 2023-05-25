import { UserController } from "./User";

export const user = new UserController();

export class Controller {
    app: any

    constructor(application: any) {
        this.app = application
    }

    init() {
        this.app.use("/users", user.initController())
    }
}
