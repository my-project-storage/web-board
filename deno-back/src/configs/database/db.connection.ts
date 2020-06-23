import { Client } from "https://deno.land/x/mysql/mod.ts";
import config from "./db.config.ts";

const client = await new Client().connect(config);
await client.execute(`CREATE DATABASE IF NOT EXISTS deno_board;`);
await client.execute(`USE deno_board;`);

export default client;
