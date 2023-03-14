import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import Society from '@/models/society';
import connectToDatabase from '@/utils/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSocietyValidationSchema } from '@/components/modals/AdminCreateEditSocietyModal';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  if (req.method === 'POST') {
    const payload = JSON.parse(req.body);
    const schema = getSocietyValidationSchema();
    try {
      await schema.validate(payload);
    } catch (err) {
      return res.status(400).json({ error: err });
    }

    const society = new Society({
      name: payload.name,
      group: payload.group,
    });
    await society.save();
    return res.status(200).json({ success: true, doc: society });
  } else {
    const societies = await Society.find();
    return res.status(200).json(societies);
  }
}

export default withApiAuthRequired(handler);