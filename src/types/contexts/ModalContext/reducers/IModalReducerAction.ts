import { TModal } from "../TModal";

export interface IModalReducerAction {
  type: string;
  newModal?: TModal;
  id?: number;
};