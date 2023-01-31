import * as gcs from "../../../lib/gcs";
import { Books, createBook as createBookInDB } from "@/lib/db/books";
import { FormidableError, parseForm } from "@/lib/parse-form";
import { createReadStream } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function createBook(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { fields, files } = await parseForm(req);
  try {
    type filesdataType = {filepath: string, newFilename: string};
    const filesdata: any = files.bookimages;
    if(fields.bookiduser!=='') {
      let newBook: Books = {
        title: fields.bookname as string,
        path: fields.bookpath as string,
        description: fields.bookdescription as string,
        idCategory: Number(fields.bookidcategory),
        idUser: fields.bookiduser as string,
        imagepaths: [],
      };
      filesdata.map(({filepath, newFilename: filename}: filesdataType) => {
        const filenametype = filename.split('.');
        const _filename = filenametype[0];
        const filetype = filenametype[1];
        newBook.imagepaths.push({
          name: _filename,
          type: filetype,
        })
        createReadStream(filepath)
          .pipe(gcs.createWriteStream(_filename, filetype))
          .on("finish", () => console.log("File Upload Complete"))
          .on("error", (err) => console.error(err.message));      
      });

      try{await createBookInDB(newBook)} 
      catch(error) {console.log(error)} 
      return res.status(200).json({data: {newBook}, error: null});
    }
    return res.status(400).json({data: null, error: 'Cadastro ilegal!'});
  } catch(error) {
    if (error instanceof FormidableError) {
      res.status(error.httpCode || 400).json({ data: null, error: error.message });
    } else {
      console.error(error);
      res.status(500).json({ data: null, error: "Internal Server Error" });
    }
  }
}