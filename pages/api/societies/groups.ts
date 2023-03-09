import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import Society from '@/models/society';
import connectToDatabase from '@/utils/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  const groups = await Society.find().distinct('group');
  return res.status(200).json(groups);
}

export default withApiAuthRequired(handler);
