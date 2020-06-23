import "https://deno.land/x/dotenv/load.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";
import Log from "./utils/customLogger.ts";
import Loader, { notFoundMiddleware } from "./middlewares/loader.ts";
import router from "./routes/index.ts";

const app = new Application();
const port = Number(Deno.env.get("PORT")) || 3000;
await Loader(app);
// routers
await router(app);
// not found
app.use(notFoundMiddleware);

Log.info("StarT Server", `Listening on: ${port}`);
await app.listen({ port });
