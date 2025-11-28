import {neon} from "@neondatabase/serverless";
import "dotenv/config";
/// this is an sql client  function that is connected to the Neon database using the connection string stored in the environment variable DATABASE_URL
 export const sql = neon(process.env.DATABASE_URL);