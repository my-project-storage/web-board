export default {
  hostname: Deno.env.get("DB_HOST"),
  username: Deno.env.get("DB_USER"),
  db: "deno_board",
  poolSize: 3, // connection limit
  password: Deno.env.get("DB_PASSWORD"),
};
