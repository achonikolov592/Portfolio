import { signOut } from "@/auth"

export async function GET() {
    const response = await signOut()

    if (response) {
        return new Response(JSON.stringify({ message: "Everything is correct" }), {status:200});
      } else {
        return new Response(JSON.stringify({ message: "Not authenticated before!" }), { status: 500 });
      }
    
    
}