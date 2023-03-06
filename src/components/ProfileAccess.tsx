import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useSession, signOut } from 'next-auth/react';
import ProfilePic from "./ProfilePic";
import { IProfileAccessProps } from "@/types/components/IProfileAccessProps";
import { StNavItem } from "./NavItem";

const ProfileAccessSt = styled(StNavItem)`
  gap: 25px;
  padding-right: .25em;
  padding-left: .5em;
  & > #btn-logout {
    grid-area: btn-profile;
    color: #ff7a7a !important;
    background-color: transparent;
    color: white;
    border: none;
    font-family: var(--font-one);
    font-weight: bold;
    cursor: pointer;
  }
`

export default function ProfileAccess({imgurl}: IProfileAccessProps) {
  const {data: session}: any = useSession();
  const router = useRouter();
  const goToProfile = () => router.push(`/user/@${session?.user?.id ?? ''}`);
  return(<ProfileAccessSt>
    <ProfilePic onClick={goToProfile} imgurl={imgurl} width='40px' min_height='40px'/>
    <button id="btn-logout" onClick={() => signOut()}>
      logOut
    </button>
  </ProfileAccessSt>);
}