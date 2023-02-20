import { ReactNode } from 'react';
import { TModal } from '../contexts/ModalContext/TModal';

export interface IModalProps extends TModal {
  onClick: () => void;
  btnIcon: ReactNode;
};