import { useRouter } from "next/router";
import { BiTrash } from "react-icons/bi";
import { IBookUserCategories } from "@/types/data/Books";
import { IMangaEdit } from "@/types/components/IMangaEdit";
import requestParameters from "@/ultis/requestParameters";
import { Manga, MangasSt } from "./Mangas";

export default function MangaEdit({books, _delete}: IMangaEdit) {
  const router = useRouter();
  return (<MangasSt>
    <ul>
      {books.map((book: IBookUserCategories) => <Manga
        key={book.id+book.title}
        id={book.id as number}
        title={book.title} 
        idCategory={book.categorie.id}
        category={book.categorie.name}
        images={book.imagepaths}
      >
        {_delete ?
          <BiTrash onClick={async ()=> {
            const dataToDoDelete = JSON.stringify({id: book.id as number, path: book.path});
            await fetch('/api/book/delete', {
              ...requestParameters.json,
              method: 'DELETE',
              body: dataToDoDelete
            });
            router.push('/');
          }}/> :
          null
        }
      </Manga>)}
    </ul>
  </MangasSt>);
}
