import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { URL } from "../dev/const";
const PASSMINLEN = 7;

export default function Login() {
  const [feedback, setFeedback] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendLogin({ email, password }, URL);
  };

  interface UserLogin {
    email: string;
    password: string;
  }

  function sendLogin(user: UserLogin, url: string) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(user);

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    setFeedback("Loading");
    let msg = "";

    fetch(`${url}/user/login`, requestOptions)
      .then((response) => {
        if (response.status != 200) {
          return undefined;
        }
        return response.json();
      })
      .then((result) => {
        if (!result) {
          msg = "Login failed";
        } else {
          msg = "Login!";
          localStorage.setItem("myToken", result.token);
          navigate("../dashboard");
        }
        console.log(result);
      })
      .catch((error) => console.error(error))
      .finally(() => setFeedback(msg));
  }

  useEffect(() => {
    setFeedback("");
    if (validator.isEmail(email) && password.length >= PASSMINLEN) {
      document.getElementById("loginSubmit")?.removeAttribute("disabled");
    } else {
      document.getElementById("loginSubmit")?.setAttribute("disabled", "true");
    }
  }, [email, password]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" onChange={handleEmail} />

        <label>Password</label>
        <input type="password" onChange={handlePass} />

        <input type="submit" value="Submit" id="loginSubmit" />
      </form>
      <h2>{feedback}</h2>
    </>
  );
}
