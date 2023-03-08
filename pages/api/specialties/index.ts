import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import { getSpecialtyValidationSchema } from '@/components/modals/AdminCreateEditSpecialtyCategoryModal';
import Specialty from '@/models/specialty';
import connectToDatabase from '@/utils/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  if (req.method === 'POST') {
    const payload = JSON.parse(req.body);
    const schema = getSpecialtyValidationSchema();
    try {
      await schema.validate(payload);
    } catch (err) {
      return res.status(400).json({ error: err });
    }

    const specialty = new Specialty({
      name: payload.name,
      description: payload.description,
    });
    await specialty.save();
    return res.status(200).json({ success: true, doc: specialty });
  } else {
    const specialties = await Specialty.find();
    return res.status(200).json(specialties);
  }
}

export default withApiAuthRequired(handler);