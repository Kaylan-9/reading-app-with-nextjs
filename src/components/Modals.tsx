import styled from '@emotion/styled';
import { IModalProps } from '@/types/components/IModalProps';

export const ModalsSt = styled.ul`
  position: fixed;
  z-index: 1001;
  bottom: 50px;
  right: 50px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

export const ModalSt = styled.div`
  align-items: center;
  background-color: rgb(var(--background));
  box-shadow: var(--box-shadow-two);
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

export const Modal = ({message, onClick, btnIcon}: IModalProps) => {
  return (<ModalSt>
    <p className='modal-message'>{message}</p>
    <button className='modal-button' onClick={onClick}> 
      {btnIcon}
    </button>
  </ModalSt>);
};
