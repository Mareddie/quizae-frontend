import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from "next-auth/jwt";
import httpProxy from "http-proxy";

export const config = {
    api: {
        bodyParser: false,
    },
}

const proxy = httpProxy.createProxy({
    target: process.env.BACKEND_URL,
    secure: process.env.NODE_ENV === "production",
});

export default async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
    const token = await getToken({req});

    // Sanity checks
    if (! token) {
        res.status(401).json(
            {message: 'You must be logged in and provide correct path'}
        );
        return;
    }

    // If not deleted, it won't match for proxying and ultimately resolves in 404
    delete req.headers.host;

    req.headers.authorization = `Bearer ${token.accessToken}`;
    req.url = req.url?.replace(/^\/api\/backend/, '');

    return new Promise((resolve, reject) => {
        proxy.once('error', (err) => {
            reject(err);
        });

        proxy.web(req, res);
    });
}
