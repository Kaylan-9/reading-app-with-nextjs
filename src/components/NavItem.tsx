import { TNavItem } from "@/types/components/TNavItem";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

export const StNavItem = styled.li`  
  > button {
    padding: 0;
    background-color: transparent;
    border: none;
    border-radius: 0;
    width: 100%;
    display: flex;
    flex-flow: flex wrap;
    justify-content: center;
    align-items: center;
  }
`;

export const StNavButton= styled.button`
  cursor: pointer;
  font-family: 'Roboto', sans-serif !important;
  font-weight: bold;
  font-size: 16px;
  color: var(--foreground);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5em;

  padding: 1.5em;
  background-color: var(--quartiary-background);
  border: 1px var(--border-color) solid;
  border-radius: 1em;

  > svg {
    font-size: 1.6em; 
  }
`;

export function NavItem({name, href=false, icon, onClick}: TNavItem) {
  const router = useRouter();
  return (router.asPath!==`/${href}` ? (<StNavButton onClick={href || onClick===undefined ? 
    () => router.push(`/${href}`, undefined, { shallow: true }) :
    onClick
  }>
    {name} {icon}
  </StNavButton>) : null);
};

export function NavItemLi({name, href=false, icon, onClick}: TNavItem) {
  const router= useRouter();
  return (router.asPath!==`/${href}` ? (<StNavItem>
    <StNavButton onClick={href || onClick===undefined ? 
      () => router.push(`/${href}`, undefined, { shallow: true }) :
      onClick
    }>
      {name} {icon}
    </StNavButton>
  </StNavItem>) : null);
};