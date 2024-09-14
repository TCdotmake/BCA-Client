import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../dev/const";
import { SessionType, CharType, PlayerType } from "../interface/interface";
import { EXPLORERS } from "../dev/const";
import { getSession } from "../helpers/backend";
import CharCard from "./CharCard";

interface Info {
  label: string;
  info: string | undefined;
}
function LabeledPair(prop: Info) {
  return (
    <>
      <div className="flex flex-row justify-between w-72">
        <p>{prop.label}</p>
        <p>{prop.info}</p>
      </div>
    </>
  );
}

function convertDate(date) {
  return new Date(date).toLocaleDateString("en-us", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface Prop {
  sessionID: string;
  refreshSession(): void;
}

function AddPlayer(prop: Prop) {
  const [playerName, setPlayerName] = useState<string>("");
  const [explorer, setExplorer] = useState<string>("");
  const [char, setChar] = useState<CharType>();
  const charDefaults: CharType[] = JSON.parse(
    localStorage.getItem("charDefaults")
  );

  useEffect(() => {
    const addPlayer: HTMLElement | null =
      document.getElementById("submitAddPlayer");
    if (playerName !== "" && explorer !== "") {
      addPlayer?.removeAttribute("disabled");
    } else {
      addPlayer?.setAttribute("disabled", "true");
    }
  }, [playerName, explorer]);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };

  const handleChangeExplorer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExplorer(e.target.value);
    charDefaults.map((n) => {
      if (n.name === e.target.value) {
        setChar(n);
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem("myToken") || "");
    const raw = JSON.stringify({
      playerName: playerName,
      explorer: explorer,
      sessionID: prop.sessionID,
    });
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${URL}/player`, requestOptions)
      .then((res) => {
        if (res.status !== 201) {
          return undefined;
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        prop.refreshSession();
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="PlayerNameInput">Player Name</label>
        <input
          type="text"
          id="PlayerNameInput"
          value={playerName}
          onChange={handleChangeName}
        />
        <label htmlFor="selectExplorer">Explorer</label>
        <select
          id="selectExplorer"
          value={explorer}
          onChange={handleChangeExplorer}
        >
          <option value=""></option>
          {EXPLORERS.map((explorer) => {
            return (
              <option value={explorer} key={`${explorer}-option`}>
                {explorer}
              </option>
            );
          })}
        </select>
        <input type="submit" value="Add Player" id="submitAddPlayer" disabled />
      </form>
      {char && <CharCard char={char} />}
    </>
  );
}

interface DisplayPlayersProp {
  players: PlayerType[] | undefined;
}
function DisplayPlayers(prop: DisplayPlayersProp) {
  const { players } = prop;
  return (
    <>
      <h4>Players</h4>
      {players && (
        <ul>
          {players.map((player) => {
            return (
              <li
                key={player._id}
              >{`"${player.explorer}" - ${player.name}`}</li>
            );
          })}
        </ul>
      )}
    </>
  );
}

interface SessionInfoProp {
  session: SessionType | undefined;
  created: string;
  updated: string;
}
function SessionInfo(prop: SessionInfoProp) {
  const { session, created, updated } = prop;
  return (
    <>
      <div>
        <LabeledPair label="Session Name: " info={session?.name} />
        {session?.desc && (
          <LabeledPair label="Description: " info={session?.desc} />
        )}
        <LabeledPair label="Created: " info={created} />
        <LabeledPair label="Last Update: " info={updated} />
        <LabeledPair
          label="Game in Progress: "
          info={session?.active ? "Yes" : "No"}
        />
      </div>
    </>
  );
}

export default function InsideSession() {
  const [session, setSession] = useState<SessionType>();
  const [created, setCreated] = useState<string>("");
  const [updated, setUpdated] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { sessionID } = useParams();

  function refreshSession() {
    getSession(sessionID, setSession);
  }

  useEffect(() => {
    refreshSession();
  }, []);

  useEffect(() => {
    setCreated(convertDate(session?.createdAt));
    setUpdated(convertDate(session?.updatedAt));
  }, [session]);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <SessionInfo session={session} created={created} updated={updated} />
      <DisplayPlayers players={session?.players} />
      <button onClick={toggleModal}>Add Player</button>
      {openModal && (
        <AddPlayer sessionID={session?._id} refreshSession={refreshSession} />
      )}
    </>
  );
}
