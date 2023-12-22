import { useRecoilState } from "recoil";
import { userState } from "../components/recoils/user";
import { useEffect } from "react";

// export function useUserState() {
//   const [user, setUser] = useRecoilState(userState);

//   const setLoggedInUser = (userData) => {
//     setUser(userData);
//   };

//   return { user, setLoggedInUser };
// }

export function useUserState() {
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {}, [user]);
  const setLoggedInUser = (userData) => {
    setUser({ isLoggedIn: true, userData });
  };

  const logout = () => {
    setUser({ isLoggedIn: false, userData: null });
  };

  return { user, setLoggedInUser, logout };
}

// export function useAdminState() {
//   const [admin, setAdmin] = useRecoilState(userState);

//   const setLoggedInAdmin = (adminData) => {
//     setAdmin({ isLoggedIn: true, adminData });
//   };

//   const logout = () => {
//     setAdmin({ isLoggedIn: false, adminData: null });
//   };

//   return { admin, setLoggedInAdmin, logout };
// }
