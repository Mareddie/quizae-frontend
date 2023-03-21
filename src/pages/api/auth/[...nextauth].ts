import NextAuth, {User} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';

type UserDetailResponse = {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
}

type AuthResponse = {
    accessToken: string,
}

type AuthUser = {
    id: string,
    accessToken: string,
    email: string,
    name: string,
};

export const authOptions = {
    // Configure one or more authentication providers
    // TODO: we can skip token serialization and deserialization, as we already do it on backend
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req): Promise<User|null> {
                return await performAuthRequest(JSON.stringify(credentials)) as User;
            },
        }),
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.accessToken = user.accessToken;
            }

            return token
        },
        async session({session, token}) {
            session.accessToken = token.accessToken;

            return session;
        }
    }
}

export default NextAuth(authOptions);

const performAuthRequest = async (jsonBody: string): Promise<AuthUser|null> => {
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
