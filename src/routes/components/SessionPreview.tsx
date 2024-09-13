import { SessionType } from "../../interface/interface";
import { Link } from "react-router-dom";
interface Prop {
  session: SessionType;
}

export default function SessionPreview(prop: Prop) {
  const session = { ...prop.session };
  const link = `../${session._id}`;
  return (
    <>
      <li className="flex flex-row w-96 justify-between">
        <p>{session.name}</p>
        <p>{session.desc}</p>
        <p>{new Date(session.createdAt).toDateString()}</p>
        <p>Players: {session.players.length}</p>
        <Link to={link}>Enter</Link>
      </li>
    </>
  );
}
