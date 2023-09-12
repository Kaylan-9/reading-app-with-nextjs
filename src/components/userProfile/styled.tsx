import styled from 'styled-components';

export default styled.section`
  display: grid;
  grid-template-columns: max-content auto;
  gap: 5rem;
  padding: 1em;
  border-radius: 1em;
  background-color: rgb(var(--bg)) !important;
  @media(max-width: 400px){
    gap: 2rem;
    padding: .75em;
    grid-template-columns: initial;
    .options-menu {
      justify-content: center !important;
    }
  }
  figure {
    display: flex;
    align-items: center;
    gap: 2rem;
    img {
      border-radius: 1.5rem;
      width: 5rem;
    }
    figcaption {
      font-weight: bold;
      font-size: 20px;
    }
  }
  .options-menu {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: 1em;
    li > button {
      background-color: rgb(var(--secondary-bg)) !important;
      color: var(--secondary-fg) !important;
      border-radius: 1em;
      cursor: pointer;
      font-family: 'Roboto', sans-serif !important;
      font-size: 16px;
      border: none;
      padding: 1em;
    }   
  }
`;
