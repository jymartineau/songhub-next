import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import Society from '@/models/society';
import connectToDatabase from '@/utils/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSocietyValidationSchema } from '@/components/modals/AdminCreateEditSocietyModal';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  await connectToDatabase();
  if (req.method === 'PUT') {
    const payload = JSON.parse(req.body);
    const schema = getSocietyValidationSchema();
    try {
      await schema.validate(payload);
    } catch (err) {
      return res.status(400).json({ error: err });
    }

    const {_id, name, group} = payload;
    try {
      await Society.findByIdAndUpdate(_id, { name, group});
      return res.status(200).json({ success: true});
    } catch(err) {
      console.error(err);
      return res.status(400).json({ success: false });
    }
  } else if (req.method === 'DELETE') {
    try {
      await Society.deleteOne({_id : id});
      return res.status(200).json({ success: true});
    } catch (err) {
      return res.status(400).json({ success: false });
    }
  }

  return res.status(400).json({ success: false });

}

export default withApiAuthRequired(handler);