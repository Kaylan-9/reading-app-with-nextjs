import { IUserProfileProps } from "@/types/pages/user/components/IUserProfileProps";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { FC, FunctionComponent, ReactNode } from "react";
import { useSession } from 'next-auth/react'
import { css } from "@emotion/css";

const StUserProfile= styled.section`
  display: grid;
  grid-template-columns: max-content auto;
  gap: 5rem;
  padding: 50px 150px;
  figure {
    display: flex;
    align-items: center;
    gap: 2rem;
    img {
      border-radius: 100%;
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
    justify-content: center;
    li > button {
      background-color: transparent;
      border-radius: 15px;
      cursor: pointer;
      color: white;
      font-family: 'Roboto', sans-serif !important;
      font-size: 16px;
      border: none;
      padding: 15px 30px;
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

