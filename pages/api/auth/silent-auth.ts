import { handleLogin } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async function silentAuth(req: NextApiRequest, res: NextApiResponse) {
  try {
    await handleLogin(req, res, {
      authorizationParams: {
        prompt: 'none',
      },
    });
  } catch (error:any) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}