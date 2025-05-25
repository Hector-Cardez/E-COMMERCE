import { NavLink } from "react-router-dom";
import cartImage from "../../../image-icon/cart.png";
import styled from "styled-components";
//navigation bar has links to Home, Items for sale, Company About,contact page and the Cart

const NavBar = () => {
  return (
    <>
      <NavContainer>
        <OuterDiv>
          <StyledDiv>
            <StyledNavLink to="/">Home</StyledNavLink>
          </StyledDiv>
          <StyledDiv>
            <StyledNavLink to="/about">About</StyledNavLink>
          </StyledDiv>
          <StyledDiv>
            <StyledNavLink to="/items">Items</StyledNavLink>
          </StyledDiv>
          <StyledDiv>
            <StyledNavLink to="/contacts">Contacts</StyledNavLink>
          </StyledDiv>
          <StyledNavLink to="/cart">
            <CartIcon src={cartImage} alt="shopping-cart" />
          </StyledNavLink>
        </OuterDiv>
      </NavContainer>
    </>
  );
};

const NavContainer = styled.nav`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 5%;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  min-width: 100%;
  padding-top: 2px;
  z-index: 25;
  margin-bottom: 500px;
`;
const OuterDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 95%;
`;
const StyledDiv = styled.div`
  padding: 5px;
  a {
    text-decoration: none;
    text-transform: uppercase;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  &:hover {
    color: white;
    text-decoration: underline;
    font-size: 125%;
    transition: 0.3s ease-in-out;
  }
  &.active {
    text-decoration: underline;
    color: #f1f738;
  }
`;

const CartIcon = styled.img`
  width: 40%;
  height: auto;
  background: rgba(255, 255, 255, 0.7);
  margin-top: 5px;
  margin-right: 20px;
  border-radius: 50%;
  &:hover {
    background: white;
    transition: 0.3s ease-in-out;
  }
  &.active {
    background: white;
    border-radius: 50%;
  }
  max-width: 75px; /* Sets maximum width of cart icon */
  max-height: 75px; /* Sets maximum height of cart icon */

  @media screen and (max-width: 600px) {
    max-width: 30px; /* Adjusts width for smaller screens */
    max-height: 30px; /* Adjusts height for smaller screens */
  }
`;

export default NavBar;
