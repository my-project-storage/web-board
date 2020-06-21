import { Application } from "https://deno.land/x/oak/mod.ts";
import { organ } from "https://raw.githubusercontent.com/denjucks/organ/master/mod.ts";
const modMiddleware = async (app: Application): Promise<any> => {
  app.use(organ("dev", true));
  console.log("mod loaded");
};

export default modMiddleware;
