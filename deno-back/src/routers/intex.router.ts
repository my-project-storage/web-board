import { Application } from "https://deno.land/x/oak/mod.ts";
import authRouter from "./auth.router.ts";

const routerMiddleware = async (app: Application): Promise<any> => {
  app.use(authRouter.routes());
  app.use(authRouter.allowedMethods());
  console.log("router loaded");
};

export default routerMiddleware;
