import React, { useEffect } from "react";
import axios from "axios";
import { useUserState } from "./useUserState";
export const useLoginCheck = () => {
  // hooks
  // 쿠키가 있다면 and 로그인이 안되어있다면
  // 쿠키가 있으면 로그인 요청 보내서
  // 다시 유저정보 가져오고
  // 전역 상태로 업데이트

  // if(쿠키가 있다면){
  //     const {data} = axios
  //     .post("http://localhost:4000/users/loginCheck/", loginData, {
  //       withCredentials: "include",
  //     });
  //     setLoggedInUser(data);
  // }
  const { setLoggedInUser } = useUserState();
  const loginCheckHandler = async () => {
    const { data: userData } = await axios.post(
      "http://localhost:4000/users/login/loginCheck",
      { data: "" },
      {
        withCredentials: true,
      }
    );
    console.log("검증데이터", userData);

    if (typeof userData == "object") {
      console.log(userData.payload);
      setLoggedInUser(userData.payload);
    }

    // 값에따라 데이터를 바꾸든
    // 로그인 재유도를 해야함
  };

  useEffect(() => {
    loginCheckHandler();
  }, []);

  return <div></div>;
};
