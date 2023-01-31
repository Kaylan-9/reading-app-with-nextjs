import { SessionContext, SessionContextInterface } from "@/contexts/SessionContext";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useSession, signOut } from 'next-auth/react';
import { useContext, useEffect, useState } from "react";

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
  & > #btn-logout {grid-area: btn-profile}
`;

interface IProfileAccess {
  imagelink: string;  
}

export default function ProfileAccess({imagelink}: IProfileAccess) {
  const {data: session} = useSession();
  const [userData, setUserData] = useState<any>({});
  const router = useRouter();
  useEffect(() => {
    const getUserData = async () => {
      const requestUserData = await fetch('/api/auth/userdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'json/application'
        },
        body: JSON.stringify(session?.user)
      });
      const newUserData = await requestUserData.json();
      console.log(userData);
      setUserData(newUserData);
    };

    getUserData();
  }, [])

  return(<ProfileAccessSt>
    <div className={css`
      background-image: url(${imagelink});
    `}/>
    <button id="btn-profile" onClick={() => {
      router.push(`/user/@${userData?.id}`);
    }}>
      profile
    </button>
    <button id="btn-logout" onClick={() => signOut()}>
      logOut
    </button>
  </ProfileAccessSt>);
}