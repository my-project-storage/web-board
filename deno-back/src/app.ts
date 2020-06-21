import { Application, BodyType } from "https://deno.land/x/oak/mod.ts";
import modMiddleware from "./mod.ts";
import routerMiddleware from "./routers/intex.router.ts";
import db from "./configs/database.ts";

const app = new Application();
if (!db) console.log("database not connect");
else console.log("connected to database");
await modMiddleware(app);
await routerMiddleware(app);
// app.use(async (ctx) => {
// });
console.log("server is running on: http://localhost:3000");
await app.listen({ port: 3000 });
