import { Modals } from "@/components/sections/Modals";
import { IPropsModal } from "@/types/contexts/ModalContext/components/IPropsModal";
import { IModal } from "@/types/contexts/ModalContext/IModal";
import { IModalReducerAction } from "@/types/contexts/ModalContext/reducers/IModalReducerAction";
import { IModalReducerState } from "@/types/contexts/ModalContext/reducers/IModalReducerState";
import { TModalReducer } from "@/types/contexts/ModalContext/reducers/TModalReducer";
import { createContext, ReactNode, useReducer } from "react";

const initialValueModalReducer: IModalReducerState = {
  modals: []
};

export function modalReducer(state: IModalReducerState, action: IModalReducerAction): IModalReducerState {
  console.log(action);
  const { type } = action;
  const { modals } = state;
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
  } else 
    return state;
};
const initialValueModal = {
  modal: initialValueModalReducer,
  handleModal: modalReducer
};

export const ModalContext = createContext<IPropsModal>(initialValueModal);
export default function ModalProvider({children}: {children: ReactNode}) {
  const [modal, handleModal] = useReducer<TModalReducer<IModalReducerState, IModalReducerAction>>(modalReducer, initialValueModalReducer);

  return (<ModalContext.Provider value={{modal, handleModal}}>
    {children}
    <Modals modals={modal.modals}/>
  </ModalContext.Provider>);
};