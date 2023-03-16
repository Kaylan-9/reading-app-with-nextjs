import { CookiePolicyContext } from '@/contexts/CookiePolicyContext';
import { ModalContext } from '@/contexts/ModalContext';
import requestParameters from '@/ultis/requestParameters';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React, { useContext } from 'react';

const Styled= styled(motion.div)`
  display: flex;
  align-items: flex-start;
  flex-flow: column wrap;
  gap: 1em;
  padding: 2em 0;
  h3 {
    margin-bottom: 1em; 
  }
  p {
    line-height: 1.5em;
    text-align: justify;
  }
`;

export interface ICookiePolicy {
  css?: string;
  variants?: any;
};

export default function CookiePolicy({css, variants}: ICookiePolicy) {
  const { handleModal} = useContext(ModalContext);
  const { setAgreement, agreement } = useContext(CookiePolicyContext);

  return (<Styled 
    variants={variants} 
    initial={`initial`}
    whileInView={`whileInView`}
    transition={{
      delay: .25
    }} 
    className={css}
  >
    <h3>Termos de serviço</h3>
    <p>Segundo &ldquo;A Lei Geral de Proteção de Dados Pessoais, Lei nº 13.709/2018&ldquo; é obrigatório que os usuários tenham conhecimento da finalidade, assim como dos dados armazenados em <strong>sites Web</strong>. </p>
    <p>Esta página mantém somente dados necessários a aplicação, e que foram disponibilizados, por meio do uso consciente do uso desta mesma. </p>
    <p>Os dados presentes somente nela dizem respeito a identificação de seus elementos e usuários, faça login, assim como sessões de acesso. Ou seja, ela apresenta dados pessoais de seus usuários, como nome, senha, e-mail, fotos, marcações de favorito, considere-se também as imagens dos &ldquo;posts&ldquo; realizados, título, descrição, usuário pertencente e categoria.</p>
    {
      !agreement ? (<button onClick={async () => {
        const request= await fetch('/api/cookies/policy', {
          ...requestParameters.json,
          body: JSON.stringify({cookies: true})
        });
        const response= await request.json();
        setAgreement(response.success);
        handleModal({type: 'remove', id: 'terms'});
      }}>
        Aceitar
      </button>) : null
    }
  </Styled>)
}