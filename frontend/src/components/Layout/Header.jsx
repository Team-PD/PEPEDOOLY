// import React from "react";
// import styled from "styled-components";

// const HeaderStyle = styled.nav`
//   top: 0;
//   font-size: 15px;
//   width: 100%;
//   height: 100px;
//   background-color: #3bdd3b;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const Header = () => {
//   return (
//     <HeaderStyle>
//       <div>
//         <img
//           src={process.env.PUBLIC_URL + "/assets/PepeDooly.svg"}
//           alt="PepeDoooly"
//         />
//         <a href="/">PepeDooly</a>
//       </div>
//       <ul>
//         <li>
//           <a href="/MEMES"></a>MEMES
//         </li>
//         <li>MEMECHAT</li>
//         <li>DASHBOARD</li>
//       </ul>
//     </HeaderStyle>
//   );
// };

// export default Header;

// const Header = () => {
//   return (
//     <HeaderStyle>
//       <div>
//         <img
//           src={process.env.PUBLIC_URL + "/assets/PepeDooly.svg"}
//           alt="PepeDoooly"
//         />
//         <a href="/">PepeDooly</a>
//       </div>
//       <RightMenu>
//         <MenuItem>
//           <a href="/board">게시판</a>
//         </MenuItem>
//         <MenuItem>
//           <a href="/dashboard">대시보드</a>
//         </MenuItem>
//         <MenuItem>
//           <a href="/login">로그인</a>
//         </MenuItem>
//       </RightMenu>
//     </HeaderStyle>
//   );
// };

// export default Header;

import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom"; // React Router의 Link 컴포넌트 사용

const HeaderStyle = styled.nav`
  top: 0;
  font-size: 15px;
  width: 100%;
  height: 100px;
  background-color: #3bdd3b;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RightMenu = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const MenuItem = styled.li`
  margin-left: 20px;
  color: #fff;
  cursor: pointer;
`;

const Header = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await axios.get("http://localhost:4000/admin/logout");
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("로그아웃 요청 실패", error);
    }
  };

  return (
    <HeaderStyle>
      <div>
        <img
          src={process.env.PUBLIC_URL + "/assets/PepeDooly.svg"}
          alt="PepeDoooly"
        />
        <Link to="/">PepeDooly</Link> {/* Link 컴포넌트로 변경 */}
      </div>

      <ul>
        <li onClick={logout}>로그아웃</li>
      </ul>

      <RightMenu>
        <MenuItem>
          <Link to="/board">게시판</Link> {/* Link 컴포넌트로 변경 */}
        </MenuItem>
        <MenuItem>
          <Link to="/admin">어드민</Link> {/* Link 컴포넌트로 변경 */}
        </MenuItem>
        <MenuItem>
          <Link to="/dashboard">대시보드</Link> {/* Link 컴포넌트로 변경 */}
        </MenuItem>
        <MenuItem>
          <Link to="/login">로그인</Link> {/* Link 컴포넌트로 변경 */}
        </MenuItem>
      </RightMenu>
    </HeaderStyle>
  );
};

export default Header;
