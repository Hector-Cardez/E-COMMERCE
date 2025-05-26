import styled from "styled-components";
//component that holds the information for the footer of the website
const Footer = () => {
  return (
    <>
      <footer>
        <StyledDiv>
          <StyledP>Copyright &copy; 2024 SportLab</StyledP>
        </StyledDiv>
      </footer>
    </>
  );
};

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  font-family: "Roboto", sans-serif;
  min-width: 95%;
  margin: 0px;
  bottom: 38px;
  z-index: 25;
`;
const StyledP = styled.p`
  color: white;
  margin: 0px;
`;
export default Footer;
