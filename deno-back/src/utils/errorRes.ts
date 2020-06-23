import customLogger from "./customLogger.ts";

export default (response: any, msg: string) => {
  customLogger.error(msg);
  response.status = 400;
  response.body = { success: false, message: msg };
  return;
};
