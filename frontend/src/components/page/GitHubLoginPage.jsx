import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../../recoil/User";

const GitHubLoginPage = () => {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const getAccessToken = async () => {
      if (code) {
        try {
          const response = await fetch(
            "http://localhost:4000/auth/github/callback",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                code,
              }),
            }
          );
          const result = await response.json();
          setUser(result);
          console.log(result);
        } catch (error) {
          console.error("GitHub OAuth failed:", error);
        }
      }
    };
    getAccessToken();
  }, [setUser]);

  return <div>Processing GitHub Login...</div>;
};

export default GitHubLoginPage;
