import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';
import ProfilePic from "../../styles/ProfilePic";
import { IProfileAccessProps } from "@/types/components/IProfileAccessProps";
import { css } from "@emotion/css";
import ProfileAccess from "./styled";

export default ({imgurl}: IProfileAccessProps) => {
  const {data: session}: any = useSession();
  const router = useRouter();
  const goToProfile = () => router.push(`/user/@${session?.user?.id ?? ''}`);
  return(<ProfileAccess onClick={goToProfile}>
    <ProfilePic imgurl={imgurl} className={css`
      width: 51.19px;
      min-height: 51.19px;
      @media(max-width: 700px) {
        width: 46.38px;
        min-height: 46.38px;
      }
    `}/>
  </ProfileAccess>);
};