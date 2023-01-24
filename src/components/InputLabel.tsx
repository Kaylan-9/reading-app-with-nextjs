import { forwardRef } from "react";
import styles from "@/components/components.module.css";

type InputLabelType = {
  label: string,
  placeholder?: string,
  id?: string
}

const InputLabel = forwardRef(({label, placeholder="", id=""}: InputLabelType, ref: any) => {
  return (<div className={styles.inputlabel} id={id}>
    <label>{label}</label>
    <input type="text" placeholder={placeholder} ref={ref}/>
  </div>);
});

InputLabel.displayName = "InputLabel";

export default InputLabel;