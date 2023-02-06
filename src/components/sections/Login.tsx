import { useRef, useCallback, FormEvent, useContext, MouseEvent, useEffect, useState } from "react";
import InputLabel from "@/components/ultis/InputLabel";
import styled from "@emotion/styled";
import { FcGoogle } from 'react-icons/fc';
import { signIn } from "next-auth/react";
import { ModalContext } from "@/contexts/ModalContext";

const LoginSt = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  width: 100%;
  position: fixed;
  z-index: 1000;
  form {
    transition: left 1s;
    position: relative;
    transform: translateX(-100%);
    display: flex;
    left: 100%;
    flex-direction: column;
    gap: 30px;
    max-width: 450px; 
    width: 100%;
    background-color: rgb(var(--secondary-background));
    padding: 40px 30px !important;
    min-height: 100vh;
    align-items: center;
    @keyframes Openlogin {
      0% {
        left: calc(100% + 200px);
      }
      100% {
        left: 100%;
      }
    } 
    animation: 1s Openlogin cubic-bezier(0.3, 0.05, 0.795, 0.035);
    div {
      gap: 12px !important;
      input[type=text] {
        padding: 15px !important;
      }
    }
    .access-btn, input[type="button"] {
      padding: 15px 30px;
      border-radius: 30px;
      border: none;
      background-color: #2e2b2b !important;
      color: white;
      font-weight: bold;
      font-family: var(--font-one);
      font-size: 15px;
      cursor: pointer;
    }
  }  
`;

export default function Login({setActiveLogin}: {setActiveLogin: (state: boolean) => void}) {
  const input_username = useRef<HTMLInputElement>(null);
  const input_usernameoremail = useRef<HTMLInputElement>(null);
  const input_password = useRef<HTMLInputElement>(null);
  const [providers, setProviders] = useState<any>([]);
  const {handleModal} = useContext(ModalContext);
  const [newUser, setNewUser] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const request = await fetch('/api/providers', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      });
      const responseData = await request.json();
      setProviders(responseData?.providers); 
    }
    
    getData();
  }, []);

  const handleLogin = useCallback(async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();  
    if(input_password.current!==null && input_username.current!==null) {
      let ok = !newUser;
      const 
        password= input_password.current.value,
        name= input_username.current.value;
      if(newUser && input_usernameoremail.current!==null) {
        const email = input_usernameoremail.current.value;
        console.log(password, email, name);
        const createNewUser= await fetch('/api/user/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
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
        console.log(response)
        if(response?.error) handleModal({type: 'add',  newModal: {message: (<strong>{response.error} 🔥</strong>)}});
      }
    }
  }, [newUser]);

  return (<LoginSt onClick={(e: MouseEvent<HTMLDivElement>) => {
    const {clientX} = e;
    const leftForm = e.currentTarget.querySelector('form')?.getBoundingClientRect().left ?? false;
    if(leftForm && clientX<leftForm) setActiveLogin(false);
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
      {Object.values(providers)?.map(({name, id}: any) => (name==='Google' ?
        (<button key={name} className='access-btn' onClick={() => signIn(id)}>
          {name==='Google' ? (<FcGoogle/>) : `Sign in with ${name}`}
        </button>)
      : null))}
    </form>
  </LoginSt>);
}