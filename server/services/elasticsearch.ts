import { Client } from "@elastic/elasticsearch";
import { SearchResponse, WriteResponseBase } from "@elastic/elasticsearch/lib/api/types";

export class ElasticsearchClient<Document> {
    client: Client
    index: string

    constructor(index_name: string, node_url: string = null) {
        this.client = new Client({ node: node_url || "http://localhost:9200" })
        this.index = index_name
    }

    createIndex = async () => {
        const result = await this.client.indices.exists({ index: this.index });
        if (!result) {
            this.client.indices.create({ index: this.index });
            console.debug(`Create index ${this.index}`);
        }
    }

    createElement = async (documentData: Document): Promise<WriteResponseBase> => {
        try {
            const result = await this.client.index({ index: this.index, document: documentData });
            return result
        } catch (error) {
            console.error(`Failed to create element for index, ${this.index}`);
            throw error
        }
    }

    getElement = async (_id: string): Promise<SearchResponse> => {
        try {
            const result = await this.client.search({
                index: this.index,
                query: { term: { _id } }
            })
            return result
        } catch (error) {
            console.error(`Failed to search element for index, ${this.index}`);
            throw error
        }
    }

    getElements = async (): Promise<SearchResponse> => {
        try {
            const result = await this.client.search({ index: this.index, query: { match_all: {} } });
            return result
        } catch (error) {
            console.error(`Failed to search element for index, ${this.index}`);
            throw error
        }
    }

    getQuerys = async (document: any): Promise<SearchResponse> => {
        try {
            const result = await this.client.search({ index: this.index, query: { term: document }});
            return result
        } catch (error) {
            console.error(`Failed to search element for index, ${this.index}`);
            throw error
        }
    }

    deleteElement = async (id: string): Promise<WriteResponseBase> => {
        try {
            const result = await this.client.delete({ index: this.index, id })
            return result
        } catch (error) {
            console.error(`Failed to search element for index, ${this.index}`);
            throw error
        }
    }
}
