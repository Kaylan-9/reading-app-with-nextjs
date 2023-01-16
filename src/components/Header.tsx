import styles from './components.module.css';
import logoimg from '../../public/logo.png';

type NavItemType = {
  name: string,
  href: string,
}

function NavItem({name, href}: NavItemType) {
  return (<li>
    <a href={href}>{name}</a>
  </li>);
}

export default function Header() {
  return (<header className={styles.header}>
    <ul>
      <NavItem name='favoritos' href="#"/>
      <li>
        <img className={styles.logoimg} src={logoimg.src} alt=""/>
      </li>
      <NavItem name='about' href="#"/>
    </ul>
  </header>);
}