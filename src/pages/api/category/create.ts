import { createCategory } from "@/lib/db/categories";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function createBook(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {name} = req.body;
    const data = await createCategory(name);
    return res.status(200).json({data, error: null});
  } catch(error) {
    console.error(error);
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
}