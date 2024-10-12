import { signIn } from "@/auth"

export async function POST(request: Request) {
    const {name, password}:{name:string, password:string} = await request.json();

    try {
        const response = await signIn('credentials',{
            name:name,
            password:password,
            redirect:false
        })

        if (response) {
            return new Response(JSON.stringify({ message: "Everything is correct!" }), {status:200});
        } 
    }catch (error) {
        console.error('Auth error:', error)
        return new Response(JSON.stringify({ message: "Invalid credentials" }), {status: 401})
    }
}