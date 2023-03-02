import { ReactNode } from 'react';

export type TNavItem = {
  name?: string,
  icon?: ReactNode,
  href?: string | false,
  onClick?: () => void,
}
