import { useContext, useState } from "react";
import Link from 'next/link';
import { ReactSVG } from "react-svg";
import Logo from "../../public/logo.svg";
import styled from "@emotion/styled";
import Login from "./Login";
import ProfileAccess from "./ProfileAccess";
import { useSession } from "next-auth/react";
import { IHeaderProps } from "@/types/components/IHeaderProps";
import { NavItem } from "./NavItem";
import { CookiePolicyContext } from "@/contexts/CookiePolicyContext";
import { BiInfoCircle } from "react-icons/bi";

const Items = styled.ul`
  display: flex;
  gap: 25px;
  align-items: center;
  justify-content: flex-start !important;
  grid-area: headeritems;
  padding: 1em 0 !important;
  border-bottom: solid 1px var(--border-color);
  width: 100%;
  @media(max-width:700px) {
    flex-wrap: wrap;
  }
  > li > a {
    text-decoration: none;
    font-weight: bold;
    font-family: var(--font-one);
    font-size: 15px;
    color: white;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    > div {
      > div {
        mask-image: linear-gradient(0deg, rgba(2,0,36,0.4822303921568627) 12%, rgba(0,212,255,1) 100%);
        > svg {
          width: 55px;
          height: 55px;
          path {
            
          }
        }
      }
    }
  } 
`;

const StHeader = styled.header`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-flow: column wrap;
  column-gap: 25px;
  grid-area: page-header;
  margin: 0 2.5em;
  margin-bottom: 2em;
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
    <StHeader id={`page-header`}>
      <Items>
        <li>
          <Link className='logotipo' href={`/`}>
            <ReactSVG src={Logo.src}/>
          </Link>
        </li>
        <NavItem name='home' href=""/>
        {agreement ? (status==='authenticated' ? 
          (<ProfileAccess imgurl={session.user?.image ?? ''}/>) : 
          (<NavItem name='login' onClick={() => {
            setActiveLogin(true);
          }}/>))
        : null}
        <NavItem name='about' icon={<BiInfoCircle/>} href="about"/>
      </Items>
      {children}
    </StHeader>
  </>);
}

