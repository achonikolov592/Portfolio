import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

const { auth } = NextAuth(authConfig);


export const config = {
    matcher: ['/(api(?!/auth/signIn|/auth/getSess|/language$|/certifications$).*)']
}

export default auth((req) => {
	const { nextUrl } = req;

	const isAuthenticated = !!req.auth;
	
    if (!isAuthenticated){
        return new Response("Unauthenticated", {status:401})
    }
});