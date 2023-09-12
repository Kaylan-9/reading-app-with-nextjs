import { useRouter } from "next/router";
import { BiTrash } from "react-icons/bi";
import IComicUserCategories from "@/types/data/Comics";
import { IMangaEdit } from "@/types/components/IComicEdit";
import requestParameters from "@/utils/requestParameters";
import ComicsSt from '../comics/styled';
import Comic from '../comic/index';
export default function MangaEdit({books: comics, _delete}: IMangaEdit) {
  const router = useRouter();
  return (<ComicsSt>
    <ul>
      {comics.map((comic: IComicUserCategories & { categorie: any }) => <Comic
        key={comic.id+comic.title}
        id={comic.id as number}
        title={comic.title} 
        idCategory={comic.categorie.id}
        category={comic.categorie.name}
        images={comic.imagepaths}
      >
        {_delete ?
          <BiTrash onClick={async ()=> {
            const dataToDoDelete = JSON.stringify({id: comic.id as number, path: comic.path});
            await fetch('/api/book/delete', {
              ...requestParameters.json,
              method: 'DELETE',
              body: dataToDoDelete
            });
            router.push('/');
          }}/> :
          null
        }
      </Comic>)}
    </ul>
  </ComicsSt>);
}
