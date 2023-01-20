import formidable from 'formidable';
import { join } from "path";
import mime from "mime";
import { mkdir, stat } from "fs/promises";
import * as dateFn from "date-fns";
import type { NextApiRequest, NextApiResponse } from 'next'
import { createBook, deleteBook } from "@/lib/db"

export const config = {
  api: {
     bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'POST') {
    const saveImages = new Promise(async (resolve, reject) => {
      const uploadDir = join(process.env.ROOT_DIR || process.cwd(), `\\images\\${dateFn.format(Date.now(), "dd-MM-Y")}`);
      const form = formidable({
        maxFiles: 100,
        maxFieldsSize: 1024**3,
        uploadDir,
        filename: (_name, _ext, part) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const filename = `${part.name || "unknown"}-${uniqueSuffix}.${
            mime.getExtension(part.mimetype || "") || "unknown"
          }`;
          return filename;
        },
        filter: (part) => (
          part.name === "media" && (part.mimetype?.includes("image") || false)
        )
      });

      form.parse(req, function (err, fields, files) {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    // const data = req.body;
    // await createBook(data);
    return res.status(200).json({message: 'Success'})
  }

  if (req.method === 'DELETE') {
    const data = req.body;
    await deleteBook(data);
    return res.status(200).json({message: 'Success'})
  }

  res.status(200).json({ name: 'John Doe'})

}

