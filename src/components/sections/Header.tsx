import { ReactNode, useContext, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { SessionContext } from '@/contexts/SessionContext';
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Login from "./Login";
import ProfileAccess from "./ProfileAccess";
import { css } from "@emotion/css";

type NavItemType = {
  name: string,
  href?: string | false,
  onClick?: () => void,
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

function NavItem({name, href=false, onClick}: NavItemType) {
  const router = useRouter();
  return (router.asPath!==`/${href}` ? (<NavItemSt>
    <button onClick={href || onClick===undefined ? 
      () => router.push(`/${href}`, undefined, { shallow: true }) :
      onClick
    }>
      {name}
    </button>
  </NavItemSt>) : null);
}

const HeaderSt = styled.header`
  align-items: center;
  padding: 10px 25px;
  display: grid;
  grid-template-columns: 60px auto 60px !important;
  grid-template-rows: 125px auto;
  grid-template-areas: 
    'adverts adverts adverts'
    'logotipo headeritems .'
    'search search search';
  row-gap: 15px;
  background-color: rgb(0, 0, 0);
  box-shadow: 0px 0px 50px 1px rgba(0, 0, 0, 0.5);
  @media(max-width: 1100px) {
    grid-template-columns: min-content auto !important;
    grid-template-rows: min-content auto auto auto;
    grid-template-areas: 
      'adverts'
      'headeritems'
      'search';
  }
  & > .logotipo {
    grid-area: logotipo;
  }
  & > .items {
    display: flex;
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
  & > .search {
    display: flex;
    justify-content: center;
    gap: 25px;
    align-items: center;
    grid-area: search;
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
  }
`;

interface HeaderInterface {
  children?: ReactNode,
  search?: any
}

export default function Header({children, search}: HeaderInterface) {
  const { userSession } = useContext<any>(SessionContext);
  const [ activeLogin, setActiveLogin  ] = useState<boolean>(false);
  return (<>
    {(activeLogin ? (<Login setActiveLogin={setActiveLogin}/>) : null)}
    <HeaderSt>
      <div className='adverts'>

      </div>
      
      <Link className='logotipo' href={`/`}>
        <Image
          src="/logo.png"
          alt="logo do site" 
          width={60}
          height={60}
        />
      </Link>

      <ul className="items">
        <NavItem name='home' href=""/>
        <NavItem name='about' href="about"/>
        {userSession.isLoggedIn ? 
          (<ProfileAccess imagelink=''/>) : 
          (<NavItem name='login' onClick={() => {
            setActiveLogin(true);
          }}/>)}
      </ul>
      <div className='search'>
        {search}
        {children}
      </div>
    </HeaderSt>
  </>);
}
