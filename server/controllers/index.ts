import { UserController } from "./User";
import { PostController } from "./Post"

export const user = new UserController();
export const post = new PostController();

export class Controller {
    app: any

    constructor(application: any) {
        this.app = application
    }

    init() {
        this.app.use("/users", user.initController())
        this.app.use("/posts", post.initController())
    }
}
