import * as gcs from "../../../lib/gcs";
import { Books, createBook as createBookInDB } from "@/lib/db";
import { FormidableError, parseForm } from "@/lib/parse-form";
import { createReadStream } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function createBook(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    type filesdataType = {filepath: string, newFilename: string};
    const { fields, files } = await parseForm(req);
    const filesdata: any = files.bookimages;
    let newBook: Books = {
      title: fields.bookname as string,
      path: fields.bookpath as string,
      description: fields.bookdescription as string,
      categorie: fields.bookcategorie as string,
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
    
    res.status(200).json({
      data: {
        newBook
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