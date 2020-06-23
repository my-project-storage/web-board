import { Application } from "https://deno.land/x/oak/mod.ts";
import userRouter from "./user.ts";
import authRouter from "./auth.ts";
import customLogger from "../utils/customLogger.ts";

export default async (app: Application) => {
  app.use(userRouter.routes());
  app.use(authRouter.routes());
  app.use(userRouter.allowedMethods());
  app.use(authRouter.allowedMethods());
  customLogger.info("Router", "Router Loaded");
};
