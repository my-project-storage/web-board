import { Router } from "https://deno.land/x/oak/mod.ts";
import user from "../controllers/user.contoller.ts";
import auth from "../controllers/auth.controller.ts";
const router = new Router({ prefix: "/users" });

// todo: 유저를 인증할 수 있는 미들웨어(핸들러, 컨트롤러)가 필요함
router
  .get("/:id", auth.validateToken, user.profile)
  .put("/:id", auth.validateToken, user.modify)
  .post("/", user.register)
  .put("/password/:id", auth.validateToken, user.modifyPassword)
  .delete("/:id", auth.validateToken, user.withdraw);

export default router;
