import { auth } from "@/auth"

export async function GET() {
  try {
    const session = await auth()
    return new Response(JSON.stringify({session:session}), {status: 200})
  } catch (error) {
    console.error('Auth error:', error)
    return new Response("Failed", {status: 500})
  }
}