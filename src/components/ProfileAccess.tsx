import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useSession, signOut } from 'next-auth/react';
import ProfilePic from "./ProfilePic";
import { IProfileAccessProps } from "@/types/components/IProfileAccessProps";
import { StNavItem } from "./NavItem";

const ProfileAccessSt = styled(StNavItem)`
  gap: 25px;
  width: 100%;
  background-color: var(--quartiary-background);
  border: 1px var(--border-color) solid;
  border-radius: 1em;
  display: grid;
  grid-template-columns: min-content min-content;
  justify-content: space-between;
  padding: .6em 1em .6em .6em;
  > #btn-logout {
    color: #ff7a7a !important;
    background-color: transparent;
    color: white;
    border: none;
    font-family: var(--font-one);
    font-weight: bold;
    display: inline;
    cursor: pointer;
  }
`

export default function ProfileAccess({imgurl}: IProfileAccessProps) {
  const {data: session}: any = useSession();
  const router = useRouter();
  const goToProfile = () => router.push(`/user/@${session?.user?.id ?? ''}`);
  return(<ProfileAccessSt>
    <ProfilePic onClick={goToProfile} imgurl={imgurl} width='45px' min_height='45px'/>
    <button id="btn-logout" onClick={() => signOut()}>logOut</button>
  </ProfileAccessSt>);
}