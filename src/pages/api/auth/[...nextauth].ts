import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {


                const res = await fetch( `${process.env.BACKEND_URL}/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {
                        "Content-Type": 'application/json'
                    },
                });

                console.log(res);

                return null;
            }
        }),
    ],
}

export default NextAuth(authOptions)
