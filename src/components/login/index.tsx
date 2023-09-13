import { useRef, useCallback, FormEvent, useContext, MouseEvent, useEffect, useState } from "react";
import InputLabel from "@/components/ultis/InputLabel";
import { FcGoogle } from 'react-icons/fc';
import { signIn } from "next-auth/react";
import { ModalContext } from "@/contexts/ModalContext";
import requestParameters from "@/utils/requestParameters";
import useProviders from "@/hooks/useProviders";
import Login from './styled';

export default ({setActiveLogin}: {setActiveLogin: (state: boolean) => void}) => {
  let providers = useProviders();
  const input_username = useRef<HTMLInputElement>(null);
  const input_usernameoremail = useRef<HTMLInputElement>(null);
  const input_password = useRef<HTMLInputElement>(null);
  const {handleModal} = useContext(ModalContext);
  const [newUser, setNewUser] = useState<boolean>(false);

  const handleLogin = useCallback(async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();  
    if(input_password.current!==null && input_username.current!==null) {
      let ok = !newUser;
      const 
        password= input_password.current.value,
        name= input_username.current.value;
      if(newUser && input_usernameoremail.current!==null) {
        const email = input_usernameoremail.current.value;
        const createNewUser= await fetch('/api/user/', {
         ...requestParameters.json,
          body: JSON.stringify({
            name,
            email,
            password
          })
        });
        const newUserResponse = await createNewUser.json();
        if(newUserResponse.error===null) ok = true;
      } 
      if(ok) {
        const options = {
          redirect: false, 
          name, password    
        };
        const response = await signIn('credentials', options);
        if(response?.error) handleModal({type: 'add',  newModal: {message: (<strong>{response.error} 🔥</strong>)}});
      }
    }
  }, [newUser]);

  return (<Login onClick={(e: MouseEvent<HTMLDivElement>) => {
    const {clientX}= e;
    const clientRect= e.currentTarget.querySelector('form')?.getBoundingClientRect();
    const leftForm = clientRect?.left ?? false;
    const rightForm = clientRect?.right ?? false;
    
    if((leftForm && clientX<leftForm) || (rightForm && clientX>rightForm)) setActiveLogin(false);
    
  }}>
    <form>
      <h3>Login</h3>  
      {newUser ?
        (<InputLabel ref={input_usernameoremail} label="usuário" placeholder={`${!newUser ? 'nome ou ' : ''}@e-mail de entrada`} area={`usernameoremail`}/>) :
        null
      }
      <InputLabel ref={input_username} type='text' label="nome" placeholder="nome do usuário" area={`username`}/>
      <InputLabel ref={input_password} type='password' label="senha" placeholder='senha de usuário' area={`userpassword`}/>
      <input type="button" onClick={handleLogin} value={newUser ?
        'cadastrar' :
        'Logar'
      }/>
      <button type='button' className='access-btn' onClick={() => setNewUser(oldNewUser => !oldNewUser)}>
        {!newUser ?
          'criar uma nova conta' :
          'logar'
        }
      </button> 
      <strong>ou logar com</strong>
      <button type='button' className='access-btn' onClick={() => signIn('google')}><FcGoogle/></button>
    </form>
  </Login>);
}