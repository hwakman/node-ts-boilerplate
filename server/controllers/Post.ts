
import { SearchController } from "../services";

interface PostDocument {
    title: string,
    author: string,
    content: string
}

export class PostController extends SearchController<PostDocument> {
    constructor() {
        super("post");
    }
}
