import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const URL = "http://localhost:3000";
export default function Dashboard() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const getUserInfo = () => {
    const myHeaders = new Headers();

    myHeaders.append("Authorization", localStorage.getItem("myToken") || "");
    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    interface UserData {
      name: string;
      email: string;
    }

    let info: UserData;

    fetch(`${URL}/user/me`, requestOptions)
      .then((res) => {
        console.log(res);
        if (res.status != 200) {
          localStorage.setItem("myToken", "");
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
          setName(info.name);
          setEmail(info.email);
        } else {
          navigate("../login");
        }
      });
  };

  useEffect(getUserInfo, []);
  return (
    <>
      <h2>Dashboard</h2>
      <div>
        <h3>My profile</h3>
        {name && <p>{name}</p>}
        {email && <p>{email}</p>}
        <button>Change Password</button>
      </div>
      <Link to="../sessions">Sessions</Link>
    </>
  );
}
