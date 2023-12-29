import React from "react";
import styled from "styled-components";

const FooterStyle = styled.footer`
  /* position: fixed; */
  /* bottom: 0; */
  font-size: 15px;
  width: 100%;
  height: 200px;
  min-height: 10vh;
  /* padding-bottom: 10px; */
  background-color: #073407;
  color: yellow;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 999999999999;
`;

const ContactSection = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const ListSection = styled.div`
  display: flex;
  flex-direction: row;
`;

const List = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 50px;
`;

const Footer = () => {
  return (
    <FooterStyle>
      <ContactSection>
        <div>
          <h2>CONTACT</h2>
          <h2>PEPEDOOLY</h2>
        </div>
        <ListSection>
          <div>
            <List>
              <li>트위터</li>
              <li>텔레그램</li>
              <li>디스코드</li>
              <li>깃허브</li>
            </List>
          </div>
        </ListSection>
      </ContactSection>
      <div>
        $$PEPEDOOLY team has created a meme board to operate as a free
        discussion platform for various meme tokens and meme token holders. This
        space aims to foster open discussions about memes, allowing you to
        showcase your memes and explore more meme opportunities!
      </div>
      <div>
        2023 @ PEPEDOOLY Finance, an anon community, brand, and movement
      </div>
      <div></div>
    </FooterStyle>
  );
};

export default Footer;
