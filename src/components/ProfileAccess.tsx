import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';
import ProfilePic from "./ProfilePic";
import { IProfileAccessProps } from "@/types/components/IProfileAccessProps";
import { StNavButton } from "./NavItem";

const ProfileAccessSt = styled(StNavButton)`
  border-radius: 1em;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 !important;
`;

export default function ProfileAccess({imgurl}: IProfileAccessProps) {
  const {data: session}: any = useSession();
  const router = useRouter();
  const goToProfile = () => router.push(`/user/@${session?.user?.id ?? ''}`);
  return(<ProfileAccessSt onClick={goToProfile}>
    <ProfilePic imgurl={imgurl} width='51px' min_height='51px'/>
  </ProfileAccessSt>);
}