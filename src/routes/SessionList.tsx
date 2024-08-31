import SessionType from "../interface/interface";
import { useEffect } from "react";
import SessionPreview from "./components/SessionPreview";
import { Link } from "react-router-dom";
interface Props {
  sessions: SessionType[];
  refreshSessions: () => void;
}

export default function SessionList(prop: Props) {
  useEffect(() => {
    prop.refreshSessions();
  }, []);
  return (
    <>
      <Link to="../createsession">Create Session</Link>
      <ul>
        {prop.sessions.map((session) => {
          return <SessionPreview session={session} key={session._id} />;
        })}
      </ul>
    </>
  );
}
