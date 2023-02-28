import { Modal, ModalsSt } from "@/components/sections/Modals";
import { IPropsModal } from "@/types/contexts/ModalContext/components/IPropsModal";
import { IModal } from "@/types/contexts/ModalContext/IModal";
import { IModalReducerAction } from "@/types/contexts/ModalContext/reducers/IModalReducerAction";
import { IModalReducerState } from "@/types/contexts/ModalContext/reducers/IModalReducerState";
import { TModal } from "@/types/contexts/ModalContext/TModal";
import { Reducer } from "@/types/contexts/Reducer";
import requestParameters from "@/ultis/requestParameters";
import { css } from "@emotion/css";
import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { GrClose } from "react-icons/gr";

const initialValueModalReducer: IModalReducerState = {
  modals: []
};

export function modalReducer(state: IModalReducerState, action: IModalReducerAction): IModalReducerState {
  const { type } = action;
  const { modals } = state;
  console.log(type);
  if(type==='reset')
    return initialValueModalReducer;
  else if(type==='add') {
    const { newModal } = action;
    return (
      newModal!==undefined && 
      (newModal.id===undefined || (newModal.id!==undefined && !modals.map((modal: IModal) => modal.id).includes(newModal.id))) ?
        {modals: [...modals, {
          id: (newModal.id===undefined ? modals.length : newModal.id),
          time: 10000,
          function() {},
          ...newModal, 
        }]}:
      state 
    );
  } else if(type==='remove') {
    const { id } = action;
    return (id!==undefined ? {modals: modals.filter((modal: IModal) => modal.id!==id)} : state);
  }
  return state;
};

const initialValueModal = {
  modal: initialValueModalReducer,
  handleModal: modalReducer
};

export const ModalContext = createContext<IPropsModal>(initialValueModal);

export default function ModalProvider({children}: {children: ReactNode}) {
  const [modal, handleModal] = useReducer<Reducer<IModalReducerState, IModalReducerAction>>(modalReducer, initialValueModalReducer);
  const [ acceptedTerms, setAcceptedTerms ] = useState<boolean>(true);
  
  useEffect(()=> {
    (async () => {
      const acceptedTermsReq= await fetch(`/api/cookies/acceptedterms`, requestParameters.json);
      const acceptedTermsRes: {acceptedterms: boolean}= await acceptedTermsReq.json();
      setAcceptedTerms(acceptedTermsRes.acceptedterms);
    })();
  }, []);
  
  useEffect(() => {
    if(!acceptedTerms) {
      handleModal({
        type: 'add', 
        newModal: {
          id: 'terms',
          message: (
            <div className={css`
              max-width: 40em;
              display: flex;
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
              `}>
              <h3>Termos de serviço</h3>
              <p>Segundo "A Lei Geral de Proteção de Dados Pessoais, Lei nº 13.709/2018" é obrigatório que os usuários tenham conhecimento da finalidade, assim como dos dados armazenados em <strong>sites Web</strong>. </p>
              <p>Esta página mantém somente dados necessários a aplicação, e que foram disponibilizados, por meio do uso consciente do uso desta mesma. </p>
              <p>Os dados presentes somente nela dizem respeito a identificação de seus elementos e usuários, faça login, assim como sessões de acesso. Ou seja, ela apresenta dados pessoais de seus usuários, como nome, senha, e-mail, fotos, marcações de favorito, considere-se também as imagens dos "posts" realizados, título, descrição, usuário pertencente e categoria.</p>
              <button onClick={async () => {
                const request= await fetch('/api/cookies/policy', {
                  ...requestParameters.json,
                  body: JSON.stringify({cookies: true})
                });
                const response= await request.json();
                setAcceptedTerms(response.success);
                handleModal({type: 'remove', id: 'terms'});
              }}>
                Aceitar
              </button>
            </div>
          )
        }
      })
    }
  }, [acceptedTerms])

  return (<ModalContext.Provider value={{modal, handleModal}}>
    {children}
    <ModalsSt>
      {modal.modals.map((modal: TModal, indice: number) => {
        const { id, message } = modal;
        const key = String(message ?? 'modal').replace(/s/g, '')+id;
        return (<li key={key}>
          <Modal 
            id={id}
            message={message} 
            btnIcon={<GrClose/>}
            onClick={() => {
              handleModal({type: 'remove', id: Number(id)});
            }}
          />
        </li>);
      })}
    </ModalsSt>
  </ModalContext.Provider>);
};