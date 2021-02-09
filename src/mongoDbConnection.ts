import { Db, MongoClient } from "mongodb";

const mongoHost = process.env.MONGO_HOST || "localhost:27017";
const mongoDbName = process.env.MONGO_DB_NAME || "cuisine-a-donf";

export default async function initDb(): Promise<Db> {
  const client = new MongoClient(`mongodb://${mongoHost}`, {
    useUnifiedTopology: true,
  });
  await client.connect();

  return client.db(mongoDbName);
}
