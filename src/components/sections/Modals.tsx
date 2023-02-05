import { IModalReducerState as ModalsProps, ModalContext, TModal } from '../../contexts/ModalContext';
import styled from '@emotion/styled';
import { useContext } from 'react';
import { GrClose } from 'react-icons/gr';
import { IModalProps } from '@/types/components/IModalProps';

const ModalsSt = styled.ul`
  position: absolute;
  z-index: 1001;
  bottom: 50px;
  right: 50px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const ModalSt = styled.div`
  align-items: center;
  background-color: rgb(var(--secondary-background));
  border-radius: 25px;
  min-width: 700px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  @keyframes animation-modal-button {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(90deg);
    }
  }
  & > .modal-message {
    margin-left: 25px;
  }
  & > .modal-button {
    background-color: transparent;
    border: none;
    padding: 25px;
    & > svg {
      transition: transform 1s;
      cursor: pointer;
      &:hover {
        animation: animation-modal-button 1s;  
      }
      & > * {
        color: white;
        stroke: white;
      }
    }
  }
`;

const Modal = ({message, onClick, btnIcon}: IModalProps) => {
  return (<ModalSt>
    <p className='modal-message'>{message}</p>
    <button className='modal-button' onClick={onClick}> 
      {btnIcon}
    </button>
  </ModalSt>);
};

export function Modals({modals}: ModalsProps) {
  const { handleModal } = useContext(ModalContext);
  return (
    <ModalsSt>
      {modals.map((modal: TModal, indice: number) => {
        const {id, message} = modal;
        const key = String(message ?? 'modal').replace(/s/g, '')+id;
        return (<li key={key}>
          <Modal 
            id={id}
            message={message} 
            btnIcon={<GrClose/>}
            onClick={() => {
              handleModal({type: 'remove', id});
            }}
          />
        </li>);
      })}
    </ModalsSt>
  );
}
