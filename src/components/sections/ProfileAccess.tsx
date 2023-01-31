import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useSession, signOut } from 'next-auth/react';

const ProfileAccessSt = styled.li`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 25px;
  & > div {
    border-radius: 100%;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
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
  & > #btn-logout {
    grid-area: btn-profile;
    font-weight: bold;
    color: #ff7a7a !important;
  }
`;

interface IProfileAccess {
  imagelink: string;  
}

export default function ProfileAccess({imagelink}: IProfileAccess) {
  const {data: session}: any = useSession();
  const router = useRouter();
  const goToProfile = () => {
    router.push(`/user/@${session?.user?.id ?? ''}`);
  };

  return(<ProfileAccessSt>

    <div onClick={goToProfile} className={css`
      background-image: url(${imagelink});
    `}/>
    <button id="btn-profile" onClick={goToProfile}>
      profile
    </button>
    <button id="btn-logout" onClick={() => signOut()}>
      logOut
    </button>
  </ProfileAccessSt>);
}