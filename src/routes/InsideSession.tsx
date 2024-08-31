import { useParams } from "react-router-dom";

export default function InsideSession() {
  const { sessionID } = useParams();
  return (
    <>
      <p>{sessionID}</p>
    </>
  );
}
