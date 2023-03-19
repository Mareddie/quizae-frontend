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

type AuthUser = UserDetailResponse & AuthResponse;

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
            }
        }),
    ],
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

    return { ...authData, ...userData };
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
