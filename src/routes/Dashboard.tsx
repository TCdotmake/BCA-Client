import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const URL = "http://localhost:3000";
export default function Dashboard() {
  const navigate = useNavigate();
  const getUserInfo = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("myToken") || "");
    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let info = {};
    fetch(`${URL}/user/me`, requestOptions)
      .then((res) => {
        if (res.status != 200) {
          return undefined;
        }
        return res.json();
      })
      .then((result) => {
        info = result;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        if (info) {
          console.log(info);
        } else {
          navigate("../login");
        }
      });
  };

  useEffect(getUserInfo, []);
  return (
    <>
      <h2>Dashboard</h2>
    </>
  );
}
