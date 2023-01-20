import { FormidableError, parseForm } from "@/lib/parse-form";
import { NextApiRequest, NextApiResponse } from "next";

export default async function bookCreate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { fields, files} = await parseForm(req);
    const file = files.bookimages;
    let url = Array.isArray(file) ? file.map((f) => f.filepath) : file.filepath;
    res.status(200).json({
      data: {
        url,
      },
      error: null,
    });

  } catch(error) {

    if (error instanceof FormidableError) {
      res.status(error.httpCode || 400).json({ data: null, error: error.message });
    } else {
      console.error(error);
      res.status(500).json({ data: null, error: "Internal Server Error" });
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};