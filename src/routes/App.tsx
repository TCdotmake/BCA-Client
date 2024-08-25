import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import { useEffect } from "react";
export default function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("myToken")) {
      navigate("/dashboard");
    }
  }, [navigate]);

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
