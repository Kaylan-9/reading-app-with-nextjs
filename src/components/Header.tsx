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
  return (<NavItemSt>
    <button onClick={() => router.push(`/${href}`, undefined, { shallow: true })}>
      {name}
    </button>
  </NavItemSt>);
}

const HeaderSt = styled.header`
  align-items: center;
  padding: 10px 25px;
  display: grid;
  grid-template-columns: 285px auto 285px;
  grid-template-areas: 
    'adverts adverts adverts'
    'inputicon headeritems bookcategoryselect';
  background: rgb(29,27,27);
  background: linear-gradient(180deg, #000000 81%, transparent 81%);
  margin-bottom: 50px;
  @media(max-width: 1100px) {
    grid-template-columns: auto auto !important;
    grid-template-areas: 
      'adverts adverts'
      'headeritems headeritems'
      'inputicon bookcategoryselect';
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
    min-height: 125px;
  }
  & > .inputicon {
    align-items: center;
    display: flex;
    gap: 10px;
    grid-area: inputicon;
    font-size: 25px;
    @media(max-width:700px) {
      display: grid;
      grid-template-columns: min-content auto;
    }
    & > input {
      border: none;
      border-radius: 15px;
      padding: 15px;
      font-weight: bold;
      font-family: var(--font-one);
      background-color: #0c0c0c;
      color: white;
      min-width: 250px;
      outline: none;
      &::-webkit-input-placeholder {
        color: white;
      }
    }
    & > svg > * {
      color: white;
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
      <NavItem name='home' href="/"/>
      <NavItem name='favoritos' href="favorites"/>
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
