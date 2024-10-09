import conn from "./db";

export default async function getRows(table: string){
    const info = await conn?.query('SELECT * FROM "Portfolio"."' + table + '";');

    if (info){
        return info.rows;
    }

    return null;
}