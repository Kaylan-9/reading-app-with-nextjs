import { forwardRef } from "react";
import styles from "@/components/components.module.css";

type InputLabelType = {
  label: string,
  placeholder?: string,
}

export default forwardRef(({label, placeholder=""}: InputLabelType, ref: any) => {
  return (<div className={styles.inputlabel}>
    <label>{label}</label>
    <input type="text" placeholder={placeholder} ref={ref}/>
  </div>);
});
