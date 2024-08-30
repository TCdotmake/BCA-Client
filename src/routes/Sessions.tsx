import { Link, Outlet } from "react-router-dom";
import SessionType from "../interface/interface";
import { useEffect } from "react";

interface Props {
  sessions: SessionType[];
  setSessions: React.Dispatch<React.SetStateAction<SessionType[] | undefined>>;
  refreshSessions: () => void;
}

export default function Sessions(prop: Props) {
  useEffect(() => {
    prop.refreshSessions();
  }, []);

  return (
    <>
      <h2>Sessions</h2>
      <Link to="createsession">Create Session</Link>
      <Outlet />
    </>
  );
}
