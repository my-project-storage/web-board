import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  loginValidator,
  registerValidator,
} from "../middlewares/validators.ts";
import { register } from "../services/auth.service.ts";

const router = new Router({ prefix: "/users" });

router.post("/login", loginValidator, async (ctx) => {
  const { email, password } = await (await ctx.request.body()).value;
  ctx.response.body = { success: true, message: `${email} 님 환영합니다` };
}).post("/register", registerValidator, register);

export default router;
