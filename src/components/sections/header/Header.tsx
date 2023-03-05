import { useContext, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import styled from "@emotion/styled";
import Login from "../Login";
import ProfileAccess from "./ProfileAccess";
import { useSession } from "next-auth/react";
import { IHeaderProps } from "@/types/components/IHeaderProps";
import { NavItem } from "./NavItem";
import { CookiePolicyContext } from "@/contexts/CookiePolicyContext";

const Items = styled.ul`
  display: flex;
  gap: 25px;
  align-items: center;
  justify-content: space-around !important;
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
  justify-content: center;
  padding: 1.5em 150px;
  display: flex;
  flex-flow: column wrap;
  column-gap: 25px;
  @media(max-width: 1100px) {
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
    opacity: 0.45;
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
  let {agreement}= useContext(CookiePolicyContext);

  return (<>
    {(activeLogin ? (<Login setActiveLogin={setActiveLogin}/>) : null)}
    <StHeader>
      <Link className='logotipo' href={`/`}>
        <Image
          src="/logo2.png"
          alt="logo do site" 
          width={65}
          height={65}
        />
      </Link>
      <Items>
        <NavItem name='home' href=""/>
        {agreement ? (status==='authenticated' ? 
          (<ProfileAccess imgurl={session.user?.image ?? ''}/>) : 
          (<NavItem name='login' onClick={() => {
            setActiveLogin(true);
          }}/>))
        : null}
      </Items>
      {children}
    </StHeader>
  </>);
}

