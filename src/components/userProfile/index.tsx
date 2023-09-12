import { IUserProfileProps } from "@/types/pages/user/components/IUserProfileProps";
import { useRouter } from "next/router";
import React from "react";
import { useSession } from 'next-auth/react'
import UserProfile from './styled';

export default ({userData, selection, options}: IUserProfileProps) => {
  const { data: session }: { data: any } = useSession();
  const { query: { idUser } } = useRouter();
  return (<UserProfile>
    <figure>
      <img src={userData.image as string} alt={`Imagem de perfil`} />
      <figcaption>{userData.name}</figcaption>
    </figure>
    <ul className={`options-menu`}>
      {options.map((option, indice) => {
        return (((
          option?.user && typeof idUser==='string' && typeof session?.user?.id==='string' &&
          session.user.id==idUser.replace(/@/, '')
        ) || (option?.user===undefined)) && selection.condi!==indice) ?(<li key={option.name+indice}>
          <button onClick={() => {              
            selection.func(indice);
            if(typeof option.onClick==='function') option.onClick();
          }}>
            {option.name}
          </button>
        </li>) : null;
      })}
    </ul>
  </UserProfile>);
};