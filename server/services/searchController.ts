import { Router, Request, Response } from "express";
import { ElasticsearchClient } from "./elasticsearch";



export class SearchController<Document> {
    router: Router
    client: ElasticsearchClient<Document>

    constructor(index_name: string) {
        this.router = Router();
        this.client = new ElasticsearchClient<Document>(index_name);
        this.client.createIndex();
    }

    Find = async (req: Request, res: Response): Promise<void> => {
        try {
            const { hits } = await this.client.getElements();
            res.status(200).send(hits);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    FindOne = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            const { hits } = await this.client.getElement(id);
            res.status(200).send(hits);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    QueryGet = async (req: Request, res: Response): Promise<void> => {
        try {
            const { hits } = await this.client.getQuerys(req.query);
            res.status(200).send(hits);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    Create = async (req: Request, res: Response): Promise<void> => {
        const document: Document = req.body;
        console.info("Recieve document", document);

        try {
            const result = await this.client.createElement(document);
            res.status(201).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    Delete = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            const deleteResult = await this.client.deleteElement(id);
            res.status(200).send(deleteResult);
        } catch (error) {
            res.status(404).send(error);
        }
    }

    initController = (): Router => {
        this.router.get("/search", this.QueryGet)

        this.router.route("")
            .get(this.Find)
            .post(this.Create)

        this.router.route("/:id")
            .get(this.FindOne)
            .delete(this.Delete)


        return this.router;
    }
}
