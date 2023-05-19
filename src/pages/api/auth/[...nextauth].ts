import NextAuth, {User} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';
import {JWT} from "next-auth/jwt";

type UserDetailResponse = {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
}

type AuthResponse = {
    accessToken: string,
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req): Promise<User|null> {
                return await performAuthRequest(JSON.stringify(credentials));
            },
        }),
    ],
    callbacks: {
        async jwt({token, user}: {token: JWT, user?: User}) {
            if (user) {
                token.id = user.id;
                token.accessToken = user.accessToken;
            }

            return token
        },
    },
    session: {
        // 4 hours in seconds - to align this with backend JWT expiration
        maxAge: 60 * 60 * 4,
    },
    pages: {
        signIn: '/auth/login',
    },
}

export default NextAuth(authOptions);

const performAuthRequest = async (jsonBody: string): Promise<User|null> => {
    const res = await fetch( `${process.env.BACKEND_URL}/login`, {
        method: 'POST',
        body: jsonBody,
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
    });

    if (! (res.ok && res.status === 201)) {
        return null;
    }

    const authData = await res.json() as AuthResponse;
    const userData = await getUserDetail(authData.accessToken);

    if (userData === null) {
        return null;
    }

    return {
        id: userData.id,
        accessToken: authData.accessToken,
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`,
    };
}

const getUserDetail = async (accessToken: string): Promise<UserDetailResponse|null> => {
    const res = await fetch( `${process.env.BACKEND_URL}/users/profile`, {
        method: 'GET',
        headers: {
            "Accept": 'application/json',
            "Authorization": `Bearer ${accessToken}`,
        },
    });

    if (res.ok && res.status === 200) {
        return res.json();
    }

    return null;
}
