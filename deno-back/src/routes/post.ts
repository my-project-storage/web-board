import { Router } from "https://deno.land/x/oak/mod.ts";
import auth from "../controllers/auth.controller.ts";
import post from "../controllers/post.controller.ts";

const router = new Router({ prefix: "/posts" });

router
  .get("/", auth.validateToken, post.getList)
  .get("/:id", auth.validateToken, post.getPost)
  .post("/", auth.validateToken, post.create)
  .put("/:id", auth.validateToken, post.modify)
  .delete("/:id", auth.validateToken, post.delete);

export default router;
