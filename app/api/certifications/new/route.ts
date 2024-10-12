import { auth } from "@/auth";
import conn from "@/utils/db";

export async function POST(request: Request) {
    const {name, description, cid, date,}:{name:string, description:string, cid: string, date:string} = await request.json();

    const sess = await auth();

        try{
            const result  = await conn?.query('INSERT INTO "Portfolio"."Certifications"(name, description, cid, date) VALUES($1, $2, $3, $4)', [name, description, cid, date])
    
            return new Response(JSON.stringify(result), {status: 200})
        }catch(err){
            console.error('Error inserting data:', err);
            return new Response(JSON.stringify({ message: "Invalid data" }), {status: 500})
        }
    
}

export async function DELETE(request: Request) {
    const {id}:{id:number} = await request.json();
    
    try{
        const result  = await conn?.query('DELETE FROM "Portfolio"."Certifications" where id=$1', [id])

        return new Response(JSON.stringify(result), {status: 200})
    }catch(err){
        console.error('Error deleting data:', err);
        return new Response(JSON.stringify({ message: "Invalid data" }), {status: 500})
    }
}