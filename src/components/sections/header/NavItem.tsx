import { TNavItem } from "@/types/components/TNavItem";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const NavItemSt = styled.li`
  & > button {
    background-color: transparent;
    cursor: pointer;
    font-family: 'Roboto', sans-serif !important;
    font-weight: bold;
    border: none;
    padding:0px;
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.5em;
    > svg {
      font-size: 1.6em; 
    }
  }
`;

export function NavItem({name, href=false, icon, onClick}: TNavItem) {
  const router = useRouter();
  return (router.asPath!==`/${href}` ? (<NavItemSt>
    <button onClick={href || onClick===undefined ? 
      () => router.push(`/${href}`, undefined, { shallow: true }) :
      onClick
    }>
      {name} {icon}
    </button>
  </NavItemSt>) : null);
};