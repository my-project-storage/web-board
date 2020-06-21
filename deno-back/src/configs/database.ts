import { Client } from "https://deno.land/x/mysql/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

const client = await new Client().connect({
  hostname: Deno.env.get("DB_HOST"),
  username: Deno.env.get("DB_USER"),
  db: "test",
  password: Deno.env.get("DB_PASSWORD"),
});

await client.execute(`CREATE DATABASE IF NOT EXISTS deno_board;`);
await client.execute(`USE deno_board;`);

export default client;
