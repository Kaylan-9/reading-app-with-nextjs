import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import styled from "@emotion/styled";
import Login from "../Login";
import ProfileAccess from "./ProfileAccess";
import { useSession } from "next-auth/react";
import { IHeaderProps } from "@/types/components/IHeaderProps";
import { NavItem } from "./NavItem";

const Items = styled.ul`
  display: flex;
  gap: 25px;
  align-items: center;
  margin: 0 auto;
  grid-area: headeritems;
  @media(max-width:700px) {
    flex-wrap: wrap;
  }
  > li > a {
    text-decoration: none;
    font-weight: bold;
    font-family: var(--font-one);
    font-size: 15px;
    color: white;
  }
`;

const StHeader = styled.header`
  align-items: center;
  padding: 0 150px;
  display: grid;
  grid-template-columns: repeat(2, min-content) repeat(2, auto) max-content min-content !important;
  grid-template-rows: 100px auto !important;
  grid-template-areas: 
    'adv adv adv adv adv adv'
    'logotipo headeritems . . allpagesbtn search'
    'pagination pagination pagination pagination pagination pagination'
    'categories categories categories categories categories categories'
  ;
  column-gap: 25px;
  box-shadow: var(--box-shadow);
  @media(max-width: 1100px) {
    grid-template-columns: auto !important;
    grid-template-rows: 0 60px auto auto !important;
    grid-template-areas: 
      'adv'
      'logotipo'
      'headeritems'
      'search'
      'pagination'
      'categories'
    ;
    > .logotipo {
      display: flex;
      justify-content: center;
      align-items: center;
      transform: translate(0px, 0px) !important;
      position: static !important;
    }
  }
  > .logotipo {
    grid-area: logotipo;
  }
  > .adv {
    grid-area: adv;
  }
  > .search {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: search;
    border-radius: 30px;
    > .category {
      border-radius: 0 30px 30px 0;
      background-color: transparent;
    }
    > .input-icon {
      align-items: center;
      display: flex;
      grid-area: inputicon;
      font-size: 25px;
      border-radius: 30px 0 0 30px;
      padding-left: 15px;
      gap: 15px;
      @media(max-width:700px) {
        display: grid;
        grid-template-columns: auto auto;
      }
      > input {
        border: none;
        background-color: transparent;
        padding: 15px;
        font-family: var(--font-one);
        color: var(--secondary-foreground);
        min-width: 250px;
        outline: none;
        &::-webkit-input-placeholder {
          color: white;
        }
      }
      > svg {
        min-width: 18px;
        cursor: pointer;
        > * {
          color: var(--secondary-foreground);
        }
      }
    }
  }
`;

export default function Header({children}: IHeaderProps) {
  const {data: session, status} = useSession();
  const [ activeLogin, setActiveLogin  ] = useState<boolean>(false);

  return (<>
    {(activeLogin ? (<Login setActiveLogin={setActiveLogin}/>) : null)}
    <StHeader>
      <div className='adv'/>
      <Link className='logotipo' href={`/`}>
        <Image
          src="/logo.png"
          alt="logo do site" 
          width={60}
          height={60}
        />
      </Link>
      <Items>
        <NavItem name='home' href=""/>
        { status==='authenticated' ? 
          (<ProfileAccess imgurl={session.user?.image ?? ''}/>) : 
          (<NavItem name='login' onClick={() => {
            setActiveLogin(true);
          }}/>)
        }
        <NavItem name='about' href="#about"/>
      </Items>
      {children}
    </StHeader>
  </>);
}

