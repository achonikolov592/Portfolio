import { Pool } from "pg";

let conn: Pool | null = null;

if (!conn) {
  conn = new Pool({
    user: process.env.NEXT_PUBLIC_POSTGRES_USER,
    password: process.env.NEXT_PUBLIC_POSTGRES_PASSWORD,
    host: process.env.NEXT_PUBLIC_POSTGRES_HOST,
    port: parseInt(<string>process.env.NEXT_PUBLIC_POSTGRES_PORT, 10) || 5432,
    database: process.env.NEXT_PUBLIC_POSTGRES_DATABASE,
    ssl: true
  });
}

export default conn ;