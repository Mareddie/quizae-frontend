import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from "next-auth/jwt";

type ResponseData = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
) {
    const token = await getToken({req});

    if (! token) {
        res.status(401).json({ message: 'You must be logged in to access this resource!'});
        return;
    }

    if (! process.env.BACKEND_URL) {
        throw new Error('BACKEND_URL environment variable is missing');
    }

    const response = await fetch(`${process.env.BACKEND_URL}/users/profile`, {
        method: 'GET',
        headers: {
            "Accept": 'application/json',
            "Authorization": `Bearer ${token.accessToken}`,
        },
    });

    res.status(200).json(await response.json());
}
