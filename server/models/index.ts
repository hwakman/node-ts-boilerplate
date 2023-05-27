import "reflect-metadata"
import { User } from "./User";
import { DataSource } from "typeorm";

export { User };

const entities = [User];
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "example",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities,
})
