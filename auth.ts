import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import conn from "./utils/db"
import { signInSchema } from "./utils/zod"
import bcrypt from 'bcryptjs';
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
      Credentials({
        credentials: {
          name: {},
          password: {},
        },
        authorize: async (credentials) => {
          let user = null;

          const { name, password } = await signInSchema.parseAsync(credentials);

          user = await conn?.query('SELECT * FROM "Portfolio"."Admins" where name=$1', [name]);
          const username = user?.rows[0].name;
          const userPassword = user?.rows[0].password;
   
          if (user) {
            let isPasswordCorrect = await bcrypt.compare(password,userPassword)
            if (isPasswordCorrect){
                return {
                    name:username, 
                    password:password
                }
            }

            throw new Error("Invalid password!")
          }
          
          throw new Error("User not found!")
        },
      }),
    ],
  })