import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import { getSpecialtyValidationSchema } from '@/components/modals/AdminCreateEditSpecialtyCategoryModal';
import Specialty from '@/models/specialty';
import connectToDatabase from '@/utils/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  console.log('id', id);
  await connectToDatabase();
  if (req.method === 'PUT') {
    const payload = JSON.parse(req.body);
    const schema = getSpecialtyValidationSchema();
    try {
      await schema.validate(payload);
    } catch (err) {
      return res.status(400).json({ error: err });
    }

    const {_id, name, description} = payload;
    try {
      await Specialty.findByIdAndUpdate(_id, { name, description});
      return res.status(200).json({ success: true});
    } catch(err) {
      console.error(err);
      return res.status(400).json({ success: false });
    }
  } else if (req.method === 'DELETE') {
    try {
      await Specialty.deleteOne({_id : id});
      return res.status(200).json({ success: true});
    } catch (err) {
      return res.status(400).json({ success: false });
    }
  }

  return res.status(400).json({ success: false });

}

export default withApiAuthRequired(handler);