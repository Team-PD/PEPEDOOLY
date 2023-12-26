import { atom } from "recoil";

// export const userState = atom({
//   key: "userState",
//   default: null, // 초기값은 로그인되어 있지 않음을 의미
// });

export const userState = atom({
  key: "userState",
  default: {
    isLoggedIn: false,
    userData: null,
  },
});

// export const adminState = atom({
//   key: "adminState",
//   default: {
//     isLoggedIn: false,
//     adminData:  null,
//   },
// });
