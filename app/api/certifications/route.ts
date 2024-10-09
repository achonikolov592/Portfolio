import conn from "@/utils/db";

export async function GET(request: Request) {
    const info = await conn?.query('SELECT * FROM "Portfolio"."Certifications";');

    const rowsOfResponse = info?.rows

    if (rowsOfResponse){
        return new Response(JSON.stringify(rowsOfResponse),{status:200})
    }

    return new Response("Failed",{status:500})
    
}