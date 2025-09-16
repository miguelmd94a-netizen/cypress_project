import { Button } from "@material-ui/core";
import { navigate } from "@reach/router";
import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "../Context";

const MobileNav = () => {
  const { isAuth, removeAuth } = useContext(Context);
  return (
    <Nav>
      {!isAuth ? (
        <>
          <HomeButton
            variant="outlined"
            style={{ color: "#fff", borderColor: "#fff", marginRight: 10 }}
            onClick={() => navigate("login")}
          >
            LOGIN
          </HomeButton>
          <HomeButton
            variant="contained"
            style={{ background: "#fff", color: "#364f74", fontWeight: "bold" }}
            onClick={() => navigate("/signup")}
          >
            CREATE ACCOUNT
          </HomeButton>
        </>
      ) : (
        <>
          <HomeButton
            variant="outlined"
            style={{ color: "#fff", borderColor: "#fff", marginRight: 10 }}
            onClick={() => navigate("/cases")}
          >
            My Cases
          </HomeButton>
          <HomeButton
            variant="outlined"
            style={{ color: "#fff", borderColor: "#fff" }}
            onClick={removeAuth}
          >
            Log out
          </HomeButton>
        </>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  height: 64px;
  background: #2f4f77;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const HomeButton = styled(Button)`
  font-size: 12px !important;
  text-align: center;
  padding: 5px !important;
  font-weight: 600;
  & span {
    letter-spacing: 1.25px;
  }
`;

export default MobileNav;
