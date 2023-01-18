import { useContext } from "react";
import Link from 'next/link';
import styles from './components.module.css';
import logoimg from '../../public/logo.png';
import { SessionContext } from '@/contexts/SessionContext';

type NavItemType = {
  name: string,
  href: string,
}

function NavItem({name, href}: NavItemType) {
  return (<li>
    <Link href={`/${href}`}>
      {name}
    </Link>
  </li>);
}

export default function Header() {
  const { userSession } = useContext<any>(SessionContext);
  return (<header className={styles.header}>
    <ul>
      <NavItem name='home' href="/"/>
      <NavItem name='favoritos' href="favorites"/>
      <li>
        <Link href={`/`}>
          <img className={styles.logoimg} src={logoimg.src} alt=""/>
        </Link>
      </li>
      <NavItem name='about' href="about"/>
      {userSession.isLoggedIn ? 
        (<NavItem name='profile' href="profile"/>) : 
        (<NavItem name='login' href="login"/>)}
    </ul>
  </header>);
}