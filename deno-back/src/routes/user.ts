import { Router } from "https://deno.land/x/oak/mod.ts";
import user from "../controllers/user.contoller.ts";

const router = new Router({ prefix: "/users" });

// todo: 유저를 인증할 수 있는 미들웨어(핸들러, 컨트롤러)가 필요함
router
  .get("/:id", user.profile)
  .put("/:id", user.modify)
  .post("/", user.register)
  .put("/password/:id", user.modifyPassword)
  .delete("/:id", user.withdraw);

export default router;
