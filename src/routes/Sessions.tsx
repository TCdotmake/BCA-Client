import { Link, Outlet } from "react-router-dom";

export default function Sessions() {
  return (
    <>
      <h2>Sessions</h2>
      <Link to="createsession">Create Session</Link>
      <Outlet />
    </>
  );
}
