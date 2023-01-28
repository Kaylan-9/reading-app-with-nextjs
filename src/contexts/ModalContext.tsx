import { Modals } from "@/components/sections/Modals";
import { createContext, ReactNode, useReducer, use } from "react";

export type TModal = {
  id?: number,
  message: string | ReactNode,
  time?: number,
  function?: () => void
};
export interface IModal extends Required<TModal> {};
export interface IModalReducerState {
  modals: IModal[];
};
export interface IModalReducerAction {
  type: string;
  newModal?: TModal;
  id?: number;
};
export type IModalReducer<State, Action> = (state: State, action: Action) => State;

export interface IPropsModal {
  modal: IModalReducerState;
  handleModal: any;
};
const initialValueModalReducer: IModalReducerState = {
  modals: [{
    id: 0,
    message: 'iniciando aplicação 🐲👹🐇',
    time: 9000,
    function () {}
  }]
};

export function modalReducer(state: IModalReducerState, action: IModalReducerAction): IModalReducerState {
  const { type } = action;
  const { modals } = state;
  if(type==='reset')
    return initialValueModalReducer;
  else if(type==='add') {
    const { newModal } = action;
    return (
      newModal!==undefined ? 
      {modals: [...modals, {
        ...newModal, 
        id: modals.length,
        time: 10000,
        function() {}
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
  const [modal, handleModal] = useReducer<IModalReducer<IModalReducerState, IModalReducerAction>>(modalReducer, initialValueModalReducer);
  return (<ModalContext.Provider value={{modal, handleModal}}>
    {children}
    <Modals modals={modal.modals}/>
  </ModalContext.Provider>);
};