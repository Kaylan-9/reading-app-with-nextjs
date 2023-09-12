import { IModalProps } from "@/types/components/IModalProps";
import Modal from './styled';

export default ({message, onClick, btnIcon, width}: IModalProps) => {
  return (<Modal width={width}>
    <p className='modal-message'>{message}</p>
    <button className='modal-button' onClick={onClick}> 
      {btnIcon}
    </button>
  </Modal>);
};
