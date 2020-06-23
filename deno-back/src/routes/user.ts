import { Router } from "https://deno.land/x/oak/mod.ts";
import user from "../controllers/user.contoller.ts";

const router = new Router({ prefix: "/users" });

router.get("/:id", user.profile);

export default router;
