import type { NextApiRequest } from "next";
import mime from "mime";
import { join } from "path";
import * as dateFn from "date-fns";
import formidable from "formidable";
import { mkdir, stat } from "fs/promises";

export const FormidableError = formidable.errors.FormidableError;

export const parseForm = async (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => (await new Promise(async (resolve, reject) => {
  const filepath =  dateFn.format(Date.now(), "ss-mm-hh-dd-MM-Y");
  const uploadDir = join(
    process.env.ROOT_DIR || process.cwd(),
    `/images/${filepath}`
  );

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(e);
      reject(e);
      return;
    }
  }

  const form = formidable({
    multiples: true,
    maxFiles: 10,
    maxFileSize: 1024 * 1024 * 250, // 250mb
    uploadDir,
    filename: (_name, _ext, part) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const _filename = `${part.name || "unknown"}-${uniqueSuffix}`;
      const filetype = mime.getExtension(part.mimetype || "") || "unknown";
      return `${_filename}.${filetype}`;
    },
    filter: (part) => {
      return (
        part.name === "bookimages" && (part.mimetype?.includes("image") || false)
      );
    },
  });

  form.parse(req, (err, fields, files) => {
    if (err) reject(err);
    else resolve({ fields: {...fields, bookpath: filepath}, files});
  });

}));
