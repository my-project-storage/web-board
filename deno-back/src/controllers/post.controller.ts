import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import errorRes from "../utils/errorRes.ts";
import db from "../configs/database/db.connection.ts";
import SQL from "../configs/database/db.sql.ts";

export default {
  /**
   * @description Add a new Post
   * @route POST /posts
   */
  create: async ({ request, response }: RouterContext) => {
    if (!request.hasBody) {
      response.status = 400;
      response.body = { success: false, message: "body is not exists" };
      return;
    }
    try {
      const values = (await request.body()).value;
      const insertId = (await db.execute(
        SQL.createPost,
        [request.headers.get("USER"), values.title, values.contents],
      ))
        .lastInsertId;
      if (!insertId) {
        response.status = 500;
        response.body = { success: false, message: "insert error" };
        return;
      }
      response.status = 201;
      response.body = {
        success: true,
        post: await db.query(SQL.getPostById, [insertId]),
      };
      return;
    } catch (err) {
      errorRes(response, err.message);
    }
  },

  /**
   * @description Get post list
   * @route GET /posts
   */
  getList: async ({ response }: RouterContext) => {
    try {
      const list = (await db.query(SQL.getPostList));
      response.status = 200;
      response.body = { success: true, list };
      return;
    } catch (err) {
      errorRes(response, err.message);
    }
  },

  /**
   * @description get post by id
   * @route GET /posts/:id
   */
  getPost: async ({ params, request, response }: RouterContext) => {
    try {
      const post = (await db.query(SQL.getPostById, [params.id]))[0];
      if (post) {
        let permission = (post.user_id === Number(request.headers.get("USER")))
          ? true
          : false;
        response.status = 200;
        response.body = { success: true, post, permission };
        return;
      }
      response.status = 404;
      response.body = { success: false };
      return;
    } catch (err) {
      errorRes(response, err.message);
    }
  },

  /**
   * @description modify post by id
   * @route PUT /posts/:id
   */
  modify: async ({ params, request, response }: RouterContext) => {
    if (!request.hasBody) {
      response.status = 400;
      response.body = { sucesss: false, message: "body is not exists" };
      return;
    }
    try {
      const post = (await db.query(SQL.getPostById, [params.id]))[0];
      if (!post) {
        response.status = 404;
        return;
      }
      if ((post.user_id !== Number(request.headers.get("USER")))) {
        response.status = 401;
        response.body = { success: false, message: "access denined" };
        return;
      }
      const values = (await request.body()).value;
      await db.execute(
        SQL.updatePostById,
        [values.title, values.contents, params.id],
      );
      response.status = 200;
      response.body = {
        success: true,
        post: await db.query(SQL.getPostById, [params.id]),
      };
      return;
    } catch (err) {
      errorRes(response, err.message);
    }
  },

  /**
   * @description Delete post by id
   * @route DELETE /posts/:id
   */
  delete: async ({ params, request, response }: RouterContext) => {
    try {
      const post = (await db.query(SQL.getPostById, [params.id]))[0];
      if (!post) {
        response.status = 404;
        return;
      }
      if (post.user_id !== Number(request.headers.get("USER"))) {
        response.status = 401;
        response.body = { success: false, message: "access denined" };
        return;
      }
      const result =
        (await db.execute(SQL.deletePostById, [params.id])).affectedRows! > 0
          ? true
          : false;
      if (!result) {
        response.status = 500;
        response.body = { success: result };
        return;
      }
      response.status = 200;
      response.body = { success: true };
      return;
    } catch (err) {
      errorRes(response, err.message);
    }
  },
};
