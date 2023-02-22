import styled from "@emotion/styled";
import { BsGithub } from "react-icons/bs";

export const StFooter = styled.footer`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  box-shadow: 0px 0px 50px 1px rgba(0, 0, 0, 0.25);
  margin-top: 300px;
  padding: 50px 0;
  .presentation {
    > p {
      font-family: var(--font-one);
      margin: 0 auto;
      max-width: 700px;
      text-align: justify;
      font-size: 20px;
      text-indent: 40px;
      line-height: 60px;
    }
    > a {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 40px 0;
      text-align: center;
      justify-content: center;
      > span {font-weight: bolder}
      > span, & > svg > * {
        color: #ffffff;
        stroke: #ffffff;
      }
    }
    @media(max-width:700px) {
      padding: 10px;
      > p {
        min-width: 0px;
        margin: 10px;
      }
    }
  }
`;

export default function Footer() {
  return (<StFooter id={`about`}>
    <div className={`presentation`}>
      <p><strong>Seja bem vindo ao aplicativo de leitura </strong> um meio confortável e reponsivo aos seus usuários.</p>
      <p>Por meio desta página <strong> WEB </strong> ou  <strong> APP </strong> 🦄🌈 é possível ler histórias em quadrinhos, entretanto, aquelas que estão em domínio publico. Sinta-se a vontade para testar o sistema, e em caso de problemas entre em contanto.</p>  
      <a href="https://github.com/Kaylan-9">
        <span>DEV. Kaylan</span>
        <BsGithub/>
      </a>
    </div>
  </StFooter>)
}