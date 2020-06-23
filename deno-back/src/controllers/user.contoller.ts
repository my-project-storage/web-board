import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import db from "../configs/database/db.connection.ts";
import SQL from "../configs/database/db.sql.ts";
import errorRes from "../utils/errorRes.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

export default {
  /**
   * @description Get my profile by id
   * @route GET /users/:id
   */
  profile: async ({ params, response }: RouterContext) => {
    try {
      const result = await db.query(SQL.getUserById, [params.id]);
      if (!result) {
        response.status = 404;
        response.body = { success: false, message: "not exists" };
      } else {
        response.status = 200;
        response.body = { success: true, user: result[0] };
      }
    } catch (err) {
      errorRes(response, err.message);
    }
  },

  /**
   * @description Update my profile by id
   * @route PUT /users/:id
   */
  modify: async ({ params, request, response }: RouterContext) => {
    if (!request.hasBody) {
      response.status = 400;
      response.body = { success: false, message: "body is not exists" };
      return;
    }
    try {
      const values = (await request.body()).value;
      await db.execute(
        SQL.updateUserById,
        [values.email, values.name, params.id],
      );
      response.status = 200;
      response.body = {
        success: true,
        user: await db.query(SQL.getUserById, [params.id]),
      };
    } catch (err) {
      errorRes(response, err.message);
    }
  },

  /**
   * @description Update my password by id
   * @route PUT /users/password/:id
   */
  modifyPassword: async ({ params, request, response }: RouterContext) => {
    if (!request.hasBody) {
      response.status = 400;
      response.body = { success: false, message: "body is not exists" };
      return;
    }
    try {
      const values = (await request.body()).value;
    } catch (err) {
      errorRes(response, err.message);
    }
  },

  /**
   * @description Add a new user
   * @route POST /users
   */
  register: async ({ request, response }: RouterContext) => {
    // todo: 409 에러 추가하기
    if (!request.hasBody) {
      response.status = 400;
      response.body = { success: false, message: "body is not exists" };
      return;
    }
    try {
      const values = (await request.body()).value;
      const salt = bcrypt.genSaltSync(10);
      const hashPw = bcrypt.hashSync(values.password, salt);
      const insertId = (await db.execute(
        SQL.createUser,
        [values.email, values.name, hashPw],
      )).lastInsertId;
      if (!insertId) {
        response.status = 500;
        response.body = { success: false, message: "insert error" };
        return;
      }
      response.status = 201;
      response.body = {
        success: true,
        user: (await db.query(SQL.getUserById, [insertId])),
      };
    } catch (err) {
      errorRes(response, err.message);
    }
  },

  /**
   * @description Delete user by id
   * @route DELETE /user/:id
   */
  withdraw: async () => {},
};
