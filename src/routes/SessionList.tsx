import { SessionType } from "../interface/interface";
import { useEffect } from "react";
import SessionPreview from "./components/SessionPreview";
import { Link } from "react-router-dom";
import { refreshSessions } from "../helpers/backend";
interface Props {
  sessions: SessionType[];
  setSessions: React.Dispatch<React.SetStateAction<SessionType[] | undefined>>;
}

export default function SessionList(prop: Props) {
  useEffect(() => {
    refreshSessions(prop.setSessions);
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
