import styled from "@emotion/styled";

const ProfilePic = styled.div<{imgurl: string}>`
  border-radius: 35%;
  cursor: pointer;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  background-image: url(${({imgurl}) => imgurl});
`;

export default ProfilePic;