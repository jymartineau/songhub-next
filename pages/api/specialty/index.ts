// import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import { getSpecialtyValidationSchema } from '@/components/modals/AdminCreateEditSpecialtyModal';
// import clientPromise from '@/lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {

  console.log('process.env', process.env);
  console.log('process.env.MONGODB_URI', process.env.MONGODB_URI);
  console.log('process.env.MONGODB_DBNAME', process.env.MONGODB_DBNAME);

  // const client = await clientPromise;
  // const db = client.db(process.env.MONGODB_DBNAME);
  // const payload = req.body;
  if (req.method === 'POST') {
    // const schema = getSpecialtyValidationSchema();
    // try {
    //   await schema.validate(payload);
    // } catch (err) {
    //   return res.status(400).json({ error: err });
    // }

    // const newDoc = await db.collection("specialties").insertOne(payload);
    // return res.status(200).json({ success: true, doc: newDoc });
  } else {
    // Handle any other HTTP method
  }
  res.status(200).json({ name: 'John Doe' })
}

export default handler; // withApiAuthRequired(handler);