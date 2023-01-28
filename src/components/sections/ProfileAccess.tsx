import { SessionContext, SessionContextInterface } from "@/contexts/SessionContext";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useContext } from "react";

const ProfileAccessSt = styled.li`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 25px;
  & > div {
    border-radius: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: white;
    min-height: 40px;
    width: 40px;
  }
  & > #btn-profile, #btn-logout {
    background-color: transparent;
    color: white;
    border: none;
    font-family: var(--font-one);
    cursor: pointer;
  }
  & > #btn-profile {grid-area: btn-profile}
  & > #btn-logout {grid-area: btn-profile}
`;

interface ProfileAccessInterface {
  imagelink: string;  
}

export default function ProfileAccess({imagelink}: ProfileAccessInterface) {
  const router = useRouter();
  const { handleLogOut } = useContext<SessionContextInterface>(SessionContext);
  return(<ProfileAccessSt>
    <div className={css`
      background-image: url(${imagelink});
    `}/>
    <button id="btn-profile" onClick={() => {
      router.push('/profile');
    }}>
      profile
    </button>
    <button id="btn-logout" onClick={handleLogOut}>
      logOut
    </button>
  </ProfileAccessSt>);
}