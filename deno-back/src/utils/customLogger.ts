import * as Color from "https://deno.land/std@0.58.0/fmt/colors.ts";

export default {
  info: (title?: string, memo?: string) => {
    if (!title) title = "unknown";
    if (!memo) memo = "";
    console.log(
      `${Color.blue("[" + Color.bold("INFO") + "]")} ${Color.cyan(title)}: ${
        Color.bgCyan(Color.white(memo))
      }`,
    );
  },
  error: (memo?: string) => {
    if (!memo) memo = "error";
    console.error(
      `${Color.red("[" + Color.bold("ERROR") + "]")} ${
        Color.bgRed(Color.white(memo))
      }`,
    );
  },
};
