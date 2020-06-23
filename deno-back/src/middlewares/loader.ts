import { organ } from "https://raw.githubusercontent.com/denjucks/organ/master/mod.ts";
import Log from "../utils/customLogger.ts";
import db from "../configs/database/db.connection.ts";
// 라우팅 전
export default async (app: any) => {
  if (db) Log.info("DB", "DB Connected");
  else {
    Log.error("DB Error");
    throw new Error("DB Error");
  }
  app.use(organ("dev"));
  Log.info("Oak", "Oak Loaded");
};

// 라우팅 후
export const notFoundMiddleware = ({ response }: { response: any }) => {
  response.status = 404;
  response.body = {
    success: false,
    message: "404 - Not found.",
  };
  Log.error("Not Found");
};
