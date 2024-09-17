import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../dev/const";
import {
  SessionType,
  CharType,
  PlayerType,
  TurnType,
} from "../interface/interface";
import { EXPLORERS } from "../dev/const";
import { getSession, patchSession, setTurn } from "../helpers/backend";
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
  players: PlayerType[];
}

function AddPlayer(prop: Prop) {
  const [playerName, setPlayerName] = useState<string>("");
  const [explorer, setExplorer] = useState<string>("");
  const [char, setChar] = useState<CharType>();
  const [feedback, setFeedback] = useState<string>("");
  const charDefaults: CharType[] = JSON.parse(
    localStorage.getItem("charDefaults")
  );

  const selectedExplorers: string[] = [];
  prop.players.forEach((player) => {
    selectedExplorers.push(player.explorer);
  });

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
    setFeedback("");
  };

  const handleChangeExplorer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExplorer(e.target.value);
    setFeedback("");
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
        return res.json();
      })
      .then((result) => {
        console.log(result);
        prop.refreshSession();
        setPlayerName("");
        setExplorer("");
        setChar(undefined);
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
            if (!selectedExplorers.includes(explorer)) {
              return (
                <option value={explorer} key={`${explorer}-option`}>
                  {explorer}
                </option>
              );
            }
          })}
        </select>
        <input type="submit" value="Add Player" id="submitAddPlayer" disabled />
      </form>
      <p>{feedback}</p>
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
        <LabeledPair label="Turn: " info={session?.turn.toString()} />
      </div>
    </>
  );
}

interface SetOrderProp {
  players: PlayerType[] | undefined;
}
function SetOrder(prop: SetOrderProp) {
  const [order, setOrder] = useState<PlayerType[] | undefined>([]);

  const handlePlayerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const player = prop.players.find((n) => n._id === e.target.dataset.id);
    if (player) {
      let arr: PlayerType[] = [];
      if (order) {
        arr = [...order];
        if (!order?.includes(player)) {
          arr = [...order, player];
        }
      } else {
        arr = [player];
      }
      setOrder(arr);
    }
  };

  const handleReset = () => {
    setOrder([]);
  };

  const handleSave = () => {
    const copy: TurnType[] = [];
    order &&
      order.map((player, index) => {
        copy.push({ _id: player._id, turn: index });
      });
    console.log(copy);
    setTurn(copy);
  };

  useEffect(() => {
    if (prop.players?.length === order?.length) {
      document.getElementById("save-order")?.removeAttribute("disabled");
    } else {
      document.getElementById("save-order")?.setAttribute("disabled", "true");
    }
  }, [prop.players, order]);

  return (
    <>
      <h2>Set Order</h2>
      <button onClick={handleReset}>Reset</button>
      <button id="save-order" onClick={handleSave}>
        Save
      </button>
      <div>
        <div>
          <ul className="flex flex-col">
            {prop.players &&
              prop.players.map((player) => {
                if (!order?.includes(player))
                  return (
                    <button
                      onClick={handlePlayerClick}
                      data-id={player._id}
                      key={`${player._id}-setOrder`}
                    >{`"${player.explorer}" - ${player.name}`}</button>
                  );
              })}
          </ul>
        </div>
        <div>
          <ol className="list-decimal">
            {order &&
              order.map((player) => {
                return (
                  <li
                    key={`${player._id}-orderedList`}
                  >{`"${player.explorer}" - ${player.name}`}</li>
                );
              })}
          </ol>
        </div>
      </div>
    </>
  );
}

export default function InsideSession() {
  const [session, setSession] = useState<SessionType>();
  const [created, setCreated] = useState<string>("");
  const [updated, setUpdated] = useState<string>("");
  const [addModal, setAddModal] = useState<boolean>(false);
  const [orderModal, setOrderModal] = useState<boolean>(false);
  const { sessionID } = useParams();

  function refreshSession() {
    getSession(sessionID, setSession);
  }

  function closeAllModal() {
    setAddModal(false);
    setOrderModal(false);
  }

  useEffect(() => {
    refreshSession();
  }, []);

  useEffect(() => {
    setCreated(convertDate(session?.createdAt));
    setUpdated(convertDate(session?.updatedAt));
  }, [session]);

  const toggleAddModal = () => {
    const current = addModal;
    closeAllModal();
    setAddModal(!current);
  };

  const toggleOrderModal = () => {
    const current = orderModal;
    closeAllModal();
    setOrderModal(!current);
  };

  const handleAdvanceTurn = () => {
    patchSession(session?._id, { turn: session?.turn + 1 }, setSession);
  };

  return (
    <>
      <div className="flex flex-row justify-evenly">
        <SessionInfo session={session} created={created} updated={updated} />
        <DisplayPlayers players={session?.players} />
      </div>

      <button onClick={toggleAddModal}>Add Player</button>
      <button onClick={toggleOrderModal}>Set Order</button>
      <button onClick={handleAdvanceTurn}>End Turn</button>
      {addModal && (
        <AddPlayer
          sessionID={session?._id}
          refreshSession={refreshSession}
          players={session?.players}
        />
      )}
      {orderModal && <SetOrder players={session?.players} />}
    </>
  );
}
