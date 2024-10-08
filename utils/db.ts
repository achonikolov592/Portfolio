import { Pool } from "pg";

let conn: Pool | null = null;

if (!conn) {
  conn = new Pool({
    user: process.env.NEXT_PUBLIC_PGSQL_USER,
    password: process.env.NEXT_PUBLIC_PGSQL_PASSWORD,
    host: process.env.NEXT_PUBLIC_PGSQL_HOST,
    port: parseInt(<string>process.env.NEXT_PUBLIC_PGSQL_PORT, 10) || 5432,
    database: process.env.NEXT_PUBLIC_PGSQL_DATABASE,
  });
}

export default conn ;