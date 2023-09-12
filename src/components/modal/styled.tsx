import styled from '@emotion/styled';

export const ModalsSt = styled.ul`
  position: fixed;
  z-index: 1001;
  margin: 0 2em !important;
  bottom: 50px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  row-gap: 10px;
`;

export default styled.div<{width?: string}>`
  align-items: center;
  background-color: rgb(var(--secondary-bg));
  box-shadow: var(--box-shadow-two);
  border-radius: 25px;
  min-width: ${({width})=> width};
  display: flex;
  gap: 10px;
  justify-content: space-between;
  @keyframes animation-modal-button {
    0% {transform: rotate(0deg);}
    100% {transform: rotate(90deg);}
  }
  > .modal-message {
    margin-left: 25px;
  }
  > .modal-button {
    background-color: transparent;
    border: none;
    padding: 25px;
    > svg {
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

