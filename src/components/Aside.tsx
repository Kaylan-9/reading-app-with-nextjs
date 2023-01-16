import styles from './components.module.css';
import { MdOutlineManageSearch } from 'react-icons/md';

export default function Aside() {
  return (<aside className={styles.aside}>
    <select name="" id="">
      <option value="s">Shōnen</option>
      <option value="se">Seinen</option>
      <option value="sh">Shōjo</option>
      <option value="y">Yaoi</option>
      <option value="y">Yuri</option>
      <option value="y">Josei</option>
    </select>

    <div className={styles.inputicon}>
      <MdOutlineManageSearch/>
      <input type="text" name="" id="" placeholder='pesquisar por nome'/>
    </div>


  </aside>);
}