import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line no-unused-vars
const afterCallback = async (req: NextApiRequest, res: NextApiResponse, session: any, _: any) => {
    console.log(session);
    return session;
}

export default handleAuth({
    async callback(req, res) {
        try {
            await handleCallback(req, res, { afterCallback });
        } catch (error: any) {
            res.status(error.status || 500).end(error.message);
        }
    },


});