import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { MdOutlineManageSearch } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { useRef, useState } from 'react';
import Manga from "./Manga";
import { IBookUserCategories } from "@/types/data/Books";
import { IMangaEdit } from "@/types/components/IMangaEdit";

const MangaEditSt = styled.div`
  padding: 0 150px;
  > ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(183px, 1fr));
    row-gap: 65px;
    column-gap: 50px;
    width: 100%;
    > li {
      cursor: pointer;
    }  
    @media(max-width:700px) {
      display: flex;
      justify-content: space-between !important;
      padding: 75px 10px;
      gap: 50px;
      flex-direction: column !important;
    }
  }
  
`;

export default function MangaEdit({books, _delete}: IMangaEdit) {
  const router = useRouter();
  return (<MangaEditSt>
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
              method: 'DELETE',
              headers: {'Content-Type' : 'application/json'},
              body: dataToDoDelete
            });
            router.push('/');
          }}/> :
          null
        }
      </Manga>)}
    </ul>
  </MangaEditSt>);
}
