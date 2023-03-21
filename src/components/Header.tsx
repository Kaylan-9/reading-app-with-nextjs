import { useContext, useState } from "react";
import Link from 'next/link';
import styled from "@emotion/styled";
import Login from "./Login";
import texture from '../../public/escamas.jpg';
import ProfileAccess from "./ProfileAccess";
import { signOut, useSession } from "next-auth/react";
import { IHeaderProps } from "@/types/components/IHeaderProps";
import { NavItem, NavItemLi } from "./NavItem";
import { CookiePolicyContext } from "@/contexts/CookiePolicyContext";
import Image from "next/image";
import Column from "@/styles/Column";
import { css } from "@emotion/css";
import { HiLockClosed } from "react-icons/hi";

const Items = styled(Column)`
  flex-direction: row !important;
  align-items: center;
  justify-content: center;
  grid-area: headeritems;
  column-gap: 1.5em;
  padding: 0!important;
`;

const StHeader = styled(Column.withComponent('header'))`
  flex-direction: row !important;
  justify-content: space-between;
  align-items: center;
  margin: 0!important;
  padding: 1em 1em !important;
  margin-bottom: 2em !important;
  column-gap: 1.5em !important;
  grid-area: page-header;
  background-color: rgb(var(--background));
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
      <Link className='logotipo' href={`/`}>
        <Image style={{clipPath: `url(#svgMask)`}} id={`logo`} alt={`logo do site`} src={texture} width={45} height={45}/>
        <svg className="mask">
          <clipPath id="svgMask" clipPathUnits="objectBoundingBox">
            <path
              fill="#cc0000"
              d="M0.51,0.001 C0.229,0.001,0.001,0.225,0.001,0.501 c0,0.276,0.228,0.5,0.509,0.5 c0.203,0,0.386,-0.119,0.466,-0.302 c-0.065,0.013,-0.11,0.029,-0.173,0.02 c0,0,0.128,-0.039,0.156,-0.11 c-0.072,-0.008,-0.104,-0.021,-0.13,-0.029 c0.043,-0.02,0.107,-0.094,0.129,-0.131 c-0.072,0.016,-0.123,0.01,-0.153,-0.005 l0.069,-0.109,-0.17,0.037,-0.009,-0.113 c0,0,0,0,-0.001,0 c-0.083,0.052,-0.239,0.093,-0.316,0.175 c-0.04,0.047,-0.091,0.042,-0.146,0.075 c-0.012,0.007,-0.053,0.038,-0.018,0.065 c0.009,0.007,0.015,0.025,0.02,0.035 c0.035,-0.02,0.079,-0.033,0.122,-0.04 c0.007,-0.026,0.008,-0.029,0.008,-0.029 l0.014,0.021 c0.019,-0.007,0.037,-0.014,0.053,-0.019 l-0.049,0.037,-0.012,0.025,-0.009,-0.017 c-0.056,0.035,-0.119,0.039,-0.119,0.039 c0,0,0.016,0.039,0.034,0.037 c0.022,-0.002,0.075,-0.011,0.12,-0.003 c0.033,0.005,0.061,0.031,0.073,0.018 c0.01,-0.088,0.108,-0.099,0.182,-0.1 c-0.139,0.01,-0.185,0.1,-0.189,0.172 C0.04,0.956,-0.037,0.455,0.288,0.411 C0.267,0.296,0.394,0.26,0.448,0.294 C0.494,0.141,0.769,0.205,0.896,0.294 c0.035,0.026,0.07,0.053,0.105,0.079 C0.942,0.154,0.74,0.001,0.51,0.001 M0.676,0.301 c0.003,0.019,0.006,0.074,-0.006,0.089 c-0.005,0.019,-0.051,0.044,-0.05,-0.018 m-0.078,0.208 c-0.04,-0.114,-0.138,-0.067,-0.14,-0.083 c0.113,-0.036,0.137,0.024,0.14,0.083 m-0.151,-0.068 c0.001,0.002,0.006,0.017,0.018,0.026 l0,0 c0.005,-0.009,0.013,-0.016,0.024,-0.018 l-0.033 e-4,-0.004, c0,0,0,0,0,0 v-0.033 e-4, c0.005,-0.001,0.009,-0.001,0.014,-0.001 c0.028,0,0.051,0.018,0.065,0.048 c-0.008,-0.007,-0.018,-0.011,-0.029,-0.011 c0,0.024,-0.023,0.043,-0.039,0.043 c-0.052,-0.005,-0.058,-0.064,-0.052,-0.086 m0.163,0.189 c0.06,-0.004,-0.066,0.007,-0.105,0.079 c0.023,-0.062,0.038,-0.079,0.105,-0.079"
            />
          </clipPath>
        </svg>
      </Link>

      <Items>
        {(agreement && status==='authenticated' ? 
          (<ProfileAccess imgurl={session.user?.image ?? ''}/>) : 
          (<NavItemLi name='login' onClick={() => setActiveLogin(true)}/>)
        )}
        <NavItemLi name='home' href=""/>
      </Items>
      {status==='authenticated' ? 
        (<NavItem 
          name='log out' 
          onClick={signOut} 
          icon={<HiLockClosed/>} 
          css={css`color: #ff7a7a !important;`}
        />) :
        null
      }
      {children}
    </StHeader>
  </>);
}

