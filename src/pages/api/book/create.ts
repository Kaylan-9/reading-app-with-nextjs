import { Books, createBook as createBookInDB } from "@/lib/db";
import { FormidableError, parseForm } from "@/lib/parse-form";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function createBook(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    const { fields, files } = await parseForm(req);
    let newBook: Books = {
      title: fields.bookname as string,
      path: fields.bookpath as string,
      description: fields.bookdescription as string,
      categorie: fields.bookcategorie as string,
      imagepaths: [],
    };

    const filesdata: any = files.bookimages;
    filesdata.map((f: any) => {
      const filenametype = f.newFilename.split('.');
      const filename = filenametype[0];
      const filetype = filenametype[1];
      newBook.imagepaths.push({
        name: filename,
        type: filetype,
      })
    });
    
    try{
      await createBookInDB(newBook);
    } catch(error) {
      console.log(error);
    } 
    
    res.status(200).json({
      data: {
        ...newBook  
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