import Button from "@/styles/Button";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type TNavItem = {
  name?: string,
  icon?: ReactNode,
  href?: string | false,
  onClick?: () => void,
  css?: string,
};

export function NavItem({name, href=false, icon, onClick, css}: TNavItem) {
  const router = useRouter();
  return (router.asPath!==`/${href}` ? (<Button className={css} onClick={href || onClick===undefined ? 
    () => router.push(`/${href}`, undefined, { shallow: true }) :
    onClick
  }>
    {name} {icon}
  </Button>) : null);
};

export function NavItemLi({name, href=false, icon, onClick, css}: TNavItem) {
  const router= useRouter();
  return (router.asPath!==`/${href}` ? (<li>
    <Button className={css} onClick={href || onClick===undefined ? 
      () => router.push(`/${href}`, undefined, { shallow: true }) :
      onClick
    }>
      {name} {icon}
    </Button>
  </li>) : null);
};