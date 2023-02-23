import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { MdOutlineManageSearch } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { useRef, useState } from 'react';
import Manga from "./Manga";
import { IBookUserCategories } from "@/types/data/Books";

const MangaEditSt = styled.div`
  & > ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(183px, 1fr));
    row-gap: 65px;
    column-gap: 50px;
    width: 100%;
    @media(max-width:700px) {
      display: flex;
      justify-content: space-between !important;
      padding: 75px 10px;
      gap: 50px;
      flex-direction: column !important;
    }
  }
  & > .inputicon {
    grid-area: inputiconremove;
    align-items: center;
    display: flex;
    gap: 10px;
    font-size: 25px;
    @media(max-width:700px) {
      display: grid;
      grid-template-columns: min-content auto;
    }
    & > input {
      border: none;
      border-radius: 15px;
      padding: 15px;
      font-weight: bold;
      font-family: var(--font-one);
      background-color: #0c0c0c;
      color: white;
      min-width: 250px;
      outline: none;
      &::-webkit-input-placeholder {
        color: white;
      }
    }
  }
`;

export default function MangaEdit() {
  const [ searchContent,  setSearchContent ] = useState<IBookUserCategories[] | false>(false);
  const searchInput = useRef<HTMLInputElement>(null); 
  const router = useRouter();

  return (<MangaEditSt>
    <div className="inputicon">
      <MdOutlineManageSearch onClick={async () => {
        const dataToDoSearch = JSON.stringify({title: searchInput.current?.value==="" ? false : searchInput.current?.value});
        const resultResearch = await fetch('/api/book/search', {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: dataToDoSearch
        });
        const dataResearch = await resultResearch.json();
        console.log(dataResearch)
        setSearchContent(dataResearch.research as IBookUserCategories[]);
      }}/>
      <input ref={searchInput} type="text" name="" id="" placeholder='pesquisar por nome'/>
    </div>
    <ul>
      {searchContent ? searchContent.map((book: IBookUserCategories) => <Manga
        key={book.id+book.title}
        id={book.id as number}
        title={book.title} 
        category={book.categorie.name}
        images={book.imagepaths}
      >
        <BiTrash onClick={async ()=> {
          const dataToDoDelete = JSON.stringify({id: book.id as number, path: book.path});
          await fetch('/api/book/delete', {
            method: 'DELETE',
            headers: {'Content-Type' : 'application/json'},
            body: dataToDoDelete
          });
          router.push('/');
        }}/>
      </Manga>) : null}
    </ul>
  </MangaEditSt>);
}
