import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';
import ProfilePic from "./ProfilePic";
import { IProfileAccessProps } from "@/types/components/IProfileAccessProps";
import { css } from "@emotion/css";
import Button from "@/styles/Button";

const ProfileAccessSt = styled(Button)`
  justify-content: space-between;
  padding: 0 !important;
`;

export default function ProfileAccess({imgurl}: IProfileAccessProps) {
  const {data: session}: any = useSession();
  const router = useRouter();
  const goToProfile = () => router.push(`/user/@${session?.user?.id ?? ''}`);
  return(<ProfileAccessSt onClick={goToProfile}>
    <ProfilePic imgurl={imgurl} className={css`
      width: 51.19px;
      min-height: 51.19px;
      @media(max-width: 700px) {
        width: 46.38px;
        min-height: 46.38px;
      }
    `}/>
  </ProfileAccessSt>);
}