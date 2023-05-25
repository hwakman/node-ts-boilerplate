import { AppDataSource } from "../models";
import { Router, Request, Response } from "express";
import { EntityTarget, ObjectLiteral, Repository } from "typeorm";


export class BaseController {
    entity: any
    router: Router
    repository: Repository<ObjectLiteral>

    constructor(entity: any) {
        this.router = Router();
        this.entity = new entity;
        this.repository = AppDataSource.getRepository(entity);
    }

    Find = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.repository.find();
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    FindOne = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            const result = await this.repository.findOneBy({ id });
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    Create = async (req: Request, res: Response): Promise<void> => {
        console.debug(req.body);

        try {
            const result = await this.repository.save(req.body);
            res.status(201).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    Update = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            const entityResult = await this.repository.findOneBy({ id });
            const saveResult = await this.repository.save({ ...entityResult, ...req.body });
            res.status(200).send(saveResult);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    Delete = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            const entityResult = await this.repository.findOneBy({ id });
            const deleteResult = await this.repository.delete(entityResult)
            res.status(200).send(deleteResult);
        } catch (error) {
            res.status(404).send(error);
        }
    }

    initController = (): Router => {
        this.router.route("")
            .get(this.Find)
            .post(this.Create)

        this.router.route("/:id")
            .get(this.FindOne)
            .put(this.Update)
            .delete(this.Delete)

        return this.router;
    }
}
