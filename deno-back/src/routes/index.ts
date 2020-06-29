import { Application } from "https://deno.land/x/oak/mod.ts";
import userRouter from "./user.ts";
import authRouter from "./auth.ts";
import customLogger from "../utils/customLogger.ts";
import postRouter from "./post.ts";

export default async (app: Application) => {
  app.use(userRouter.routes());
  app.use(authRouter.routes());
  app.use(postRouter.routes());
  app.use(userRouter.allowedMethods());
  app.use(authRouter.allowedMethods());
  app.use(postRouter.allowedMethods());
  customLogger.info("Router", "Router Loaded");
};
