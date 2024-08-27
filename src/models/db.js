const {MongoClient, ObjectId} = require('mongodb');

let singleton;

async function connect(){
    if (singleton) return singleton;
    const client = new MongoClient(process.env.DB_HOST);
    await client.connect();

    singleton = client.db(process.env.DB_DATABASE);
    return singleton;
}

async function findAll (collection){
    const db = await connect();
    return await db.collection(collection).find({}).toArray();
}

async function insertOne (collection, data){
    const db = await connect();
    const existingData = await db.collection(collection).findOne(data);
    if (existingData) {
        console.log("Data already exists in the database");
        return {error: "Já existe um registro com esses dados"};
    }
    const inserted = await db.collection(collection).insertOne(data);
    console.log(inserted);
    return inserted;
}

async function findOne (collection, data){
    const db = await connect();
    return await db.collection(collection).findOne(data);
}

async function deleteOne (collection, data){
    const db = await connect();
    return await db.collection(collection).deleteOne(data);
}

async function entrar(collection, data){
    const db = await connect();
    const sala = await db.collection(collection).findOne(data.salaId);
    if (!sala.membros.includes(data.nick)) {
        sala.membros.push(data.nick);
    }
    await db.collection(collection).updateOne({ _id: data.salaId }, { $set: { membros: sala.membros } });
    return sala;
}

module.exports = {findAll, insertOne, findOne, deleteOne, entrar};