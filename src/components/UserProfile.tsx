import { IUserProfileProps } from "@/types/pages/user/components/IUserProfileProps";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React from "react";
import { useSession } from 'next-auth/react'

const StUserProfile= styled.section`
  display: grid;
  grid-template-columns: max-content auto;
  gap: 5rem;
  padding: 1em;
  border-radius: 1em;
  background-color: rgb(var(--background)) !important;
  figure {
    display: flex;
    align-items: center;
    gap: 2rem;
    img {
      border-radius: 1.5rem;
      width: 5rem;
    }
    figcaption {
      font-weight: bold;
      font-size: 20px;
    }
  }
  .options-menu {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: 1em;
    li > button {
      background-color: rgb(var(--secondary-background)) !important;
      color: var(--secondary-foreground) !important;
      border-radius: 1em;
      cursor: pointer;
      font-family: 'Roboto', sans-serif !important;
      font-size: 16px;
      border: none;
      padding: 1em;
    }   
  }
`;

function UserProfile({userData, selection, options}: IUserProfileProps) {
  const { data: session }: { data: any } = useSession();
  const { query: { idUser } } = useRouter();
  return (<StUserProfile>
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
  </StUserProfile>);
};

export default UserProfile;

