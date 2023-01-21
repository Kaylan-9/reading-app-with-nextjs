import styled from "@emotion/styled";

interface SelectInterface {
  onChange: any
}

const SelectSt = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: none;
  grid-area: bookcategorieselect;
  text-align: center;
  & > option {
    padding: 8px;
  }
`;

export default function Select({onChange}: SelectInterface) {
  const categories: string[] = [
    "Shōnen",
    "Seinen",
    "Shōjo",
    "Yaoi",
    "Yuri",
    "Josei"
  ];

  return (<SelectSt className="categorie" onChange={onChange}>
    {categories?.map((categorie: string) => <option value={categorie}>{categorie}</option>)}
  </SelectSt>);
}