import styled from "@emotion/styled";

export default (styled.div`
  max-width: var(--max-width);
  width: 100%;
  padding: 0 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  @media(max-width:700px) {
    padding: 0px;
  }
  > h2 {
    margin-bottom: 100px;
    text-align: center;
    background: white;
    font-weight: bold;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: flex !important;
    align-items: center;
    gap: 1.5rem;
    a {
      color: var(--secondary-foreground) !important;
      font-weight: lighter;
      font-size: .8em;
      text-decoration: var(--secondary-foreground) underline  !important;
    }
    @media(max-width: 700px) {
      margin-bottom: 0;
    }
  }
  > ul {
    margin: 5em 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    row-gap: 65px;
    column-gap: 50px;
    width: 100%;
    padding: 0 50px;
    > li {
      margin: 0 auto;    
      cursor: pointer;
    }
  }
`);