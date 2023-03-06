import { TNavItem } from "@/types/components/TNavItem";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

export const StNavItem = styled.li`
  padding: .25 .25em;
  border-radius: 2em;
  border: solid var(--border-color) 1px;
  background-color: var(--quartiary-background);
  max-height: 58px;
  min-height: 58px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  > button {
    padding: 0 1.5em;
    border: none !important;
    background-color: transparent !important;
    cursor: pointer;
    font-family: 'Roboto', sans-serif !important;
    font-weight: bold;
    color: var(--secondary-foreground);
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
  return (router.asPath!==`/${href}` ? (<StNavItem>
    <button onClick={href || onClick===undefined ? 
      () => router.push(`/${href}`, undefined, { shallow: true }) :
      onClick
    }>
      {name} {icon}
    </button>
  </StNavItem>) : null);
};