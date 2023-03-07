import { Modal, ModalsSt } from "@/components/Modals";
import { IPropsModal } from "@/types/contexts/ModalContext/components/IPropsModal";
import { IModal } from "@/types/contexts/ModalContext/IModal";
import { IModalReducerAction } from "@/types/contexts/ModalContext/reducers/IModalReducerAction";
import { IModalReducerState } from "@/types/contexts/ModalContext/reducers/IModalReducerState";
import { TModal } from "@/types/contexts/ModalContext/TModal";
import { Reducer } from "@/types/contexts/Reducer";
import { createContext, ReactNode, useEffect, useReducer, useState, useContext, useRef } from "react";
import { GrClose } from "react-icons/gr";
import CookiePolicy from "@/components/CookiePolicy";
import { CookiePolicyContext } from "./CookiePolicyContext";

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
  handleModal: modalReducer,
  agreement: true, 
  setAgreement: () => null, 
};

export const ModalContext = createContext<IPropsModal>(initialValueModal);

export default function ModalProvider({children}: {children: ReactNode}) {
  const [modal, handleModal] = useReducer<Reducer<IModalReducerState, IModalReducerAction>>(modalReducer, initialValueModalReducer);
  let {agreement}= useContext(CookiePolicyContext);

  useEffect(() => {
    if(agreement===false) {
      handleModal({
        type: 'add', 
        newModal: {
          id: 'terms',
          message: (<CookiePolicy/>)
        }
      });
    }
  }, [agreement])

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