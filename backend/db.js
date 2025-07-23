import { Pool } from "pg";

export function getDbPool() {
  return new Pool({
    user: "postgres",
    host: "localhost",
    database: "pern_auth",
    password: "sanmateo",
    port: 5432,
  });
}
