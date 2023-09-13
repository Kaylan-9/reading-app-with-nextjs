import { CookiePolicyContext } from '@/contexts/CookiePolicyContext';
import { ModalContext } from '@/contexts/ModalContext';
import Button from '@/styles/Button';
import requestParameters from '@/utils/requestParameters';
import React, { useContext } from 'react';
import CookiePolicy from './styled';

export interface ICookiePolicy {
  css?: string;
  variants?: any;
};

export default ({css, variants}: ICookiePolicy) => {
  const { handleModal} = useContext(ModalContext);
  const { setAgreement, agreement } = useContext(CookiePolicyContext);

  return (<CookiePolicy
    variants={variants} 
    initial={`initial`}
    whileInView={`whileInView`}
    transition={{
      delay: .25
    }} 
    className={css}
  >
    <h2>Termos de serviço</h2>
    <p>Segundo &ldquo;A Lei Geral de Proteção de Dados Pessoais, Lei nº 13.709/2018&ldquo; é obrigatório que os usuários tenham conhecimento da finalidade, assim como dos dados armazenados em <strong>sites Web</strong>. </p>
    <p>Esta página mantém somente dados necessários a aplicação, e que foram disponibilizados, por meio do uso consciente do uso desta mesma. </p>
    <p>Os dados presentes somente nela dizem respeito a identificação de seus elementos e usuários, faça login, assim como sessões de acesso. Ou seja, ela apresenta dados pessoais de seus usuários, como nome, senha, e-mail, fotos, marcações de favorito, considere-se também as imagens dos &ldquo;posts&ldquo; realizados, título, descrição, usuário pertencente e categoria.</p>
    {
      !agreement ? (<Button onClick={async () => {
        const request= await fetch('/api/cookies/policy', {
          ...requestParameters.json,
          body: JSON.stringify({cookies: true})
        });
        const response= await request.json();
        setAgreement(response.success);
        handleModal({type: 'remove', id: 'terms'});
      }}>
        Aceitar
      </Button>) : null
    }
  </CookiePolicy>)
}