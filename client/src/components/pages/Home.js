import styled from "styled-components";
import "../styles/Home.css";
import logoImage from "../../image-icon/logo.png";
//component that holds the code for the home page (first seen when page opens) elements

const Home = () => {
  return (
    <>
      <StyledDiv>
        <div className="containerHome">
          <h2 className="titleHome">
            <span className="title-word title-word-1">Wel</span>
            <span className="title-word title-word-2">come</span>
            <span className="title-word title-word-3">to</span>
            <span className="title-word title-word-4">Sportlab</span>
          </h2>
        </div>
        <StyledImgDiv>
          <div className="img-box">
            <Logo src={logoImage} alt="Sportlab Logo" />
          </div>
        </StyledImgDiv>
      </StyledDiv>
    </>
  );
};

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-items: center;
  position: relative;
  top: 16px;
  border: 3px solid #4456b6;
  background-color: rgba(114, 163, 210, 0.6);
  border-radius: 8px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  max-width: 100%;
  height: 92vh;
  margin-right: 5px;
  margin-left: 5px;
  padding: 0px;
`;

const StyledImgDiv = styled.div`
  position: relative;
  top: -10vh;
  z-index: 1;
`;
const Logo = styled.img`
  display: flex;
  align-items: center;
  z-index: 20;
  width: 100%;
  position: relative;
  top: 15vh;
`;
export default Home;
