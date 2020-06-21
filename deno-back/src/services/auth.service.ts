import { Context, Response } from "https://deno.land/x/oak/mod.ts";
import db from "../configs/database.ts";
import { hash } from "https://deno.land/x/argon2/lib/mod.ts";
import { encode } from "https://deno.land/std/encoding/utf8.ts";
import { registeSQL } from "../configs/sql.ts";

/**
 * ? 로그인
 */
export const login = async (ctx: Context, next: any) => {
};

/**
 * ? 회원가입
 * todo: 비밀번호 암호화
 * ! return response
 */
export const register = async (ctx: Context) => {
  const { password, name, email } = (await ctx.request.body()).value;
  try {
    let salt = crypto.getRandomValues(new Uint8Array(20));
    let secret = encode(Deno.env.get("SUPER_SECRET"));

    const hashPassword = await hash(password, { salt, secret });
    const result = await db.query(registeSQL, [hashPassword, name, email]);

    ctx.response.status = 201;
    ctx.response.body = { success: true };
    return;
  } catch (registerErr) {
    ctx.response.status = 400;
    ctx.response.body = { success: false, message: registerErr.message };
    return;
  }
};
