import conn from "@/utils/db";

export async function POST(request: Request) {
    const {name, cid}:{name:string, cid: string} = await request.json();
    
    try{
        const result  = await conn?.query('INSERT INTO "Portfolio"."Languages"(name, cid) VALUES($1, $2)', [name, cid])

        return new Response(JSON.stringify(result), {status: 200})
    }catch(err){
        console.error('Error inserting data:', err);
        return new Response("Failed", {status: 500})
    }
}

export async function DELETE(request: Request) {
    const {id}:{id:number} = await request.json();
    
    try{
        const result  = await conn?.query('DELETE FROM "Portfolio"."Languages" where id=$1', [id])

        return new Response(JSON.stringify(result), {status: 200})
    }catch(err){
        console.error('Error deleting data:', err);
        return new Response("Failed", {status: 500})
    }
}