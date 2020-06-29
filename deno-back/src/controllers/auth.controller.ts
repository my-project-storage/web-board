import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";
import db from "../configs/database/db.connection.ts";
import SQL from "../configs/database/db.sql.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import errorRes from "../utils/errorRes.ts";

export default {
  getRefreshToken: () => {},

  /**
   * @description try valid token
   */
  validateToken: async (
    { params, request, response }: RouterContext,
    next: any,
  ) => {
    const headers: Headers = request.headers;
    const authorization = headers.get("Authorization");
    if (!authorization) {
      response.status = 401;
      response.body = { message: "Authorization is not in header" };
      return;
    }
    const jwt = authorization.split(" ")[1];
    if (!jwt) {
      response.status = 401;
      response.body = { message: "jwt is not in header" };
      return;
    }
    const key = Deno.env.get("JWT_SECRET")! as string;
    const user = await validateJwt(jwt, key, { isThrowing: false });
    if (user) {
      request.headers.set("USER", `${user.payload!.userId}`);
      await next();
      return;
    }
    response.status = 401;
    response.body = { message: "Invalid jwt token" };
  },

  /**
     * @description try login
     * @route POST /auth/login
     * @body {email, password}
     */
  login: async ({ request, response }: RouterContext, next: any) => {
    if (!request.hasBody) {
      response.status = 400;
      response.body = { success: false, message: "body is not exists" };
      return;
    }
    try {
      const values = (await request.body()).value;
      const row = (await db.query(SQL.getUserByEmail, [values.email]));
      if (
        row.length !== 0 &&
        await bcrypt.compare(values.password, row[0].password)
      ) {
        const key = Deno.env.get("JWT_SECRET")! as string;
        const payload: Payload = {
          userId: row[0].id,
          userEmail: row[0].email,
          userName: row[0].name,
          iss: "bbaktaeho.com",
          // exp: setExpiration(new Date().getTime() + 60000),
        };
        const header: Jose = {
          alg: "HS256",
          typ: "JWT",
        };
        const user = row[0];
        delete user.password;
        const accessToken = makeJwt({ key, header, payload });
        response.status = 200;
        response.body = { success: true, user, accessToken };
        return;
      }
      response.status = 400;
      response.body = {
        success: false,
        message: "check your email or password",
      };
    } catch (err) {
      errorRes(response, err.message);
    }
  },
};
