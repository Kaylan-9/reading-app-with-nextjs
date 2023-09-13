import styled from "@emotion/styled";

export default styled.div`
  width: 100vw;
  height: 100vh;
  top: 0%;
  left: 0%;
  position: fixed;
  z-index: 1000;
  backdrop-filter: blur(2px); 
  background-color: rgba(0, 0, 0, 0.637);
  filter: blur(0px);
  form {
    position: relative;
    border: solid var(--border-color) 1px;
    border-radius: 2em;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    gap: 30px;
    max-width: 450px; 
    width: 100%;
    background-color: var(--fourth-bg);
    padding: 40px 30px !important;
    align-items: center;
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