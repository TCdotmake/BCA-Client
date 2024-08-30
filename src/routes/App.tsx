import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import { useEffect } from "react";
import Sessions from "./Sessions";
import CreateSession from "./CreateSession";
import { URL } from "../dev/const";
export default function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("myToken")) {
      navigate("/dashboard");
    }
  }, []);

  interface SessionType {
    _id: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    owner: string;
    name: string;
    desc: string;
  }

  const [sessions, setSessions] = useState<SessionType[]>();
  function refreshSessions() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem("myToken") || "");
    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`${URL}/sessions`, requestOptions)
      .then((res) => {
        if (res.status != 200) {
          return undefined;
        }
        return res.json();
      })
      .then((result) => {
        if (result) {
          setSessions(result);
        }
      });
  }

  return (
    <>
      <h1>Betrayal at the House on the Hill</h1>
      <hr />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="sessions"
            element={
              <Sessions
                sessions={sessions || []}
                setSessions={setSessions}
                refreshSessions={refreshSessions}
              />
            }
          >
            <Route
              path="createsession"
              element={<CreateSession setSessions={setSessions} />}
            />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}

function Home() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

function NoMatch() {
  return (
    <>
      <h2>Not found??!!</h2>
    </>
  );
}
