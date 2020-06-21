import { Context } from "https://deno.land/x/oak/mod.ts";
// import * as validator from "https://deno.land/x/validator/mod.ts";
// import validator from "https://deno.land/x/deno_validator/mod.ts";

export const loginValidator = async (ctx: Context, next: any) => {
  const body = await ctx.request.body();
  const { email, password } = body.value;
  if (!email || !password) {
    ctx.response.body = { success: false, message: "아이디 또는 비밀번호를 입력하세요" };
  } else {
    await next();
  }
};

export const registerValidator = async (ctx: Context, next: any) => {
  if (ctx.request.hasBody) {
    const body = await ctx.request.body();

    try {
      if (!body.value.password) {
        ctx.response.status = 400;
        ctx.response.body = { success: false, message: "비밀번호를 입력하세요" };
      } else if (!(body.value.name)) {
        ctx.response.status = 400;
        ctx.response.body = { success: false, message: "이름을 입력하세요" };
      } else if (!(body.value.email)) {
        ctx.response.status = 400;
        ctx.response.body = { success: false, message: "이메일을 입력하세요" };
      } else {
        await next();
      }
    } catch (err) {
      ctx.response.status = 400;
      ctx.response.body = { success: false, message: err.message };
    }
  }
};
