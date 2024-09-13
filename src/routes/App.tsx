import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import { useEffect } from "react";
import Sessions from "./Sessions";
import CreateSession from "./CreateSession";
import InsideSession from "./InsideSession";
import SessionList from "./SessionList";
import { CharSheetType, CharType, SessionType } from "../interface/interface";
import { getCharSheetAndDefault } from "../helpers/backend";

export default function App() {
  const [sessions, setSessions] = useState<SessionType[]>();
  const [charSheets, setCharSheets] = useState<CharSheetType[]>();
  const [charDefaults, setCharDefaults] = useState<CharType[]>();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("myToken")) {
      navigate("/dashboard");
    }
    getCharSheetAndDefault(setCharSheets, setCharDefaults);
  }, []);

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
          <Route path="sessions" element={<Sessions />}>
            <Route
              path="list"
              element={
                <SessionList
                  sessions={sessions || []}
                  setSessions={setSessions}
                />
              }
            />
            <Route
              path="createsession"
              element={<CreateSession setSessions={setSessions} />}
            />
            <Route path=":sessionID" element={<InsideSession />} />
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
