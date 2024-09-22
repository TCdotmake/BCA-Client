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
import BgImg from "./BgImg";
import LandingPage from "./LandingPage";

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
      <BgImg backgroundImage="url(src/img/BG-1080.png)" />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <LandingPage>
                <Home />
              </LandingPage>
            }
          />
          <Route
            path="login"
            element={
              <LandingPage>
                <Login />
              </LandingPage>
            }
          />
          <Route
            path="signup"
            element={
              <LandingPage>
                <Signup />
              </LandingPage>
            }
          />
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
      <div className="z-10 absolute w-5/6 min-h-screen left-1/2 -translate-x-1/2 bg-slate-900/80">
        <Outlet />
      </div>
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
