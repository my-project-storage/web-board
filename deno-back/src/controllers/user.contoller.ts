import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import db from "../configs/database/db.connection.ts";
import SQL from "../configs/database/db.sql.ts";
import Log from "../utils/customLogger.ts";
export default {
  profile: async ({ params, response }: RouterContext) => {
    try {
      const result = await db.execute(SQL.getUserById, [params.id]);
      if (!result.rows) {
        response.status = 404;
        response.body = { success: false, message: "not exists" };
      } else {
        response.status = 404;
        response.body = { success: false, user: result.rows[0] };
      }
    } catch (err) {
      Log.error(err.message);
    }
  },
};
