import { ReactNode } from "react";

export type TModal = {
  id?: number | string,
  message: string | ReactNode | any,
  time?: number,
  function?: () => void
};