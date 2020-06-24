import { Router } from "https://deno.land/x/oak/mod.ts";
import auth from "../controllers/auth.controller.ts";

const router = new Router({ prefix: "/auth" });

router.post("/login", auth.login);

export default router;
