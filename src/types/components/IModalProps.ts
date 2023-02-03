import { TModal } from '@/contexts/ModalContext';
import { ReactNode } from 'react';

export interface IModalProps extends TModal {
  onClick: () => void;
  btnIcon: ReactNode;
};