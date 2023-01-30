import { getAllCategory } from '@/lib/db/categories'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(await getAllCategory());
}

