import { ReactNode, useContext } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { SessionContext } from '@/contexts/SessionContext';
import styled from "@emotion/styled";
import { useRouter } from "next/router";

type NavItemType = {
  name: string,
  href: string,
}

const NavItemSt = styled.li`
  & > button {
    background-color: transparent;
    cursor: pointer;
    font-family: 'Roboto', sans-serif !important;
    font-weight: bold;
    border: none;
    padding:0px;
    color: white;
  }
`;

function NavItem({name, href}: NavItemType) {
  const router = useRouter();
  return (router.asPath!==`/${href}` ? (<NavItemSt>
    <button onClick={() => router.push(`/${href}`, undefined, { shallow: true })}>
      {name}
    </button>
  </NavItemSt>) : null);
}

const HeaderSt = styled.header`
  align-items: center;
  padding: 10px 25px;
  display: grid;
  grid-template-columns: 285px auto 285px;
  grid-template-rows:  125px auto;
  grid-template-areas: 
    'adverts adverts adverts'
    'inputicon headeritems bookcategoryselect';
  gap: 15px;
  background-color: rgb(0, 0, 0);
  box-shadow: 0px 0px 50px 1px rgba(0, 0, 0, 0.5);
  @media(max-width: 1100px) {
    grid-template-columns: auto !important;
    grid-template-rows: min-content auto auto auto;
    grid-template-areas: 
      'adverts'
      'headeritems'
      'bookcategoryselect'
      'inputicon';
  }
  & > .items {
    display: flex;
    justify-content: center;
    gap: 50px;
    align-items: center;
    margin: 0 auto;
    grid-area: headeritems;
    @media(max-width:700px) {
      flex-wrap: wrap;
    }
    & > li > a {
      text-decoration: none;
      font-weight: bold;
      font-family: var(--font-one);
      font-size: 15px;
      color: white;
    }
  }
  & > .adverts {
    grid-area: adverts;
  }
  & > .inputicon {
    align-items: center;
    display: flex;
    grid-area: inputicon;
    font-size: 25px;
    border-radius: 30px;
    background-color: #292929;
    padding-left: 15px;
    gap: 15px;
    @media(max-width:700px) {
      display: grid;
      grid-template-columns: auto auto;
    }
    & > input {
      border: none;
      background-color: transparent;
      padding: 15px;
      font-family: var(--font-one);
      color: white;
      min-width: 250px;
      outline: none;
      &::-webkit-input-placeholder {
        color: white;
      }
    }
    & > svg {
      min-width: 18px;
      & > * {
        color: white;
      }
    }
  }
`;

interface HeaderInterface {
  children?: ReactNode,
  search?: any
}

export default function Header({children, search}: HeaderInterface) {
  const { userSession } = useContext<any>(SessionContext);
  return (<HeaderSt>
    <div className='adverts'>

    </div>
    {children}
    <ul className="items">
      <NavItem name='home' href=""/>
      <li>
        <Link href={`/`}>
          <Image
            src="/logo.png"
            alt="logo do site" 
            width={60}
            height={60}
          />
        </Link>
      </li>
      <NavItem name='about' href="about"/>
      {userSession.isLoggedIn ? 
        (<NavItem name='profile' href="profile"/>) : 
        (<NavItem name='login' href="login"/>)}
    </ul>
    {search}
  </HeaderSt>);
}
