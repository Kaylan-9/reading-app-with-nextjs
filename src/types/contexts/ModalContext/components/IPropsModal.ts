import { IModalReducerState } from "../reducers/IModalReducerState";
import { IModalReducerAction } from "../reducers/IModalReducerAction";

export interface IPropsModal {
  modal: IModalReducerState;
  handleModal: any;
};