import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export const StNavButton= styled.button`
  cursor: pointer;
  font-family: 'Roboto', sans-serif !important;
  font-weight: bold;
  font-size: 16px;
  color: var(--foreground);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  padding: 1em;
  background-color: rgb(var(--secondary-background));
  justify-content: center;
  border: none;
  border-radius: 1em;
  > svg {
    font-size: 1.2em; 
  }
`;

type TNavItem = {
  name?: string,
  icon?: ReactNode,
  href?: string | false,
  onClick?: () => void,
  css?: string,
};

export function NavItem({name, href=false, icon, onClick, css}: TNavItem) {
  const router = useRouter();
  return (router.asPath!==`/${href}` ? (<StNavButton className={css} onClick={href || onClick===undefined ? 
    () => router.push(`/${href}`, undefined, { shallow: true }) :
    onClick
  }>
    {name} {icon}
  </StNavButton>) : null);
};

export function NavItemLi({name, href=false, icon, onClick, css}: TNavItem) {
  const router= useRouter();
  return (router.asPath!==`/${href}` ? (<li>
    <StNavButton className={css} onClick={href || onClick===undefined ? 
      () => router.push(`/${href}`, undefined, { shallow: true }) :
      onClick
    }>
      {name} {icon}
    </StNavButton>
  </li>) : null);
};