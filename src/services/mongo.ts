"use server";

import { MongoClient, ObjectId } from "mongodb";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

export async function connectDatabase() {
    if (!client) {
        const dbConnectionString = process.env.PUBLIC_DB_CONNECTION;
        if (!dbConnectionString) {
            throw new Error('Database connection string is not defined');
        }
        client = new MongoClient(dbConnectionString);
        clientPromise = client.connect();
    }
    return clientPromise;
}

// export async function connectDatabase() {
//     const dbConnection: any = process.env.PUBLIC_DB_CONNECTION;
//     return await MongoClient.connect(dbConnection);
// }

export async function insertDocument(client: any, collection: string, document: object) {
    const db = client.db('db01');
    const result = await db.collection(collection).insertOne(document);
    return result;
}

export async function getAllDocuments(client: any, collection: string) {
    const db = client.db('db01');
    const documents = await db.collection(collection).find().toArray();
    return documents;
}

export async function updateDocument(client: any, collection: string, id: string, document: object) {
    const db = client.db('db01');
    const result = await db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: document });
    return result;
}

export async function deleteDocument(client: any, collection: string, id: string) {
    const db = client.db('db01');
    const result = await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
    return result;
}
