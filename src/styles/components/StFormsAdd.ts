import styled from "@emotion/styled";

export default styled.div`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  margin-bottom: 5rem;
  padding: 0 150px;
  > .btn-add-book {
    padding: 15px;
  }
  > .form-add-book {
    display: grid;
    grid-template-columns: 260px auto min-content;
    grid-template-rows: repeat(3, auto);
    grid-template-areas: 
      'addbookbutton .'
      'booknameinputandlabel bookdescriptiontextarea'
      'bookcategoryselect bookdescriptiontextarea'
      'selectedimages selectedimages'
    ;
    gap: 20px;
    width: 100%;
  }
`;