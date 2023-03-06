import styled from "@emotion/styled";

const ProfilePic = styled.div<{width: string, min_height: string, imgurl: string}>`
  border-radius: 100%;
  cursor: pointer;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  background-image: url(${({imgurl}) => imgurl});
  min-height: ${({min_height}) => min_height};
  width: ${({width}) => width};;
`;

export default ProfilePic;